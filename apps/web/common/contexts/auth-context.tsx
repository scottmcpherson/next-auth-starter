'use client'

// import { useToast } from '@chakra-ui/react'
// import { Crisp } from 'crisp-sdk-web'
import RequireAuth from '@/common/components/require-auth'
import { createAPI } from '@/common/utils/api'
import auth from '@/common/utils/firebase-client'
import {
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  verifyPasswordResetCode,
} from 'firebase/auth'
import nookies from 'nookies'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const provider = new GoogleAuthProvider()

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
  authRequired,
}: {
  children: React.ReactNode
  authRequired: boolean
}) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setIsLoading] = useState(true)
  // const toast = useToast()

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null)
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', { path: '/' })
        setIsLoading(false)
        return
      }

      const token = await user.getIdToken()
      setUser(user)
      nookies.destroy(null, 'token')
      nookies.set(null, 'token', token, { path: '/' })
      setIsLoading(false)
      // Crisp.user.setNickname(user.displayName || '')
      // Crisp.user.setEmail(user.email || '')
      // Crisp.user.setAvatar(user.photoURL || '')
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handle = setInterval(
      async () => {
        const user = auth.currentUser
        if (user) await user.getIdToken(true)
      },
      10 * 60 * 1000,
    )

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  const logout = async () => {
    setUser(null)
    await signOut(auth)
    nookies.destroy(null, 'token')
  }

  const createInternalUser = async (userCredential: any) => {
    if (!userCredential || !userCredential.user)
      throw new Error("Can't create internal user without userCredential")

    try {
      const internalUser = await createAPI('/api/v1/users', {
        token: userCredential.user.getIdToken(),
        payload: {},
        isAuthRequired: false,
      })

      if (!internalUser) logout()

      // Force refresh of token on user
      // to get any updated claims created on the backend.
      const user = auth.currentUser
      if (user) await user.getIdToken(true)

      console.log('internalUser: ', internalUser)

      if (!internalUser.isActive) {
        toast.error(
          "We're currently in beta. We'll let you know when you're in!",
          {
            id: 'wait-list',
            position: 'top-center',
          },
        )
      }
      return internalUser
    } catch (error) {
      console.error(error)
      throw new Error("Can't create internal user")
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      return await createInternalUser(userCredential)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      return await createInternalUser(userCredential)
    } catch (error) {
      console.error(error)
      throw new Error('Invalid email or password. Please try again')
    }
  }

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider)
      return await createInternalUser(userCredential)
    } catch (error) {
      console.error(error)
      throw new Error("Can't login with Google. Please try again.")
    }
  }

  const resetPasswordEmail = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  const verifyPasswordCode = async (actionCode: string) => {
    try {
      const results = await verifyPasswordResetCode(auth, actionCode)
      return results
    } catch (error) {
      throw new Error('Password reset link is invalid or has expired.')
    }
  }

  const resetPassword = async (actionCode: string, newPassword: string) => {
    try {
      const results = await confirmPasswordReset(auth, actionCode, newPassword)
      return results
    } catch (error) {
      throw new Error('Something went wrong. Please try again.')
    }
  }

  const isLoading = authRequired && loading

  const ChildrenComponents = authRequired ? (
    <RequireAuth>{children}</RequireAuth>
  ) : (
    children
  )
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        resetPasswordEmail,
        verifyPasswordCode,
        resetPassword,
        loginWithGoogle,
        logout,
      }}
    >
      {isLoading ? null : ChildrenComponents}
    </AuthContext.Provider>
  )
}

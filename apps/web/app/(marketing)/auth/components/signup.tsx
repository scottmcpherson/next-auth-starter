'use client'

import { useAuth } from '@/common/contexts/auth-context'
import { isFunction } from '@/common/utils/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Input from '../../../../common/components/input'
import { ActiveAuthForm } from '../constants'
import { GoogleIcon } from './provider-icons'

export interface SignupProps {
  onClose?: Function
  setActiveAuthForm?: Function
}

export default function Signup({ onClose, setActiveAuthForm }: SignupProps) {
  const router = useRouter()
  const { loginWithGoogle, signup } = useAuth()
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const redirect = searchParams?.get('redirect')
  const FORM_ERROR = 'FORM_ERROR'

  const handleRedirect = () => {
    router.push(redirect ? redirect : '/dashboard')
  }

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle()
      if (isFunction(onClose)) {
        onClose!()
      } else {
        handleRedirect()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignupWithEmail = async (values: any) => {
    try {
      const { email, password } = values
      await signup(email, password)

      if (isFunction(onClose)) {
        onClose!()
      } else {
        handleRedirect()
      }
    } catch (error) {
      setError(FORM_ERROR, {
        message: 'Please double check your email and password',
      })
      console.log(error)
    }
  }

  return (
    <>
      <div className="space-y-12">
        <div className="space-y-8">
          {/* <Logo /> */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2 className="text-3xl font-bold">
              Create Your
              <br /> TableChat Account
            </h2>
            {errors?.FORM_ERROR?.message && (
              <div className="p-4 bg-red-400 text-white">
                {errors?.FORM_ERROR?.message as string}
              </div>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleSignupWithEmail)}
          className="space-y-6"
        >
          <div className="space-y-5">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              register={register}
              errors={errors}
              registerArgs={{
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              }}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              register={register}
              errors={errors}
              registerArgs={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should be at least 8 characters long',
                },
              }}
            />
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full p-2 dark:bg-indigo-600 dark:hover:bg-indigo-500 bg-black hover:bg-theme-gray-900 text-white rounded"
              disabled={isSubmitting}
            >
              Create account
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-full p-2 bg-theme-gray-100 hover:bg-theme-gray-50 text-black rounded"
              onClick={handleGoogleSignup}
            >
              <GoogleIcon className="w-5 h-5" />
              <span className="ml-2">Sign up with Google</span>
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center space-x-1 text-sm mt-8">
        <span>Already have an account?</span>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => {
            if (setActiveAuthForm) {
              setActiveAuthForm(ActiveAuthForm.LOGIN)
            } else {
              router.push('/auth/login')
            }
          }}
        >
          Log in
        </button>
      </div>
    </>
  )
}

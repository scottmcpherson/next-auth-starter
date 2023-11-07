'use client'

import { useAuth } from '@/common/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../../common/components/input'
import { ActiveAuthForm } from '../constants'

interface ResetPasswordProps {
  setActiveAuthForm?: Function
}

export default function ResetPassword({
  setActiveAuthForm,
}: ResetPasswordProps) {
  const router = useRouter()
  const { resetPasswordEmail } = useAuth()
  const [isEmailSent, setIsEmailSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const handlePasswordResetEmail = async (values: any) => {
    try {
      const { email } = values
      await resetPasswordEmail(email)
      setIsEmailSent(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="space-y-12">
        <div className="space-y-8">
          {/* <Logo /> */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2 className="text-3xl font-bold">Reset Password</h2>
            {isEmailSent && (
              <div className="p-4 bg-green-400 text-white">
                Email is on the way. Please check your inbox.
              </div>
            )}
          </div>
        </div>
        {!isEmailSent && (
          <form
            onSubmit={handleSubmit(handlePasswordResetEmail)}
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
                }}
              />
            </div>
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full p-2 dark:bg-indigo-600 dark:hover:bg-indigo-500 bg-black hover:bg-theme-gray-900 text-white rounded"
                disabled={isSubmitting}
              >
                Reset password
              </button>
            </div>
          </form>
        )}
        <div className="flex justify-center space-x-1 text-sm mt-8">
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
            Back to log in
          </button>
        </div>
      </div>
    </>
  )
}

'use client'

import { useAuth } from '@/common/contexts/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../../common/components/input'
import { ActiveAuthForm } from '../constants'

export interface CreatePasswordProps {
  setActiveAuthForm?: Function
}

export default function CreatePassword({
  setActiveAuthForm,
}: CreatePasswordProps) {
  const router = useRouter()
  const { verifyPasswordCode, resetPassword } = useAuth()
  const searchParams = useSearchParams()
  const [isFormSuccess, setIsFormSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const oobCode = searchParams?.get('oobCode')
  const FORM_ERROR = 'FORM_ERROR'

  const handleCreatePassword = async (values: any) => {
    try {
      const { password } = values
      await verifyPasswordCode(oobCode)
      await resetPassword(oobCode, password)
      setIsFormSuccess(true)
      setError(FORM_ERROR, {
        message: '',
      })
    } catch (error: any) {
      console.log('oobCode error:', error)
      setError(FORM_ERROR, {
        message:
          error.message ||
          'Email link has expired. Please visit the login page and click "Forgot your password"',
      })
    }
  }

  return (
    <>
      <div className="space-y-12">
        <div className="space-y-8 text-center">
          {/* <Logo /> */}
          <h2 className="text-3xl font-bold">Create New Password</h2>
          {isFormSuccess && (
            <div className="p-4 bg-green-400 text-white">
              Password has been reset
            </div>
          )}
          {errors?.FORM_ERROR?.message && (
            <div className="p-4 bg-red-400 text-white">
              {errors?.FORM_ERROR?.message as string}
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit(handleCreatePassword)}
          className="space-y-6"
        >
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            register={register}
            errors={errors}
            registerArgs={{
              required: 'Password is required',
            }}
          />
          <button
            type="submit"
            className="w-full p-2 dark:bg-indigo-600 dark:hover:bg-indigo-500 bg-black hover:bg-theme-gray-900 text-white rounded"
            disabled={isSubmitting}
          >
            Create Password
          </button>
        </form>
        <div className="flex justify-center space-x-1 text-sm mt-8">
          <span>Back to</span>
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
      </div>
    </>
  )
}

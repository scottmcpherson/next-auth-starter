'use client'

import clsx from 'clsx'

export interface InputProps {
  id: string
  type: string
  placeholder: string | undefined
  label: string
  errors: any
  register: any
  registerArgs: any
}

export default function Input({
  id,
  type,
  placeholder,
  label,
  errors,
  register,
  registerArgs,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'flex-grow',
          'rounded',
          'px-4',
          'py-2',
          'dark:border-transparent',
          'focus:border-black',
          'dark:focus:border-theme-gray-300',
          'focus:ring-0',
          'dark:bg-theme-gray-900',
          'dark:text-white'
        )}
        {...register(id, registerArgs)}
      />

      {errors && errors[id]?.message && (
        <span className="text-red-400">{errors[id]?.message as string}</span>
      )}
    </div>
  )
}

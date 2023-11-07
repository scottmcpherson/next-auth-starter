import React from 'react'
import type { ButtonHTMLAttributes, FC } from 'react'
import cn from 'clsx'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const rootClassName = cn(
    'relative inline-flex items-center justify-center cursor-pointer',
    'no-underline py-0 px-5 rounded-md border border-solid border-red-500',
    'bg-orange-500 text-white text-base font-medium outline-none select-none',
    'align-middle whitespace-nowrap leading-10 shadow-md transition-colors',
    className,
  )

  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  )
}

export default Button

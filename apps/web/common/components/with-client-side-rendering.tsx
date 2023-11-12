import { ComponentType, ReactNode, useEffect, useState } from 'react'

export const withClientSideRendering = <P extends object>(
  Component: ComponentType<P>,
  Placeholder?: ReactNode // Optional placeholder component
) => {
  const WrappedComponent = (props: P) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    return mounted ? <Component {...props} /> : Placeholder // Render Placeholder if provided
  }

  // Setting a display name for debugging purposes
  const componentName = Component.displayName || Component.name || 'Component'
  WrappedComponent.displayName = `withClientSideRendering(${componentName})`

  return WrappedComponent
}

import { type ReactNode } from 'react'

interface SkeletonProps {
  className?: string
  children?: ReactNode
}

export function Skeleton({ className = '', children }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-200/70 dark:bg-white/[0.06] ${className}`}
      aria-hidden
    >
      {children}
    </div>
  )
}

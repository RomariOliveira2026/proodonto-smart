import { Link } from 'react-router-dom'

type BrandLogoSize = 'sm' | 'md' | 'lg' | 'xl'
type BrandLogoVariant = 'full' | 'icon' | 'wordmark'
type BrandLogoTheme = 'default' | 'on-dark' | 'on-light'

const heightClass: Record<BrandLogoSize, string> = {
  sm: 'h-7',
  md: 'h-9',
  lg: 'h-11',
  xl: 'h-14',
}

const smartClass: Record<BrandLogoSize, string> = {
  sm: 'text-[11px]',
  md: 'text-[13px]',
  lg: 'text-[15px]',
  xl: 'text-[18px]',
}

const smartPullClass: Record<BrandLogoSize, string> = {
  sm: '-ml-2 pl-[1ch]',
  md: '-ml-3 pl-[1ch]',
  lg: '-ml-3.5 pl-[1ch]',
  xl: '-ml-4 pl-[1ch]',
}

const smartThemeClass: Record<BrandLogoTheme, string> = {
  default: 'text-primary-light',
  'on-dark': 'text-primary-light',
  'on-light': 'text-primary',
}

const wordmarkThemeClass: Record<BrandLogoTheme, string> = {
  default: '',
  'on-dark': 'brightness-0 invert',
  'on-light': '',
}

export interface BrandLogoProps {
  size?: BrandLogoSize
  variant?: BrandLogoVariant
  theme?: BrandLogoTheme
  className?: string
  href?: string
  showSmart?: boolean
}

export function BrandLogo({
  size = 'md',
  variant = 'full',
  theme = 'default',
  className = '',
  href,
  showSmart = true,
}: BrandLogoProps) {
  const iconSizes: Record<BrandLogoSize, string> = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
    xl: 'h-14 w-14',
  }

  const content =
    variant === 'icon' ? (
      <img
        src="/logo-icon.svg"
        alt="ProOdonto Smart"
        className={`${iconSizes[size]} object-contain ${className}`}
      />
    ) : (
      <span
        className={`inline-flex items-end gap-0 ${heightClass[size]} ${className}`}
        aria-label="ProOdonto Smart"
      >
        <img
          src="/logo-wordmark.svg"
          alt=""
          aria-hidden
          className={`h-full w-auto object-contain object-left ${wordmarkThemeClass[theme]}`}
        />
        {showSmart && variant === 'full' && (
          <span
            className={`font-display font-semibold lowercase tracking-[-0.04em] leading-none pb-[0.14em] select-none ${smartClass[size]} ${smartThemeClass[theme]} ${smartPullClass[size]}`}
          >
            smart
          </span>
        )}
      </span>
    )

  if (href) {
    return (
      <Link to={href} className="inline-flex shrink-0 transition-transform duration-300 hover:scale-[1.02]">
        {content}
      </Link>
    )
  }

  return content
}

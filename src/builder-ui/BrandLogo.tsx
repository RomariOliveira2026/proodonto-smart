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
  sm: 'text-[10px]',
  md: 'text-[11px]',
  lg: 'text-[13px]',
  xl: 'text-[16px]',
}

const wordmarkHeightClass: Record<BrandLogoSize, string> = {
  sm: 'h-[74%]',
  md: 'h-[76%]',
  lg: 'h-[78%]',
  xl: 'h-[80%]',
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
        className={`inline-flex leading-none ${
          variant === 'full' && showSmart
            ? `flex-col items-end justify-center gap-0 ${heightClass[size]}`
            : heightClass[size]
        } ${className}`}
        aria-label="ProOdonto Smart"
      >
        <img
          src="/logo-wordmark.svg"
          alt=""
          aria-hidden
          className={`w-auto object-contain object-right ${
            variant === 'full' && showSmart ? wordmarkHeightClass[size] : 'h-full'
          } ${wordmarkThemeClass[theme]}`}
        />
        {showSmart && variant === 'full' && (
          <span
            className={`font-display font-semibold lowercase tracking-[-0.04em] leading-none -mt-[0.15em] mr-[0.08em] select-none ${smartClass[size]} ${smartThemeClass[theme]}`}
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

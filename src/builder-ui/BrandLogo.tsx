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

/** Largura útil do PNG no wordmark (clipPath do Logo.svg) — elimina padding transparente à direita */
const WORDMARK_CONTENT_ASPECT = 361.66 / 144.75

const smartClass: Record<BrandLogoSize, string> = {
  sm: 'text-[11px]',
  md: 'text-[13px]',
  lg: 'text-[15px]',
  xl: 'text-[18px]',
}

const smartGapClass: Record<BrandLogoSize, string> = {
  sm: 'pl-[0.2em]',
  md: 'pl-[0.2em]',
  lg: 'pl-[0.2em]',
  xl: 'pl-[0.2em]',
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
        <span
          className={`inline-block h-full overflow-hidden shrink-0`}
          style={{ aspectRatio: WORDMARK_CONTENT_ASPECT }}
        >
          <img
            src="/logo-wordmark.svg"
            alt=""
            aria-hidden
            className={`h-full w-auto max-w-none object-left ${wordmarkThemeClass[theme]}`}
          />
        </span>
        {showSmart && variant === 'full' && (
          <span
            className={`font-display font-semibold lowercase tracking-[-0.04em] leading-none pb-[0.14em] select-none shrink-0 ${smartClass[size]} ${smartThemeClass[theme]} ${smartGapClass[size]}`}
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

import { Link } from 'react-router-dom'

type BrandLogoSize = 'sm' | 'md' | 'lg' | 'xl'
type BrandLogoVariant = 'full' | 'icon' | 'wordmark'
type BrandLogoTheme = 'default' | 'on-dark' | 'on-light'

const heightClass: Record<BrandLogoSize, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
}

/** Largura útil do PNG no wordmark (clipPath do Logo.svg) — elimina padding transparente à direita */
const WORDMARK_CONTENT_ASPECT = 361.66 / 144.75

const smartClass: Record<BrandLogoSize, string> = {
  sm: 'text-[12px]',
  md: 'text-[14px]',
  lg: 'text-[16px]',
  xl: 'text-[20px]',
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
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
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

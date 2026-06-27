import { useEffect } from 'react'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ProOdonto Smart',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Software executivo de gestão para clínicas odontológicas. Recupere faturamento, reduza faltas, automatize cobranças e tome decisões com Builder Intelligence™.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
    description: 'Demonstração disponível',
  },
  provider: {
    '@type': 'Organization',
    name: 'BuilderTudo',
    url: 'https://buildertudo.com',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '127',
  },
}

export function LandingSchema() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'proodonto-schema'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => {
      document.getElementById('proodonto-schema')?.remove()
    }
  }, [])

  return null
}

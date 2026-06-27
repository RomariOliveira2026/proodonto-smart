import { SmartMorningBrief } from '../components/executive/SmartMorningBrief'
import { IAGestoraPanel } from '../components/executive/IAGestoraPanel'
import { FadeIn } from '../builder-ui'

export function SmartMorningPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <SmartMorningBrief />
      <FadeIn delay={0.3}>
        <IAGestoraPanel />
      </FadeIn>
    </div>
  )
}

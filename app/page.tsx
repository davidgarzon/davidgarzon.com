import { Hero } from '@/components/sections/hero'
import { ExecutiveImpact } from '@/components/sections/executive-impact'
import { WhatITransform } from '@/components/sections/what-i-transform'
import { HowIWork } from '@/components/sections/how-i-work'
import { Capabilities } from '@/components/sections/capabilities'
import { SelectedSystems } from '@/components/sections/selected-systems'
import { PositioningLine } from '@/components/sections/positioning-line'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExecutiveImpact />
      <WhatITransform />
      <HowIWork />
      <Capabilities />
      <SelectedSystems />
      <PositioningLine />
      <Contact />
    </>
  )
}

import { Hero } from '@/components/sections/hero'
import { Pillars } from '@/components/sections/pillars'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { ImpactSignals } from '@/components/sections/impact-signals'
import { WorkWithMe } from '@/components/sections/work-with-me'
import { HowIWork } from '@/components/sections/how-i-work'
import { HomeAgent } from '@/components/sections/home-agent'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedProjects />
        <ImpactSignals />
        <WorkWithMe />
        <HowIWork />
      <HomeAgent />
      <Contact />
    </>
  )
}

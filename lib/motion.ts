import type { Transition } from 'framer-motion'

export const motionConfig = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  section: {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5 } satisfies Transition,
  },
  stagger: (i: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
}

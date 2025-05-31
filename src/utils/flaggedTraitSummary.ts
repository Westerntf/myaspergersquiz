

import { Trait } from "./calculateScore";

export function getFlaggedTraitSummary(overallScore: number, flaggedTraits: Trait[]): string {
  if (overallScore >= 30) {
    return `You triggered ${flaggedTraits.length} diagnostic-aligned traits. Your results indicate frequent patterns consistent with autistic traits. These may include heightened sensitivity, challenges with social communication, or a strong need for routine. Seeking support tailored to these patterns may help you navigate daily life more comfortably.`;
  }

  if (overallScore >= 20) {
    return `You triggered ${flaggedTraits.length} diagnostic-aligned traits. These suggest noticeable traits aligned with autism spectrum patterns. You may experience difficulty shifting focus, discomfort in unpredictable settings, or struggle to maintain social energy over time. Support tools and strategies may improve your day-to-day experience.`;
  }

  if (overallScore >= 10) {
    return `You triggered ${flaggedTraits.length} diagnostic-aligned traits. While these may not significantly impact your daily life, some patterns—such as sensory overload or trouble with social nuance—may still create challenges. Gentle support or awareness can be helpful.`;
  }

  return `You triggered ${flaggedTraits.length} diagnostic-aligned traits. These traits are common in the general population and may not cause significant disruption. Still, gaining insight into these areas may support self-awareness and growth.`;
}
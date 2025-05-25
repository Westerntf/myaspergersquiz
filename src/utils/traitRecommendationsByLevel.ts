import { Trait } from "./calculateScore";

export const traitRecommendationsByLevel: Record<Trait, string[]> = {
  social: [
    "Engage in group activities with low social pressure to build comfort gradually.",
    "Practice social scripts or attend small gatherings with trusted people.",
    "Consider group therapy or role-play sessions to enhance social flexibility.",
    "Work with a social coach or therapist for targeted support."
  ],
  sensory: [
    "Create calm environments with minimal sensory stimulation.",
    "Use earplugs, sunglasses, or textured-friendly clothing for comfort.",
    "Design daily breaks to rest from sensory overload.",
    "Explore occupational therapy for sensory integration support."
  ],
  routine: [
    "Stay open to small changes in routine to build adaptability.",
    "Use visual schedules or planners to organize your day.",
    "Prepare backup routines to handle interruptions calmly.",
    "Seek therapy to manage anxiety around unexpected changes."
  ],
  communication: [
    "Practice assertive communication techniques and body language.",
    "Use journaling or voice notes to process thoughts.",
    "Role-play common conversations to build fluency.",
    "Work with a speech therapist if expression or clarity is a challenge."
  ],
  focus: [
    "Use timers to manage task-switching and breaks.",
    "Prioritize tasks with checklists and progress tracking.",
    "Break large tasks into smaller steps to reduce overwhelm.",
    "Explore ADHD coaching or mindfulness training to support attention."
  ]
};
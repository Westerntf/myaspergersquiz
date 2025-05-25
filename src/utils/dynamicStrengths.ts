import { Trait } from "./calculateScore";

export const globalStrengths: string[] = [
  "You demonstrate resilience and persistence even when navigating multiple challenges.",
  "Your self-awareness and willingness to understand your traits are powerful assets.",
  "Seeking insight and taking this quiz reflects your strength in self-advocacy and growth."
];

export const dynamicStrengths: Record<Trait | "global", string[]> = {
  social: [
    "You likely feel at ease in most social settings.",
    "You navigate conversations and group interactions comfortably.",
    "You may serve as a social bridge for others who struggle more in this area."
  ],
  sensory: [
    "You appear resilient to sensory discomfort and environmental changes.",
    "You likely adapt well in various surroundings, even those that are stimulating.",
    "Your stable sensory responses may help others feel grounded."
  ],
  routine: [
    "You show flexibility in your daily life and adapt easily to change.",
    "You likely handle spontaneous events with minimal stress.",
    "Your ability to improvise and shift plans helps you thrive in dynamic environments."
  ],
  communication: [
    "You communicate clearly and naturally in most situations.",
    "You likely understand both verbal and nonverbal cues with ease.",
    "Others may rely on you to mediate or clarify in group discussions."
  ],
  focus: [
    "You manage your attention across tasks smoothly.",
    "You balance focus and flexibility well throughout your day.",
    "You adapt to shifting priorities without losing track of what matters."
  ],
  global: globalStrengths
};
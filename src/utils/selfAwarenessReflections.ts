import { Trait } from "./calculateScore";

export const selfAwarenessReflections: Record<Trait, string[]> = {
  social: [
    "You thrive in social settings.",
    "You generally enjoy social interaction.",
    "You are socially aware with minor challenges.",
    "You experience mild discomfort in some interactions.",
    "You may struggle occasionally in social settings.",
    "You frequently avoid social interaction.",
    "Social interaction causes significant stress.",
    "You find most social situations overwhelming."
  ],
  sensory: [
    "You’re rarely affected by sensory input.",
    "You have high tolerance for sensory environments.",
    "You notice mild discomfort with some stimuli.",
    "You occasionally need quiet or calm spaces.",
    "You are sensitive to noise or touch.",
    "You often seek sensory-friendly environments.",
    "Sensory input can be overwhelming daily.",
    "You require strong sensory accommodations."
  ],
  routine: [
    "You are spontaneous and adapt easily.",
    "You embrace change and flexibility.",
    "You manage minor disruptions with ease.",
    "You prefer routine but adjust when needed.",
    "Changes cause some discomfort.",
    "You rely heavily on structure.",
    "Routine disruptions are very difficult.",
    "You need strict routines to feel stable."
  ],
  communication: [
    "You communicate clearly and effectively.",
    "You are confident in expressing ideas.",
    "You need minor time to organize thoughts.",
    "You sometimes rehearse conversations.",
    "You occasionally misunderstand others.",
    "You often avoid verbal communication.",
    "Expressing yourself is very difficult.",
    "You feel misunderstood or unheard regularly."
  ],
  focus: [
    "You switch tasks and focus easily.",
    "You manage distractions well.",
    "You focus with mild effort.",
    "You can concentrate with routine.",
    "You struggle to focus in some settings.",
    "You lose focus on basic tasks.",
    "Focus requires great effort and energy.",
    "You often feel mentally overloaded."
  ]
};
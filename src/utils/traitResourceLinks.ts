import { Trait } from "./calculateScore";

export const traitResourceLinks: Record<Trait, { title: string; url: string; icon: string; description: string }[]> = {
  social: [
    {
      title: "Social Skills Toolbox",
      url: "https://example.com/social-skills",
      icon: "🗣️",
      description: "Interactive strategies for improving communication and social comfort."
    }
  ],
  sensory: [
    {
      title: "Understanding Sensory Overload",
      url: "https://example.com/sensory-overload",
      icon: "📘",
      description: "Learn how sensory input can affect your experience and well-being."
    }
  ],
  routine: [
    {
      title: "Daily Structure Planner",
      url: "https://example.com/routine-support",
      icon: "🧩",
      description: "Helps you design, track, and adapt daily routines."
    }
  ],
  communication: [
    {
      title: "Communication Strategies Guide",
      url: "https://example.com/communication",
      icon: "💬",
      description: "Tools and tips to support expressive and receptive communication."
    }
  ],
  focus: [
    {
      title: "Managing Hyperfocus",
      url: "https://example.com/hyperfocus-tips",
      icon: "🎯",
      description: "Approaches for focus regulation and productivity support."
    }
  ]
};
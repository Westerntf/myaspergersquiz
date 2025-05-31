import React from "react";

type TraitLevelsAtAGlanceProps = {
  scores: {
    social: number;
    sensory: number;
    routine: number;
    communication: number;
    focus: number;
  };
};

const circleRadius = 14;
const circleCircumference = 2 * Math.PI * circleRadius;
const progressArcRatio = 0.35; // 35% of circumference

export default function TraitLevelsAtAGlance({ scores }: TraitLevelsAtAGlanceProps) {
  // Calculate stroke-dashoffset for progress arc proportional to score
  const getStrokeDashoffset = (score: number) => {
    const percentage = Math.min(Math.max(score, 0), 100);
    // Total dash array is partial arc circumference
    const dashArray = circleCircumference * progressArcRatio;
    // Offset based on score percentage of partial arc
    return dashArray * (1 - percentage / 100);
  };

  const traits = [
    { key: "social", label: "Social" },
    { key: "sensory", label: "Sensory" },
    { key: "routine", label: "Routine" },
    { key: "communication", label: "Communication" },
    { key: "focus", label: "Focus" },
  ] as const;

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}
    >
      {(Object.entries(scores) as [string, number][]).map(([trait, score]) => {
        const percentage = Math.round((score / 8) * 100);
        return (
          <div key={trait} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="80" height="80" viewBox="0 0 36 36" aria-label={`${trait} score: ${percentage}%`} role="img">
              <path
                stroke="#e6f0f3"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="#31758a"
                strokeWidth="1"
                fill="none"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" fill="#000" fontSize="4" textAnchor="middle">
                {percentage}%
              </text>
            </svg>
            <span style={{ marginTop: "0.5rem", fontSize: "1rem", color: "#1a1a1a", fontWeight: 500 }}>
              {trait.charAt(0).toUpperCase() + trait.slice(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
import React from "react";

export type FocusOption = "adult" | "child" | "sensory" | "social";

interface FocusSelectionProps {
  selectedFocus: FocusOption[];
  onChange: (newSelection: FocusOption[]) => void;
}

export function FocusSelection({ selectedFocus, onChange }: FocusSelectionProps) {
 const options: { label: string; value: FocusOption }[] = [
  { label: "Adult Traits", value: "adult" },
  { label: "Child Traits", value: "child" },
  { label: "Sensory Traits", value: "sensory" },
  { label: "Social Traits", value: "social" },
];

function toggleOption(value: FocusOption) {
  if (selectedFocus.includes(value)) {
    onChange(selectedFocus.filter((f) => f !== value));
  } else {
    onChange([...selectedFocus, value]);
  }
}

  return (
    <fieldset style={{ border: "none", padding: 0, marginBottom: "1rem" }}>
      <legend style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        Select your focus areas
      </legend>
      {options.map((opt) => (
        <label
          key={opt.value}
          style={{
            display: "block",
            marginBottom: "0.4rem",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <input
            type="checkbox"
            checked={selectedFocus.includes(opt.value)}
            onChange={() => toggleOption(opt.value)}
            style={{ marginRight: "0.5rem" }}
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
  );
}
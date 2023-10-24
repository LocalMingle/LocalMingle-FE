// Selector.tsx
import React from "react";
import * as St from "./STSelector";

interface SelectorProps {
  options: { value: string | string[]; label: string | string[] }[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: React.FC<SelectorProps> = ({ options, onChange }) => {
  const normalizedOptions = options || [];

  return (
    <St.SelectorBar>
      <St.Selector onChange={onChange}>
        {normalizedOptions.map((option, index) => (
          <option
            key={index}
            value={
              Array.isArray(option.value)
                ? option.value.join(",")
                : option.value
            }
          >
            {Array.isArray(option.label)
              ? option.label.join(",")
              : option.label}
          </option>
        ))}
      </St.Selector>
    </St.SelectorBar>
  );
};

export default Selector;

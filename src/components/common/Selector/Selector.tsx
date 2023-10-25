// Selector.tsx
import React from "react";
import * as St from "./STSelector";

interface SelectorProps {
  value: string | string[] | undefined;
  options: { value: string | string[]; label: string | string[] }[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: React.FC<SelectorProps> = ({ value, options, onChange }) => {
  const normalizedOptions = options || [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummyValue = value; // 사용하지 않는 변수로 표시

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

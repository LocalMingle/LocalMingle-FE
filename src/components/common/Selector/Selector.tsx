// Selector.tsx
import React from 'react';
import * as St from './STSelector';

interface SelectorProps {
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: React.FC<SelectorProps> = ({ options, onChange }) => {
  return (
    <St.SelectorBar>
      <St.Selector onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </St.Selector>
    </St.SelectorBar>
  );
};

export default Selector;

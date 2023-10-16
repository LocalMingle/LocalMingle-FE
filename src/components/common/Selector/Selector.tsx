// Selector.tsx
import React from 'react';
import * as St from './STSelector';

interface SelectorProps {
  options: { value: string; label: string }[];
}

const Selector: React.FC<SelectorProps> = ({ options }) => {
  return (
    <St.SelectorBar>
      <St.Selector>
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

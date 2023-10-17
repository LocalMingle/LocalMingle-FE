// Selector.tsx
import React from 'react';
import * as St from './STSelector';

interface SelectorProps {
  options: { value: string[]; label: string[] }[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: React.FC<SelectorProps> = ({ options, onChange }) => {
  const normalizedOptions = options || [];

  return (
    <St.SelectorBar>
      <St.Selector onChange={onChange}>
        {normalizedOptions.map((option) => (
          <option>
            {option.label}
          </option>
        ))}
      </St.Selector>
    </St.SelectorBar>
  );
};

export default Selector;

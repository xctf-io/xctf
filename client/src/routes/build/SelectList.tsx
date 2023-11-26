import React, { useState } from 'react';

interface SelectListProps {
    options: Array<{ value: string, label: string }>;
    onSelectChange?: (value: string) => void;
}

export const SelectList: React.FC<SelectListProps> = ({ options, onSelectChange }) => {
    const [selectedValue, setSelectedValue] = useState<string>(options[0]?.value || '');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onSelectChange && onSelectChange(value);
    };

    return (
        <select value={selectedValue} onChange={handleChange}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

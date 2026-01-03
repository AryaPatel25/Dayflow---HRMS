import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ value, onValueChange, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-gray-600"
      >
        <span className="text-white">{value || 'Select...'}</span>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-700 bg-[#1e293b] shadow-xl">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onSelect: (val) => {
                    onValueChange(val);
                    setIsOpen(false);
                  },
                });
              }
              return child;
            })}
          </div>
        </>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onSelect, className = '' }) => {
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none text-white hover:bg-teal-600/20 hover:text-teal-400 focus:bg-teal-600/20 focus:text-teal-400 transition-colors ${className}`}
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
};

export { Select, SelectItem };


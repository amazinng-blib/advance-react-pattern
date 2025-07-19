import { useCustomSelectContext } from '@/app/context/customSelectContext';
import { ReactNode, useCallback, MouseEvent } from 'react';

interface Props {
  children: ReactNode;
}

const SelectTrigger = () => {
  const { activeOption, open, setOpen } = useCustomSelectContext();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
    if (e.key === 'Escape' && open) {
      setOpen(false);
    }
  };

  return (
    <button
      className="w-full border-2 rounded-md p-2 cursor-pointer bg-white hover:bg-gray-50 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-start"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label={
        activeOption ? `Selected: ${activeOption}` : 'Select an option'
      }
      type="button"
    >
      {activeOption ? (
        <span className="font-medium">{activeOption}</span>
      ) : (
        <span className="text-gray-500">Select an option</span>
      )}
    </button>
  );
};

const SelectContainer = ({ children }: Props) => {
  const { open } = useCustomSelectContext();

  return (
    <div>
      <SelectTrigger />

      {open && (
        <div className="mt-1 border-2 rounded-md bg-white shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

const SelectContent = ({ children }: Props) => {
  return <div className="flex flex-col">{children}</div>;
};

interface OptionsInterface {
  value: string;
  children: React.ReactNode;
}

const SelectItem = ({ value, children }: OptionsInterface) => {
  const { activeOption, setActiveOption, setOpen } = useCustomSelectContext();

  const handleOptionClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setActiveOption(value);
      setOpen(false);
    },
    [value, setActiveOption, setOpen]
  );

  const isActive = value === activeOption;

  const className = `p-2 cursor-pointer border-b last:border-b-0 focus:outline-none focus:bg-gray-200 ${
    isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
  }`;

  return (
    <div className={className} onClick={handleOptionClick}>
      {children}
    </div>
  );
};

export { SelectContainer, SelectContent, SelectItem, SelectTrigger };

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

interface SelectContext {
  activeOption: string;
  setActiveOption: (key: string) => void;
  //   open: boolean;
  //   setOpen: (key: boolean) => void;
}

interface WithClassName {
  className?: string;
}

const SelectContext = createContext<SelectContext | undefined>(undefined);
interface SelectProps extends PropsWithChildren, WithClassName {}

const Select = ({ children, className }: SelectProps) => {
  const [activeOption, setActiveOption] = useState('');

  const contextValue = useMemo(
    () => ({ activeOption, setActiveOption }),
    [activeOption, setActiveOption]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <select
        className={`rounded-md  bg-background-700 p-2 hover:cursor-pointer border-2 ${className}`}
      >
        {children}
      </select>
    </SelectContext.Provider>
  );
};

interface OptionsProps extends PropsWithChildren {
  Optionkey: string;
}

const Option = ({ Optionkey, children }: OptionsProps) => {
  const { activeOption, setActiveOption } = useSelectContext();

  const isActive = activeOption === Optionkey;
  const className = `p-2 ${isActive ? 'bg-red-600' : 'bg-white'} border-2`;

  return (
    <option
      value={Optionkey}
      className={className}
      onClick={() => setActiveOption(Optionkey)}
    >
      {children}
    </option>
  );
};

Select.Option = Option;

export default Select;

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      'useSelectContext should be used within the scope of a select component'
    );
  }

  return context;
};

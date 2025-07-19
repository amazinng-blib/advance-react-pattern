import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface CustomSelectContextType {
  activeOption: string;
  setActiveOption: (option: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CustomSelectContext = createContext<CustomSelectContextType | null>(null);

interface CustomSelectProviderProps {
  children: ReactNode;
}

export const Select = ({ children }: CustomSelectProviderProps) => {
  const [activeOption, setActiveOption] = useState('');
  const [open, setOpen] = useState(false);

  const contextValue = useMemo(
    () => ({ activeOption, setActiveOption, open, setOpen }),
    [activeOption, setActiveOption, open, setOpen]
  );

  return (
    <CustomSelectContext.Provider value={contextValue}>
      {children}
    </CustomSelectContext.Provider>
  );
};

export const useCustomSelectContext = () => {
  const context = useContext(CustomSelectContext);

  if (!context) {
    throw new Error(
      'useCustomSelectContext must be used within CustomSelectProvider'
    );
  }

  return context;
};

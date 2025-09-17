"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type RadioContextType = {
  selectedOption: string;
  handleRadioSelection: (value: string) => void;
};

const RadioContext = createContext<RadioContextType | undefined>(undefined);

type RadioProviderProps = {
  children: ReactNode;
};

export const RadioProvider = ({ children }: RadioProviderProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("allProvRadio");

  const handleRadioSelection = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <RadioContext.Provider value={{ selectedOption, handleRadioSelection }}>
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = (): RadioContextType => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("useRadio must be used within a RadioProvider");
  }
  return context;
};


import { createContext } from "react";

export const ForDataContext = createContext({});

interface FormDataContextProviderProps {
  children: React.ReactNode;
}

const FormDataContextProvider = ({ children }: FormDataContextProviderProps) => {
  return <ForDataContext.Provider value={{}}>{children}</ForDataContext.Provider>;
};

import { createContext, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

// Interface for the user
interface User {
  ["$id"]: string; // Meant to be Appwrite's system-generated user ID
  name: string;
  email: string;
  avatar: string;
}

// Interface for the global context
interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>; // newParams is an optional parameter that can be used to refetch the data with new parameters.
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// {children}: {children: React.ReactNode} is a prop that is passed to the GlobalProvider component. It is used to pass the children of the GlobalProvider component.
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  // Use the useAppwrite hook to get the user
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser, // this means that the function to be called is getCurrentUser. Even when refetching, the function will be called again.
  });

  // Check if the user is logged in
  const isLoggedIn = user !== null;

  return (
    // Wrap the screens in this provider component and pass the context values to the screens.
    <GlobalContext.Provider value={{ isLoggedIn, user, loading, refetch }}>
      {/* This is the children of the GlobalProvider component. It is the screens that will be rendered. */}
      {/* 'refetch' in this case is the getCurrentUser function */}
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  // Use the useContext hook to get the context
  const context = useContext(GlobalContext);

  // If the context is not found, throw an error
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  // Return the context
  return context;
};

export default GlobalProvider;

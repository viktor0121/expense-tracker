import { createContext } from "react";

interface LoadingContextValues {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

const LoadingContext = createContext<LoadingContextValues>({
  isLoading: true,
  setIsLoading: () => {},
});

export default LoadingContext;

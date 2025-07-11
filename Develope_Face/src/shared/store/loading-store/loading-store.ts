import { create } from "zustand";

interface LoadingFieldState {
  thisPageIsLoading: boolean;
  loadingMessage?: string;
  setIsLoading: (isLoading: boolean, message?: string) => void;
}

export const useLoadingStateStore = create<LoadingFieldState>((set) => ({
  thisPageIsLoading: false,
  loadingMessage: undefined,
  setIsLoading: (isLoading: boolean, message?: string) =>
    set({ thisPageIsLoading: isLoading, loadingMessage: message }),
}));

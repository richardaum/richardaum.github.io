import { create } from "zustand";

interface DrawerStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  toggle: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) =>
    set((state) => ({
      isOpen: typeof isOpen === "function" ? isOpen(state.isOpen) : isOpen,
    })),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

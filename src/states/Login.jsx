import { create } from "zustand";

export const useLoginStore = create((set) => ({
    loginVisibility: false,
    toggleLoginVisibility: () => set((state) => ({ loginVisibility: !state.loginVisibility }))
}))
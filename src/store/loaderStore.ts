import { create } from "zustand";
import type { LoaderState } from "../types";

export const useLoaderStore = create<LoaderState>()((set) => ({
  loading: false,
  setLoading: (l: boolean) => set({ loading: l }),
}));

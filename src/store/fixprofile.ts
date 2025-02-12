import { create } from 'zustand';

interface State {
  imageurl: string;
  setImageurl: (url: string) => void;
}

export const useFixProfile = create<State>((set) => ({
  imageurl: '',
  setImageurl: (url) => set({ imageurl: url }),
}));

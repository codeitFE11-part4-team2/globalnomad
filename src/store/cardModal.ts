import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  selectedCardId: number | null;
  openModal: (id: number) => void;
  closeModal: () => void;
}

export const cardModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedCardId: null,
  openModal: (id) => {
    set({ isOpen: true, selectedCardId: id });
  },
  closeModal: () => {
    set({ isOpen: false, selectedCardId: null });
  },
}));

import { create } from 'zustand';

type ModalType =
  | 'pwerror'
  | 'card'
  | 'emailerror'
  | 'checkemail'
  | 'address'
  | null;

interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: (type?: ModalType) => void; // 타입이 선택적 (type?: ModalType)
}

export const modalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  modalType: null,
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: (type) => {
    const { modalType } = get();
    if (!type || modalType === type) {
      set({ isOpen: false, modalType: null });
    }
  },
}));

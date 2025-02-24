import { create } from 'zustand';

type ModalType =
  | 'pwerror'
  | 'card'
  | 'emailerror'
  | 'checkemail'
  | 'address'
  | 'activitycomplete'
  | null;

interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  modalData: any; //나중에 수정
  openModal: (type: ModalType, data?: any) => void;
  closeModal: (type?: ModalType) => void; // 타입이 선택적 (type?: ModalType)
}

export const modalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  modalType: null,
  modalData: null,
  openModal: (type, data) =>
    set({ isOpen: true, modalType: type, modalData: data }),
  closeModal: (type) => {
    const { modalType } = get();
    if (!type || modalType === type) {
      set({ isOpen: false, modalType: null, modalData: null });
    }
  },
}));

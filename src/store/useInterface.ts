import { create } from "zustand";
import { MODELS, DIALOGS } from "../const";

export const useInterface = create((set) => ({
  text: null,
  isBagOpened: false,
  showBookshelfText: () => set({ text: DIALOGS[MODELS.BOOKSHELF] }),
  closeDialog: () => set({ text: null }),
  openBag: () => set({ isBagOpened: true }),
  closeBag: () => set({ isBagOpened: false }),
  tools: [],
  updateTools: (newTools) => set({ tools: newTools }),
}));

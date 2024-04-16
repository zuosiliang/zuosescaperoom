import { create } from "zustand";
import { COUCH_STATE, CouchState } from "../const";

export const useInterface = create((set) => ({
  text: null,
  isBagOpened: false,
  showDialog: (newText) => set({ text: newText }),
  closeDialog: () => set({ text: null }),
  openBag: () => set({ isBagOpened: true }),
  closeBag: () => set({ isBagOpened: false }),
  tools: [],
  updateTools: (newTools) => set({ tools: newTools }),
  couchState: COUCH_STATE.FIRST_GLANCE,
  setCouchState: (newCouchState: CouchState) =>
    set({ couchState: newCouchState }),
}));

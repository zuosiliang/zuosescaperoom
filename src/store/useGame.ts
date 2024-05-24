import { create } from "zustand";
import {
  COUCH_STATE,
  CouchState,
  Model,
  MODEL_TEXT_MAP,
  BOOKSHELF_STATE,
  BookshelfState,
  CABINET_STATE,
  CabinetState,
  TvState,
  TV_STATE,
  LOCK_STATE,
  LockState,
  DOOR_STATE,
  DoorState,
} from "../const";

export const useGame = create((set) => ({
  hoveredModel: null,
  setHoveredModel: (newHoveredModel: Model | null) =>
    set({ hoveredModel: newHoveredModel }),

  inEventModel: null,
  setInEventModel: (newInEventModel: Model | null) =>
    set({ inEventModel: newInEventModel }),
  text: null,
  isModelClose: false,
  setIsModelClose: (newIsModelClose: boolean) =>
    set({ isModelClose: newIsModelClose }),
  isBagOpened: false,
  showDialog: (newText) =>
    set((state) => {
      return {
        text:
          newText ??
          MODEL_TEXT_MAP[state.inEventModel][
            state[`${state.inEventModel.toLowerCase()}State`]
          ],
      };
    }),
  closeDialog: () => set({ text: null }),
  openBag: () => set({ isBagOpened: true }),
  closeBag: () => set({ isBagOpened: false }),
  tools: [],
  updateTools: (newTools) => set({ tools: newTools }),
  couchState: COUCH_STATE.FIRST_GLANCE,
  setCouchState: (newCouchState: CouchState) =>
    set({ couchState: newCouchState }),
  bookshelfState: BOOKSHELF_STATE.FIRST_GLANCE,
  setBookshelfState: (newBookshelfState: BookshelfState) =>
    set({ bookshelfState: newBookshelfState }),

  cabinetState: CABINET_STATE.FIRST_GLANCE,
  setCabinetState: (newCabinetState: CabinetState) =>
    set({ cabinetState: newCabinetState }),

  tvState: TV_STATE.FIRST_GLANCE,
  setTvState: (newTvState: TvState) => set({ tvState: newTvState }),

  lockState: LOCK_STATE.LOCKED,
  setLockState: (newLockState: LockState) => set({ lockState: newLockState }),

  doorState: DOOR_STATE.LOCKED,
  setDoorState: (newDoorState: DoorState) => set({ doorState: newDoorState }),

  restoreFreePlayCallback: null,
  setRestoreFreePlayCallback: (newRestoreFreePlayCallback) =>
    set({ restoreFreePlayCallback: newRestoreFreePlayCallback }),
  nextOperationCallback: null,
  setNextOperationCallback: (newNextOperationCallback) =>
    set({ nextOperationCallback: newNextOperationCallback }),
  toolCallback: null,
  setToolCallback: (newToolCallback) => set({ toolCallback: newToolCallback }),
}));

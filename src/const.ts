export type Model =
  | "BOOKSHELF"
  | "CABINET"
  | "CHAIR"
  | "COUCH"
  | "DOOR"
  | "PAPER";

export const MODELS: Record<Model, Model> = {
  BOOKSHELF: "BOOKSHELF",
  CABINET: "CABINET",
  CHAIR: "CHAIR",
  COUCH: "COUCH",
  DOOR: "DOOR",
  PAPER: "PAPER",
};

export const DIALOGS: Record<Model, string> = {
  BOOKSHELF: "BOOKSHELF",
  CABINET: "CABINET",
  CHAIR: "CHAIR",
  COUCH: "COUCH",
  DOOR: "DOOR",
  PAPER: "PAPER",
};

export const TOOLS_IMG: Record<Model, string> = {
  PAPER: "paper",
};

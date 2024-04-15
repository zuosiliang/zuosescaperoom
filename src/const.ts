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

export const TOO_FAR_TEXT = {
  BOOKSHELF: "这是一个书架，走近看看吧",
  CABINET: "这是一个保险柜，走近看看吧",
  CHAIR: "这是一把椅子，走近看看吧",
  COUCH: "这是一张沙发，走近看看吧",
  DOOR: "这是一扇门，走近看看吧",
  PAPER: "这是一张纸，走近看看吧",
};

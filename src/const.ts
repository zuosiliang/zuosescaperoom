export type Model =
  | "BOOKSHELF"
  | "CABINET"
  | "CHAIR"
  | "COUCH"
  | "DOOR"
  | "PAPER"
  | "FLOOR";

export const MODELS: Record<Model, Model> = {
  BOOKSHELF: "BOOKSHELF",
  CABINET: "CABINET",
  CHAIR: "CHAIR",
  COUCH: "COUCH",
  DOOR: "DOOR",
  PAPER: "PAPER",
  FLOOR: "FLOOR",
};

export type ModelStringMap = Partial<Record<Model, string>>;

export const DIALOGS: ModelStringMap = {
  BOOKSHELF: "BOOKSHELF",
  CABINET: "CABINET",
  CHAIR: "CHAIR",
  COUCH: "COUCH",
  DOOR: "DOOR",
  PAPER: "PAPER",
};

export const TOOLS_IMG: ModelStringMap = {
  PAPER: "paper",
};

export const TOO_FAR_TEXT: ModelStringMap = {
  BOOKSHELF: "这是一个书架，走近看看吧",
  CABINET: "这是一个保险柜，走近看看吧",
  CHAIR: "这是一把椅子，走近看看吧",
  COUCH: "这是一张沙发，走近看看吧",
  DOOR: "这是一扇门，走近看看吧",
  PAPER: "这是一张纸，走近看看吧",
};

export type ChairState =
  | "FIRST_GLANCE"
  | "PAPER_PICKED_UP"
  | "STAND_AWAY_FROM_BOOKSHELF"
  | "STAND_BY_BOOKSHELF"
  | "KEY_PICKED_UP";

export const CHAIR_TEXT_MAP = {
  FIRST_GLANCE: "a",
  PAPER_PICKED_UP: "a",
  STAND_AWAY_FROM_BOOKSHELF: "a",
  STAND_BY_BOOKSHELF: "a",
  KEY_PICKED_UP: "a",
};

export type CabinetState =
  | "FIRST_GLANCE"
  | "KEY_PICKED_UP"
  | "PASSWORD_AQUIRED";

export const CABINET_TEXT_MAP = {
  FIRST_GLANCE: "a",
  KEY_PICKED_UP: "a",
  PASSWORD_AQUIRED: "a",
};

export type CouchState = "FIRST_GLANCE" | "PAPER_PICKED_UP";

export const COUCH_STATE = {
  FIRST_GLANCE: "FIRST_GLANCE",
  PAPER_PICKED_UP: "PAPER_PICKED_UP",
};

export const COUCH_TEXT_MAP: Record<CouchState, string> = {
  FIRST_GLANCE:
    "一张很松软的沙发，坐着应该很舒服，等等，沙发底下好像有个东西？",
  PAPER_PICKED_UP: "沙发已经检查过了",
};

export type DoorState = "FIRST_GLANCE" | "PASSWORD_AQUIRED";

export const DOOR_TEXT_MAP: Record<DoorState, string> = {
  FIRST_GLANCE: "a",
  PASSWORD_AQUIRED: "a",
};

export type BookshelfState = "FIRST_GLANCE" | "KEY_PICKED_UP";

export const BOOKSHELF_TEXT_MAP: Record<BookshelfState, string> = {
  FIRST_GLANCE: "a",
  KEY_PICKED_UP: "a",
};

export const MODEL_TEXT_MAP: Partial<Record<Model, Record<string, string>>> = {
  BOOKSHELF: BOOKSHELF_TEXT_MAP,
  CABINET: CABINET_TEXT_MAP,
  CHAIR: CHAIR_TEXT_MAP,
  COUCH: COUCH_TEXT_MAP,
  DOOR: DOOR_TEXT_MAP,
};

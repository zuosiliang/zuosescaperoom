export type Model =
  | "BOOKSHELF"
  | "CABINET"
  | "CHAIR"
  | "COUCH"
  | "DOOR"
  | "FLOOR"
  | "TV"
  | "TV_CABINET"
  | "COFFEE_TABLE"
  | "LIGHT"
  | "BEAN_BAG"
  | "TURNABLE"
  | "LAMP"
  | "DISH"
  | "PAINTING"
  | "BOOKS"
  | "LOCK"
  | "CURTAIN"
  | "TV_CONTROL"
  | "PUZZLE_PAPER"
  | "TIP_PAPER"
  | "WALL";

export const MODELS: Record<Model, Model> = {
  BOOKSHELF: "BOOKSHELF",
  CABINET: "CABINET",
  CHAIR: "CHAIR",
  COUCH: "COUCH",
  DOOR: "DOOR",
  FLOOR: "FLOOR",
  TV: "TV",
  TV_CABINET: "TV_CABINET",
  COFFEE_TABLE: "COFFEE_TABLE",
  LIGHT: "LIGHT",
  BEAN_BAG: "BEAN_BAG",
  TURNABLE: "TURNABLE",
  LAMP: "LAMP",
  DISH: "DISH",
  PAINTING: "PAINTING",
  BOOKS: "BOOKS",
  LOCK: "LOCK",
  CURTAIN: "CURTAIN",
  TV_CONTROL: "TV_CONTROL",
  PUZZLE_PAPER: "PUZZLE_PAPER",
  TIP_PAPER: "TIP_PAPER",
  WALL: "WALL",
};

export type ModelStringMap = Partial<Record<Model, string>>;

export const DIALOGS: ModelStringMap = {
  BOOKSHELF: "BOOKSHELF",
  CABINET: "CABINET",
  CHAIR: "CHAIR",
  COUCH: "COUCH",
  DOOR: "DOOR",
};

export const TOO_FAR_TEXT = "走近看看吧";

export type CabinetState = "FIRST_GLANCE" | "PUZZLE_PAPER_PICKED_UP";

export const CABINET_STATE = {
  FIRST_GLANCE: "FIRST_GLANCE",
  PUZZLE_PAPER_PICKED_UP: "PUZZLE_PAPER_PICKED_UP",
};

export const CABINET_TEXT_MAP = {
  FIRST_GLANCE: "打开看看有什么吧",
  PUZZLE_PAPER_PICKED_UP: "柜子已经检查过了",
};

export type CouchState =
  | "FIRST_GLANCE"
  | "PAPER_PICKED_UP_UNDER_COUCH"
  | "PAPER_DIRECTLY_PICKED_UP";

export const COUCH_STATE = {
  FIRST_GLANCE: "FIRST_GLANCE",
  PAPER_PICKED_UP_UNDER_COUCH: "PAPER_PICKED_UP_UNDER_COUCH",
  PAPER_DIRECTLY_PICKED_UP: "PAPER_DIRECTLY_PICKED_UP",
};

export const COUCH_TEXT_MAP: Record<CouchState, string> = {
  FIRST_GLANCE:
    "一张很松软的沙发，坐着应该很舒服，等等，沙发底下好像有个东西？",
  PAPER_PICKED_UP_UNDER_COUCH: "沙发已经检查过了",
  PAPER_DIRECTLY_PICKED_UP: "一张很松软的沙发",
};

export type BookshelfState =
  | "FIRST_GLANCE"
  | "TV_CONTROL_PICKED_UP"
  | "HAVE_LOOKED_UP";

export const BOOKSHELF_STATE = {
  FIRST_GLANCE: "FIRST_GLANCE",
  TV_CONTROL_PICKED_UP: "TV_CONTROL_PICKED_UP",
  HAVE_LOOKED_UP: "HAVE_LOOKED_UP",
};

export const BOOKSHELF_TEXT_MAP: Record<BookshelfState, string> = {
  FIRST_GLANCE: "一个很高的书架，但是没有什么书，嗯？ 书架上面放着什么？",
  TV_CONTROL_PICKED_UP: "书架已经检查过了",
  HAVE_LOOKED_UP: "原来电视遥控器在这里",
};

export type TvState = "FIRST_GLANCE" | "TV_CONTROL_PICKED_UP" | "OPENED";

export const TV_STATE = {
  FIRST_GLANCE: "FIRST_GLANCE",
  TV_CONTROL_PICKED_UP: "TV_CONTROL_PICKED_UP",
  OPENED: "OPENED",
};

export const TV_TEXT_MAP: Record<TvState, string> = {
  FIRST_GLANCE: "这是一个电视机，没有遥控器的话没办法打开",
  TV_CONTROL_PICKED_UP: "拿遥控器打开试试吧",
  OPENED: "狗狗躺在沙滩上，真是可爱啊",
};

export type LockState = "UNLOCKED" | "LOCKED";

export const LOCK_STATE = {
  UNLOCKED: "UNLOCKED",
  LOCKED: "LOCKED",
};

export const LOCK_TEXT_MAP = {
  UNLOCKED: "已经解锁了",
  LOCKED: "输入密码试试，#号结束",
};

export type DoorState = LockState;

export const DOOR_STATE = LOCK_STATE;

export const DOOR_TEXT_MAP = {
  UNLOCKED: "门打开了！逃脱成功！",
  LOCKED: "门打不开，应该是通过旁边的密码锁打开的",
};

export const MODEL_TEXT_MAP: Partial<Record<Model, Record<string, string>>> = {
  BOOKSHELF: BOOKSHELF_TEXT_MAP,
  CABINET: CABINET_TEXT_MAP,
  COUCH: COUCH_TEXT_MAP,
  DOOR: DOOR_TEXT_MAP,
  TV: TV_TEXT_MAP,
  LOCK: LOCK_TEXT_MAP,
};

export const MODEL_CAMERA_MAP = {
  PUZZLE_PAPER: {
    position: {
      x: -2.5108060936254324,
      y: 1.1850369384873107,
      z: 3.295144638430454,
    },
    target: {
      x: -2.5,
      y: 0.01,
      z: 3.71,
    },
  },
  TURNABLE: {
    position: {
      x: -2.4935870114235135,
      y: 1.2875105193006586,
      z: 3.5957314385679218,
    },
    quaternion: {
      x: 0.0038334154261020904,
      y: 0.8144753565729396,
      z: 0.5801545439542026,
      w: 0.005991960517814864,
    },
  },
  TV_CONTROL: {
    position: {
      x: 0.7690376255655434,
      y: 2.05700254757278,
      z: 3.211078188489009,
    },
    target: { x: 0.34, y: 1.816, z: 3.52 },
  },
  LOCK: {
    position: {
      x: 2.1,
      y: 1.4213313883621523,
      z: 1.6911617704736237,
    },
    target: { x: 2.34, y: 1.42, z: 1.7 },
  },
  DOOR: {
    position: {
      x: 0.7,
      y: 1.4,
      z: 1.19,
    },
    target: { x: 2.476, y: 1.5, z: 1.39 },
  },
  LAMP: {
    position: {
      x: -2.791577982494928,
      y: 0.6974782434575364,
      z: 1.699858275891674,
    },
    target: { x: -2.98, y: 0.5, z: 1 },
  },
  BEAN_BAG: {
    position: {
      x: -1.9,
      y: 0.8775265932385632,
      z: 2.2900382214736994,
    },
    target: { x: -2.79, y: 0.3, z: 2.22 },
  },
  COFFEE_TABLE: {
    position: {
      x: -1,
      y: 1.272156316222665,
      z: 2.2970170452307963,
    },
    target: { x: -0.9, y: 0.34, z: 2.35 },
  },
  TV: {
    position: {
      x: -1.2789473051858604,
      y: 0.7,
      z: 2.356772927433575,
    },
    target: { x: -1.23, y: 0.7, z: 3.65 },
  },
  PAINTING: {
    position: {
      x: -1.43,
      y: 1.4835354589917635,
      z: 1.4550468724996084,
    },
    target: { x: -1.43, y: 1.42, z: 0.45 },
  },
  BOOKSHELF: {
    position: {
      x: 0.18355804694055644,
      y: 1.5154987797124897,
      z: 2.703005884222045,
    },
    target: {
      x: 0.16,
      y: 1.5,
      z: 3.68,
    },
  },
  CABINET: {
    position: {
      x: -2.5,
      y: 0.5,
      z: 2.9,
    },
    target: {
      x: -2.5,
      y: 0.5,
      z: 3.71,
    },
  },
  CHAIR: {
    position: {
      x: -0.14625132220344372,
      y: 1,
      z: 1.4896621921265503,
    },
    target: { x: 0.55, y: 0.4, z: 1.15 },
  },
  COUCH: {
    position: {
      x: -1.5140629365231975,
      y: 0.5471734618009844,
      z: 2.2215019251280776,
    },
    target: { x: -1.45, y: 0.33, z: 0.99 },
  },
  TIP_PAPER: {
    position: {
      x: -1.9,
      y: 0.1,
      z: 1.7,
    },
    target: { x: -1.74, y: 0.0, z: 1.29 },
  },
};

export const MODEL_NAME_MAP = {
  PUZZLE_PAPER: "纸片",
  TV_CONTROL: "遥控器",
  TIP_PAPER: "纸片",
};

export const MODEL_TOOL_MAP = {
  TV: MODELS.TV_CONTROL,
};

export const CORRECT_PASSWORD = [6, 1, 2];

export const TOOL_PIC_MAP = {
  PUZZLE_PAPER: "puzzle-paper.png",
  TV_CONTROL: "tv-control.png",
  TIP_PAPER: "tip-paper.png",
};

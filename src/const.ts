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
  LOCKED: "输入密码试试",
};

export type DoorState = LockState;

export const DOOR_STATE = LOCK_STATE;

export const DOOR_TEXT_MAP = {
  UNLOCKED: "已经解锁了",
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
    quaternion: {
      x: 0.016927217946611388,
      y: 0.8431341584661313,
      z: 0.5372886784888615,
      w: 0.012614915294486356,
    },
  },
  TIP_PAPER: {
    position: {
      x: -1.7666473512912855,
      y: 0.03327993892217466,
      z: 1.3908186320506044,
    },
    quaternion: {
      x: 0.04106457364160221,
      y: -0.052922040047864945,
      z: 0.009329410593125701,
      w: 0.9977103390096721,
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
    quaternion: {
      x: 0.03465022923530821,
      y: -0.9202035578322749,
      z: -0.10346434124914243,
      w: -0.37592539666354663,
    },
  },
  LOCK: {
    position: {
      x: 2.233991322915523,
      y: 1.4213313883621523,
      z: 1.6911617704736237,
    },
    quaternion: {
      x: 0.002469369158236289,
      y: 0.7051383960857738,
      z: 0.007229650450677228,
      w: -0.7090285443731619,
    },
  },
  DOOR: {
    position: {
      x: 1.3676345443019107,
      y: 1.5113654469637554,
      z: 1.2941782911589452,
    },
    quaternion: {
      x: -0.034502899782883116,
      y: -0.6869679795283046,
      z: -0.024912396105445413,
      w: 0.7254404989588408,
    },
  },
  LAMP: {
    position: {
      x: -2.791577982494928,
      y: 0.6974782434575364,
      z: 1.5998582758916764,
    },
    quaternion: {
      _x: -0.18398188080637978,
      _y: 0.07872237085524354,
      _z: 0.002300279730592148,
      _w: 0.9797694446016543,
    },
  },
  BEAN_BAG: {
    position: {
      x: -2.0600467657322796,
      y: 0.8775265932385632,
      z: 2.2900382214736994,
    },
    quaternion: {
      x: -0.24587634723494767,
      y: 0.611537139194817,
      z: 0.2527917828857861,
      w: 0.708282050994687,
    },
  },
  COFFEE_TABLE: {
    position: {
      x: -1,
      y: 1.272156316222665,
      z: 2.2970170452307963,
    },
    quaternion: {
      x: -0.7312635736119921,
      y: 0,
      z: 0,
      w: 0.6820949977152859,
    },
  },
  TV: {
    position: {
      x: -1.2789473051858604,
      y: 0.8139999999990687,
      z: 2.656772927433575,
    },
    quaternion: {
      x: 0,
      y: 0.9999943053949856,
      z: 0,
      w: -0.003374785562163689,
    },
  },
  PAINTING: {
    position: {
      x: -1.331913369167884,
      y: 1.4835354589917635,
      z: 1.4550468724996084,
    },
    quaternion: {
      x: -0.01569058137224966,
      y: -0.008118521439436128,
      z: 0.00560817034437162,
      w: 0.9998282070892078,
    },
  },
  BOOKSHELF: {
    position: {
      x: 0.18355804694055644,
      y: 1.5154987797124897,
      z: 2.803005884222045,
    },
    quaternion: {
      x: -0.00010325393332712038,
      y: -0.9994457058652443,
      z: -0.03314477942597406,
      w: 0.0031135129593475573,
    },
  },
  CABINET: {
    position: {
      x: -2.523967749637059,
      y: 0.5875954828642933,
      z: 2.9366164054280426,
    },
    quaternion: {
      x: -0.0004857965992934002,
      y: 0.9887886453346276,
      z: 0.1492863879881331,
      w: 0.0032176420623270395,
    },
  },
  CHAIR: {
    position: {
      x: -0.14625132220344372,
      y: 0.5799865605668112,
      z: 1.4896621921265503,
    },
    quaternion: {
      w: 0.8075332694709342,
      x: -0.12255992401507089,
      y: -0.5704383196497319,
      z: -0.08642457519811306,
    },
  },
  COUCH: {
    position: {
      x: -1.5140629365231975,
      y: 0.5471734618009844,
      z: 2.2215019251280776,
    },
    quaternion: {
      w: 0.9997890827089093,
      x: -0.02049946219088187,
      y: -0.0012495957361237792,
      z: 0.000025621444552235468,
    },
  },
  CABINET_KEY: {
    position: {
      x: -3.211418040355058,
      y: 2.01,
      z: 0.2569674631056187,
    },
    quaternion: {
      w: 0.7770148674108699,
      x: 0,
      y: -0.6294822442471816,
      z: -0,
    },
  },
  PAPER: {
    position: {
      x: -1.8432027693348396,
      y: 0.2216488128356289,
      z: 0.7553756927683412,
    },
    quaternion: {
      x: -0.07540216321978366,
      y: -0.7419518547088767,
      z: -0.08466242286497018,
      w: 0.6607981788946365,
    },
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

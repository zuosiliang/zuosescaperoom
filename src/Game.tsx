import { useControls } from "leva";
import { useGame } from "./store/useGame";
import {
  useCursor,
  useGLTF,
  OrbitControls,
  // FlyControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import {
  EffectComposer,
  Selection,
  Select,
  Outline,
} from "@react-three/postprocessing";
import { useThree, useFrame } from "@react-three/fiber";
import {
  MODELS,
  Model,
  TOO_FAR_TEXT,
  COUCH_STATE,
  MODEL_CAMERA_MAP,
  BOOKSHELF_STATE,
  CABINET_STATE,
  TV_STATE,
} from "./const";
import * as THREE from "three";
import { gsap } from "gsap";
import Tv from "./gltfComponents/Tv";
import Light from "./gltfComponents/Light";
import Room from "./gltfComponents/Room";
import Lamp from "./gltfComponents/Lamp";
import Books from "./gltfComponents/Books";
import Door from "./gltfComponents/Door";
import Lock from "./gltfComponents/Lock";
import Cabinet from "./gltfComponents/Cabinet";
import Chair from "./gltfComponents/Chair";
import Bookshelf from "./gltfComponents/Bookshelf";
import CoffeeTable from "./gltfComponents/Coffee-table";
import Painting from "./gltfComponents/Painting";
import TvControl from "./gltfComponents/TvControl";
import TipPaper from "./gltfComponents/TipPaper";
// import Turnable from "./gltfComponents/Turnable";
import Curtain from "./gltfComponents/Curtain";

const noop = () => {};

export type HoverStates = Record<Model, boolean>;

// TODO
// 1. 修复聚焦时camera移动路径跳跃的问题
// 2. 增加点光源，bloom effect，软阴影
// 3. 性能优化
// 4. 动态窗帘效果
// 5. 开始游戏转场效果
// 6. 在blender中把门的位置打个洞，让门正好嵌入洞中
//
// DONE
// 1. 鼠标hover在地板上时展示圆圈
// 2. 鼠标hover在模型上显示outline

function Game() {
  const defineCustomName = (obj, customName: Model) => {
    const rootNode = obj.scene;
    const traverse = (node) => {
      if (node.children.length) {
        node.children.forEach((item) => {
          traverse(item);
        });
      }
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
      node.userData.customName = customName;
    };
    traverse(rootNode);
    return obj;
  };
  const {
    text: bookshelfText,
    tools,
    updateTools,
    showDialog,
    setRestoreFreePlayCallback,
    hoveredModel,
    setHoveredModel,
    setIsModelClose,
    inEventModel,
    setInEventModel,
    setCouchState,
    setNextOperationCallback,
    setBookshelfState,
    setCabinetState,
    setToolCallback,
    setTvState,
  } = useGame();

  const pointerRef = useRef(new THREE.Vector2());
  const pointLightRef = useRef(null);
  const raycaster = new THREE.Raycaster();
  const cameraStateRef = useRef(null);

  const couchModel = useGLTF("./sofa-v4.glb");
  // const tvModel = useGLTF("./led_tv.glb");
  const tvCabinetModel = useGLTF("./tvCabinet-v2.glb");

  const beanbagModel = useGLTF("./beanbag-v3.glb");

  const dishModel = useGLTF("./dish-v2.glb");

  // const room = useGLTF("./room-v1.glb");

  const couch = useMemo(
    () => defineCustomName(couchModel, MODELS.COUCH),
    [couchModel],
  );

  const tvCabinet = useMemo(
    () => defineCustomName(tvCabinetModel, MODELS.TV_CABINET),
    [tvCabinetModel],
  );

  const beanbag = useMemo(
    () => defineCustomName(beanbagModel, MODELS.BEAN_BAG),
    [beanbagModel],
  );

  const dish = useMemo(
    () => defineCustomName(dishModel, MODELS.DISH),
    [dishModel],
  );

  const footprintRef = useRef(null);

  const isClickRef = useRef(false);
  const mouseDownRef = useRef(false);
  const isAnyModelThanRoomHovered =
    hoveredModel && ![MODELS.FLOOR, MODELS.WALL].includes(hoveredModel);
  useCursor(isAnyModelThanRoomHovered && !bookshelfText);

  const isAnyModelThanRoomHoveredRef = useRef(null);
  isAnyModelThanRoomHoveredRef.current = isAnyModelThanRoomHovered;
  const cameraRef = useRef(null);
  const {
    position: bookshelfPosition,
    scaleX: bookShelfScaleX,
    scaleY: bookShelfScaleY,
    scaleZ: bookShelfScaleZ,
    rotation: bookShelfRotation,
  } = useControls(MODELS.BOOKSHELF, {
    position: {
      value: { x: 0.16, y: 0, z: 3.68 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });

  const bookshelfScale = [bookShelfScaleX, bookShelfScaleY, bookShelfScaleZ];

  // const { position: pointLightPosition } = useControls("pointlight", {
  //   position: {
  //     value: { x: -0.46, y: 1.62, z: 2.2 },
  //     step: 0.01,
  //   },
  // });

  const {
    position: cabinetPosition,
    scaleX: cabinetScaleX,
    scaleY: cabinetScaleY,
    scaleZ: cabinetScaleZ,
    rotation: cabinetRotation,
  } = useControls(MODELS.CABINET, {
    position: {
      value: { x: -2.5, y: 0.01, z: 3.71 },
      step: 0.001,
    },
    rotation: {
      value: { x: 0, y: 3.14, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.7, min: 0, max: 2 },
    scaleY: { value: 0.7, min: 0, max: 2 },
    scaleZ: { value: 0.7, min: 0, max: 2 },
  });

  const cabinetScale = [cabinetScaleX, cabinetScaleY, cabinetScaleZ];

  const {
    position: beanbagPosition,
    scaleX: beanbagScaleX,
    scaleY: beanbagScaleY,
    scaleZ: beanbagScaleZ,
    rotation: beanbagRotation,
  } = useControls(MODELS.BEAN_BAG, {
    position: {
      value: { x: -2.79, y: 0, z: 2.22 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 1.55, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });

  const beanbagScale = [beanbagScaleX, beanbagScaleY, beanbagScaleZ];

  // const {
  //   position: turnablePosition,
  //   scaleX: turnableScaleX,
  //   scaleY: turnableScaleY,
  //   scaleZ: turnableScaleZ,
  //   rotation: turnableRotation,
  // } = useControls(MODELS.TURNABLE, {
  //   position: {
  //     value: { x: -2.71, y: 0.74, z: 3.63 },
  //     step: 0.01,
  //   },
  //   rotation: {
  //     value: { x: 0, y: 0, z: 0 },
  //     step: 0.01,
  //   },
  //   scaleX: { value: 1, min: 0, max: 2 },
  //   scaleY: { value: 1, min: 0, max: 2 },
  //   scaleZ: { value: 1, min: 0, max: 2 },
  // });

  // const turnableScale = [turnableScaleX, turnableScaleY, turnableScaleZ];

  const {
    position: lampPosition,
    scaleX: lampScaleX,
    scaleY: lampScaleY,
    scaleZ: lampScaleZ,
    rotation: lampRotation,
  } = useControls(MODELS.LAMP, {
    position: {
      value: { x: -2.98, y: 0, z: 1 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.005, min: 0, max: 2 },
    scaleY: { value: 0.005, min: 0, max: 2 },
    scaleZ: { value: 0.005, min: 0, max: 2 },
  });

  const lampScale = [lampScaleX, lampScaleY, lampScaleZ];

  const {
    position: dishPosition,
    scaleX: dishScaleX,
    scaleY: dishScaleY,
    scaleZ: dishScaleZ,
    rotation: dishRotation,
  } = useControls(MODELS.DISH, {
    position: {
      value: { x: -0.9, y: 0.34, z: 2.35 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.01, min: 0, max: 2 },
    scaleY: { value: 0.01, min: 0, max: 2 },
    scaleZ: { value: 0.01, min: 0, max: 2 },
  });

  const dishScale = [dishScaleX, dishScaleY, dishScaleZ];

  const {
    position: chairPosition,
    scaleX: chairScaleX,
    scaleY: chairScaleY,
    scaleZ: chairScaleZ,
    rotation: chairRotation,
  } = useControls(MODELS.CHAIR, {
    position: {
      value: { x: 0.55, y: 0, z: 1.15 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: -2.06, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });
  const chairScale = [chairScaleX, chairScaleY, chairScaleZ];

  const {
    position: couchPosition,
    scaleX: couchScaleX,
    scaleY: couchScaleY,
    scaleZ: couchScaleZ,
    rotation: couchRotation,
  } = useControls(MODELS.COUCH, {
    position: {
      value: { x: -1.45, y: 0.33, z: 0.99 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1.22, min: 0, max: 2 },
    scaleY: { value: 1.22, min: 0, max: 2 },
    scaleZ: { value: 1.22, min: 0, max: 2 },
  });
  const couchScale = [couchScaleX, couchScaleY, couchScaleZ];

  const {
    position: doorPosition,
    scaleX: doorScaleX,
    scaleY: doorScaleY,
    scaleZ: doorScaleZ,
    rotation: doorRotation,
  } = useControls(MODELS.DOOR, {
    position: {
      value: { x: 2.4, y: 0.03, z: 1.59 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: -1.57, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });

  const {
    position: lockPosition,
    scaleX: lockScaleX,
    scaleY: lockScaleY,
    scaleZ: lockScaleZ,
    rotation: lockRotation,
  } = useControls(MODELS.LOCK, {
    position: {
      value: { x: 2.37, y: 1.42, z: 1.7 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: -1.57, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });

  const lockScale = [lockScaleX, lockScaleY, lockScaleZ];

  const { position: cameraPosition } = useControls("camera", {
    position: {
      value: {
        x: -1,
        y: 1.5,
        z: 3.4,
      },
      step: 0.1,
    },
  });

  const doorScale = [doorScaleX, doorScaleY, doorScaleZ];

  const {
    position: bookPosition,
    scaleX: bookScaleX,
    scaleY: bookScaleY,
    scaleZ: bookScaleZ,
    rotation: bookRotation,
  } = useControls(MODELS.BOOKS, {
    position: {
      value: { x: 0.03, y: 0.935, z: 3.64 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: -3.66, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });
  const bookScale = [bookScaleX, bookScaleY, bookScaleZ];

  const {
    position: coffeeTablePosition,
    scaleX: coffeeTableScaleX,
    scaleY: coffeeTableScaleY,
    scaleZ: coffeeTableScaleZ,
    rotation: coffeeTableRotation,
  } = useControls(MODELS.COFFEE_TABLE, {
    position: {
      value: { x: -1.03, y: 0, z: 2.37 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.5, min: 0, max: 2 },
    scaleY: { value: 0.5, min: 0, max: 2 },
    scaleZ: { value: 0.5, min: 0, max: 2 },
  });

  const coffeTableScale = [
    coffeeTableScaleX,
    coffeeTableScaleY,
    coffeeTableScaleZ,
  ];

  const {
    position: tvPosition,
    scaleX: tvScaleX,
    scaleY: tvScaleY,
    scaleZ: tvScaleZ,
    rotation: tvRotation,
  } = useControls(MODELS.TV, {
    position: {
      value: { x: -1.23, y: 0.35, z: 3.65 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: -3.14, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.1, min: 0, max: 2 },
    scaleY: { value: 0.1, min: 0, max: 2 },
    scaleZ: { value: 0.1, min: 0, max: 2 },
  });

  const tvScale = [tvScaleX, tvScaleY, tvScaleZ];

  const {
    position: tvCabinetPosition,
    scaleX: tvCabinetScaleX,
    scaleY: tvCabinetScaleY,
    scaleZ: tvCabinetScaleZ,
    rotation: tvCabinetRotation,
  } = useControls(MODELS.TV_CABINET, {
    position: {
      value: { x: -1.23, y: -0.002, z: 3.62 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.5, min: 0, max: 2 },
    scaleY: { value: 0.5, min: 0, max: 2 },
    scaleZ: { value: 0.5, min: 0, max: 2 },
  });

  const tvCabinetScale = [tvCabinetScaleX, tvCabinetScaleY, tvCabinetScaleZ];

  const {
    position: lightPosition,
    scaleX: lightScaleX,
    scaleY: lightScaleY,
    scaleZ: lightScaleZ,
    rotation: lightRotation,
  } = useControls(MODELS.LIGHT, {
    position: {
      value: { x: -0.47, y: 2.36, z: 2.23 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.18, min: 0, max: 2 },
    scaleY: { value: 0.18, min: 0, max: 2 },
    scaleZ: { value: 0.18, min: 0, max: 2 },
  });
  const lightScale = [lightScaleX, lightScaleY, lightScaleZ];

  const { position: roomPosition, rotation: roomRotation } = useControls(
    "room",
    {
      position: {
        value: { x: -0.64, y: 0.2, z: 2.19 },
        step: 0.01,
      },
      rotation: {
        value: { x: 0, y: 0, z: 0 },
        step: 0.01,
      },
    },
  );

  const {
    position: curtainPosition,
    scaleX: curtainScaleX,
    scaleY: curtainScaleY,
    scaleZ: curtainScaleZ,
    rotation: curtainRotation,
  } = useControls(MODELS.CURTAIN, {
    position: {
      value: { x: -3.6, y: 0.27, z: 2.22 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 1.57, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.8, min: 0, max: 2 },
    scaleY: { value: 0.8, min: 0, max: 2 },
    scaleZ: { value: 0.8, min: 0, max: 2 },
  });

  const curtainScale = [curtainScaleX, curtainScaleY, curtainScaleZ];

  const {
    position: paintingPosition,
    scaleX: paintingScaleX,
    scaleY: paintingScaleY,
    scaleZ: paintingScaleZ,
    rotation: paintingRotation,
  } = useControls(MODELS.PAINTING, {
    position: {
      value: { x: -1.43, y: 1.42, z: 0.45 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0.02 },
      step: 0.01,
    },
    scaleX: { value: 0.0015, min: 0, max: 2 },
    scaleY: { value: 0.0015, min: 0, max: 2 },
    scaleZ: { value: 0.0015, min: 0, max: 2 },
  });

  const paintingScale = [paintingScaleX, paintingScaleY, paintingScaleZ];

  const {
    position: tvControlPosition,
    scaleX: tvControlScaleX,
    scaleY: tvControlScaleY,
    scaleZ: tvControlScaleZ,
    rotation: tvControlRotation,
  } = useControls(MODELS.TV_CONTROL, {
    position: {
      value: { x: 0.34, y: 1.816, z: 3.52 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: -0.63, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.02, min: 0, max: 2 },
    scaleY: { value: 0.02, min: 0, max: 2 },
    scaleZ: { value: 0.02, min: 0, max: 2 },
  });
  const tvControlScale = [tvControlScaleX, tvControlScaleY, tvControlScaleZ];

  const {
    position: tipPaperPosition,
    scaleX: tipPaperScaleX,
    scaleY: tipPaperScaleY,
    scaleZ: tipPaperScaleZ,
    rotation: tipPaperRotation,
  } = useControls(MODELS.TIP_PAPER, {
    position: {
      value: { x: -1.74, y: 0.0, z: 1.29 },
      step: 0.01,
    },
    rotation: {
      value: { x: 0, y: -0.63, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.01, min: 0, max: 2 },
    scaleY: { value: 0.01, min: 0, max: 2 },
    scaleZ: { value: 0.01, min: 0, max: 2 },
  });

  const tipPaperScale = [tipPaperScaleX, tipPaperScaleY, tipPaperScaleZ];

  const updateCameraOrbit = () => {
    // Update OrbitControls target to a point just in front of the camera
    const controls = get().controls;
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.x *= 0.001;
    forward.y *= 0.001;
    forward.z *= 0.001;
    controls?.target.copy(camera.position).add(forward);
  };
  const { camera, scene } = useThree();

  const { get } = useThree();

  const handleClickFloor = (event) => {
    if (isAnyModelThanRoomHovered || !isClickRef.current) {
      return;
    }

    const clickPoint = event.intersections[0]?.point;
    if (clickPoint) {
      gsap.to(camera.position, {
        duration: 1,
        x: clickPoint.x,
        y: 1.7,
        z: clickPoint.z,
        onUpdate: function () {
          updateCameraOrbit();
        },
      });
    }
  };

  const saveCurrentCameraState = () => {
    const quaternion = new THREE.Quaternion();
    const currentPosition = new THREE.Vector3();
    camera.getWorldPosition(currentPosition);
    camera.getWorldQuaternion(quaternion);
    cameraStateRef.current = { quaternion, currentPosition };
  };

  const restorePreviousCameraState = () => {
    const { quaternion, currentPosition } = cameraStateRef.current;
    gsap.to(camera.position, {
      duration: 0.5,
      x: currentPosition.x,
      y: currentPosition.y,
      z: currentPosition.z,
      onUpdate: function () {
        updateCameraOrbit();
      },
    });

    gsap.to(camera.quaternion, {
      duration: 0.5,
      x: quaternion.x,
      y: quaternion.y,
      z: quaternion.z,
      w: quaternion.w,
      onUpdate: function () {
        updateCameraOrbit();
      },
    });
  };

  const restoreFreePlay = () => {
    restorePreviousCameraState();
    setInEventModel(null);
  };

  const lookAtModel = (model: Model) => {
    const { position, quaternion } = MODEL_CAMERA_MAP[model];
    gsap.to(camera.position, {
      duration: 0.5,
      ...position,
      onUpdate: function () {
        updateCameraOrbit();
      },
    });

    gsap.to(camera.quaternion, {
      duration: 0.5,
      ...quaternion,
      onUpdate: function () {
        updateCameraOrbit();
      },
    });
  };

  const handleClickBookshelf = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.BOOKSHELF);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    setNextOperationCallback(() => {
      lookAtModel(MODELS.TV_CONTROL);
    });
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog();

    lookAtModel(MODELS.BOOKSHELF);
  };

  const handleClickChair = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.CHAIR);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog("一把很牢固的椅子");
    lookAtModel(MODELS.CHAIR);
  };

  const handleClickCouch = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.COUCH);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setNextOperationCallback(() => {
      lookAtModel(MODELS.TIP_PAPER);
    });
    setRestoreFreePlayCallback(restoreFreePlay);

    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog();

    lookAtModel(MODELS.COUCH);
  };

  const handleClickCabinet = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.CABINET);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setNextOperationCallback(() => {
      lookAtModel(MODELS.PUZZLE_PAPER);

      const upperDrawer = scene.getObjectByName("CabinetA_DrawerUpper");
      gsap.to(upperDrawer.position, {
        duration: 1,
        x: 0,
        y: 79.603,
        z: 40.05,
        onUpdate: function () {
          updateCameraOrbit();
        },
      });
    });
    setRestoreFreePlayCallback(restoreFreePlay);

    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog();

    lookAtModel(MODELS.CABINET);
  };

  const handleClickDoor = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.DOOR);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);

    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog();

    lookAtModel(MODELS.DOOR);
  };

  const handleClickTv = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.TV);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    setToolCallback(() => {
      setTvState(TV_STATE.OPENED);
    });
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog();
    lookAtModel(MODELS.TV);
  };

  const handleClickCoffeeTable = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.COFFEE_TABLE);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog("平平无奇的茶几，上面的盘子倒挺好看");
    lookAtModel(MODELS.COFFEE_TABLE);
  };

  const handleClickBeanbag = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.BEAN_BAG);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog("很松软的懒人沙发，好想躺上去啊");
    lookAtModel(MODELS.BEAN_BAG);
  };

  const handleClickLamp = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.LAMP);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog("落地灯");
    lookAtModel(MODELS.LAMP);
  };

  // const handleClickTurnable = (event) => {
  //   event.stopPropagation();
  //   setInEventModel(MODELS.TURNABLE);
  //   setIsModelClose(event.distance <= 2);
  //   saveCurrentCameraState();
  //   setRestoreFreePlayCallback(restoreFreePlay);
  //   if (event.distance > 2) {
  //     showDialog(TOO_FAR_TEXT);
  //     return;
  //   }
  //   showDialog("现在用黑胶唱片机的人真是不多了啊");
  //   lookAtModel(MODELS.TURNABLE);
  // };

  const handleClickPainting = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.PAINTING);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog("画风有点阴暗，不知道想表达什么");
    lookAtModel(MODELS.PAINTING);
  };

  const handleClickLock = (event) => {
    event.stopPropagation();
    setInEventModel(MODELS.LOCK);
    setIsModelClose(event.distance <= 2);
    saveCurrentCameraState();
    setRestoreFreePlayCallback(restoreFreePlay);
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    showDialog();
    lookAtModel(MODELS.LOCK);
  };

  const handleClickTipPaper = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    updateTools([...tools, MODELS.TIP_PAPER]);
    showDialog("道具获得：一张写着什么的纸");
    if (inEventModel === MODELS.COUCH) {
      setRestoreFreePlayCallback(restoreFreePlay);
      setCouchState(COUCH_STATE.PAPER_PICKED_UP_UNDER_COUCH);
      return;
    }
    setCouchState(COUCH_STATE.PAPER_DIRECTLY_PICKED_UP);
  };

  const handleClickPuzzlePaper = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    updateTools([...tools, MODELS.PUZZLE_PAPER]);
    showDialog("道具获得：一张写着什么的纸");
    const upperDrawer = scene.getObjectByName("CabinetA_DrawerUpper");

    setRestoreFreePlayCallback(() => {
      gsap.to(upperDrawer.position, {
        duration: 1,
        x: 0,
        y: 79.603,
        z: 0.05,
        onUpdate: function () {
          updateCameraOrbit();
        },
      });

      restoreFreePlay();
    });
    setCabinetState(CABINET_STATE.PUZZLE_PAPER_PICKED_UP);
  };

  const handleClickTvControl = (event) => {
    event.stopPropagation();
    if (event.distance > 1) {
      showDialog(TOO_FAR_TEXT);
      return;
    }
    updateTools([...tools, MODELS.TV_CONTROL]);
    showDialog("道具获得：电视遥控器");
    setBookshelfState(BOOKSHELF_STATE.TV_CONTROL_PICKED_UP);
    setTvState(TV_STATE.TV_CONTROL_PICKED_UP);
  };

  // TODO
  // 1. cursor在wall上，显示大手图标，在物体/floor上，显示食指图标，开始拖动时，变成抓紧图标
  //
  // DONE
  // 1. 开始拖动视角时取消outline
  // 2. 解决点击路面切换位置时卡顿
  function checkIntersection() {
    raycaster.setFromCamera(pointerRef.current, cameraRef.current);
    const intersects = raycaster.intersectObject(scene, true);

    /** 鼠标是否在模型上 */
    if (intersects.length > 0) {
      const newhoveredModel = intersects[0].object.userData.customName;

      const intersectPoint = intersects[0].point;
      /** 鼠标在地板上 */
      if (newhoveredModel === MODELS.FLOOR) {
        if (hoveredModel !== MODELS.FLOOR) {
          setHoveredModel(MODELS.FLOOR);
        }
        footprintRef.current.visible = true;
        footprintRef.current.position.set(
          intersectPoint.x,
          intersectPoint.y + 0.01,
          intersectPoint.z,
        );

        return;
      }
      /** 鼠标还在同个模型上 */
      if (newhoveredModel === hoveredModel) {
        return;
      }
      /**鼠标在非地板的模型上 */
      if (newhoveredModel !== MODELS.FLOOR) {
        setHoveredModel(newhoveredModel);
        footprintRef.current.visible = false;
      }
    } else {
      setHoveredModel(null);
    }
  }

  useFrame((state) => {
    const {
      pointer: { x, y },
    } = state;
    const previousX = pointerRef.current.x;
    const previousY = pointerRef.current.y;
    pointerRef.current.x = x;
    pointerRef.current.y = y;

    // 当不处于drag orbitcontrols状态，并且鼠标已经移动，才重新计算射线
    if (mouseDownRef.current === false && previousX !== x && previousY !== y) {
      checkIntersection();
    }
  });

  useHelper(pointLightRef, THREE.PointLightHelper, 0.1);

  // isClickRef是用来区分click和drag的，所以click和drag两种状态下isClick布尔值是互反的
  // mouseDownRef用来区分drag和mousemove,当鼠标按下时候触发mousemove，属于drag事件；当鼠标未按下时候触发mousemove，属于mousemove事件
  //
  useEffect(() => {
    document.addEventListener("mousedown", () => {
      isClickRef.current = true;
      mouseDownRef.current = true;
    });
    document.addEventListener("mousemove", () => {
      isClickRef.current = false;

      if (mouseDownRef.current === true) {
        if (isAnyModelThanRoomHoveredRef.current) {
          setHoveredModel(null);
        }
        footprintRef.current.visible = false;
      }
    });
    document.addEventListener("mouseup", () => {
      mouseDownRef.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        manual
        args={[60, window.innerWidth / window.innerHeight, 1, 1000]}
        ref={cameraRef}
        position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        near={0.01}
      />
      {/* <axesHelper args={[100]} /> */}
      {/* <FlyControls
        autoForward={false}
        dragToLook={true}
        movementSpeed={1}
        rollSpeed={0.5}
        makeDefault
      /> */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        // maxPolarAngle={Math.PI / 2}
        target={[-1.01, 1.51, 3.41]}
        enabled={!inEventModel}
        rotateSpeed={-1}
        // panSpeed={10}
      />
      <ambientLight intensity={Math.PI} />

      {/* <pointLight
        // castShadow
        ref={pointLightRef}
        position={[
          pointLightPosition.x,
          pointLightPosition.y,
          pointLightPosition.z,
        ]}
        intensity={5}
        // shadow-mapSize-width={1024}
        // shadow-mapSize-height={1024}
        // shadow-camera-far={50}
        // shadow-camera-left={-10}
        // shadow-camera-right={10}
        // shadow-camera-top={10}
        // shadow-camera-bottom={-10}
        // shadow-bias={-0.001}
        // decay={0}
      /> */}
      <mesh ref={footprintRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.01, 2, 74]} />

        <meshBasicMaterial color="white" transparent opacity={0.2} />
      </mesh>

      <Selection>
        <EffectComposer autoClear={false}>
          <Outline
            edgeStrength={30} // the edge strength
          />
          {/* <Bloom mipmapBlur luminanceThreshold={1} levels={8} intensity={1} /> */}
        </EffectComposer>
        <Select
          enabled={[hoveredModel, inEventModel].includes(MODELS.BOOKSHELF)}
        >
          <Bookshelf
            position={[
              bookshelfPosition.x,
              bookshelfPosition.y,
              bookshelfPosition.z,
            ]}
            rotation={[
              bookShelfRotation.x,
              bookShelfRotation.y,
              bookShelfRotation.z,
            ]}
            scale={bookshelfScale}
            onClick={inEventModel ? noop : handleClickBookshelf}
          />
        </Select>
        <Select
          enabled={[hoveredModel, inEventModel].includes(MODELS.COFFEE_TABLE)}
        >
          <CoffeeTable
            position={[
              coffeeTablePosition.x,
              coffeeTablePosition.y,
              coffeeTablePosition.z,
            ]}
            rotation={[
              coffeeTableRotation.x,
              coffeeTableRotation.y,
              coffeeTableRotation.z,
            ]}
            scale={coffeTableScale}
            onClick={inEventModel ? noop : handleClickCoffeeTable}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.CABINET)}>
          <Cabinet
            position={[cabinetPosition.x, cabinetPosition.y, cabinetPosition.z]}
            rotation={[cabinetRotation.x, cabinetRotation.y, cabinetRotation.z]}
            scale={cabinetScale}
            onClick={inEventModel ? noop : handleClickCabinet}
            onClickPuzzlePaper={handleClickPuzzlePaper}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.CHAIR)}>
          <Chair
            position={[chairPosition.x, chairPosition.y, chairPosition.z]}
            rotation={[chairRotation.x, chairRotation.y, chairRotation.z]}
            scale={chairScale}
            onClick={inEventModel ? noop : handleClickChair}
          />
        </Select>
        <Select enabled={hoveredModel === MODELS.COUCH && !inEventModel}>
          <primitive
            castShadow
            position={[couchPosition.x, couchPosition.y, couchPosition.z]}
            object={couch.scene}
            rotation={[couchRotation.x, couchRotation.y, couchRotation.z]}
            scale={couchScale}
            onClick={inEventModel ? noop : handleClickCouch}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.DOOR)}>
          <Door
            position={[doorPosition.x, doorPosition.y, doorPosition.z]}
            rotation={[doorRotation.x, doorRotation.y, doorRotation.z]}
            scale={doorScale}
            onClick={inEventModel ? noop : handleClickDoor}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.LOCK)}>
          <Lock
            position={[lockPosition.x, lockPosition.y, lockPosition.z]}
            rotation={[lockRotation.x, lockRotation.y, lockRotation.z]}
            scale={lockScale}
            onClick={inEventModel ? noop : handleClickLock}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.TV)}>
          <Tv
            position={[tvPosition.x, tvPosition.y, tvPosition.z]}
            rotation={[tvRotation.x, tvRotation.y, tvRotation.z]}
            scale={tvScale}
            onClick={inEventModel ? noop : handleClickTv}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.LIGHT)}>
          <Light
            position={[lightPosition.x, lightPosition.y, lightPosition.z]}
            rotation={[lightRotation.x, lightRotation.y, lightRotation.z]}
            scale={lightScale}
          />
        </Select>
        <Select
          enabled={[hoveredModel, inEventModel].includes(MODELS.TV_CABINET)}
        >
          <primitive
            castShadow
            receiveShadow
            position={[
              tvCabinetPosition.x,
              tvCabinetPosition.y,
              tvCabinetPosition.z,
            ]}
            rotation={[
              tvCabinetRotation.x,
              tvCabinetRotation.y,
              tvCabinetRotation.z,
            ]}
            object={tvCabinet.scene}
            scale={tvCabinetScale}
            onClick={inEventModel ? noop : handleClickDoor}
          />
        </Select>
        <Select
          enabled={[hoveredModel, inEventModel].includes(MODELS.BEAN_BAG)}
        >
          <primitive
            castShadow
            receiveShadow
            position={[beanbagPosition.x, beanbagPosition.y, beanbagPosition.z]}
            rotation={[beanbagRotation.x, beanbagRotation.y, beanbagRotation.z]}
            object={beanbag.scene}
            scale={beanbagScale}
            onClick={inEventModel ? noop : handleClickBeanbag}
          />
        </Select>
        {/* <Select
          enabled={[hoveredModel, inEventModel].includes(MODELS.TURNABLE)}
        >
          <Turnable
            castShadow
            receiveShadow
            position={[
              turnablePosition.x,
              turnablePosition.y,
              turnablePosition.z,
            ]}
            rotation={[
              turnableRotation.x,
              turnableRotation.y,
              turnableRotation.z,
            ]}
            scale={turnableScale}
            onClick={inEventModel ? noop : handleClickTurnable}
          />
        </Select> */}
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.LAMP)}>
          <Lamp
            position={[lampPosition.x, lampPosition.y, lampPosition.z]}
            rotation={[lampRotation.x, lampRotation.y, lampRotation.z]}
            scale={lampScale}
            onClick={inEventModel ? noop : handleClickLamp}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.BOOKS)}>
          <Books
            position={[bookPosition.x, bookPosition.y, bookPosition.z]}
            rotation={[bookRotation.x, bookRotation.y, bookRotation.z]}
            scale={bookScale}
          />
        </Select>
        <Select enabled={[hoveredModel, inEventModel].includes(MODELS.DISH)}>
          <primitive
            castShadow
            receiveShadow
            position={[dishPosition.x, dishPosition.y, dishPosition.z]}
            rotation={[dishRotation.x, dishRotation.y, dishRotation.z]}
            object={dish.scene}
            scale={dishScale}
            // onClick={inEventModel ? noop : handleClickDoor}
          />
        </Select>
        <Select
          enabled={[hoveredModel, inEventModel].includes(MODELS.PAINTING)}
        >
          <Painting
            position={[
              paintingPosition.x,
              paintingPosition.y,
              paintingPosition.z,
            ]}
            rotation={[
              paintingRotation.x,
              paintingRotation.y,
              paintingRotation.z,
            ]}
            scale={paintingScale}
            onClick={inEventModel ? noop : handleClickPainting}
          />
        </Select>
        {tools.includes(MODELS.TV_CONTROL) ? null : (
          <Select
            enabled={[hoveredModel, inEventModel].includes(MODELS.TV_CONTROL)}
          >
            <TvControl
              position={[
                tvControlPosition.x,
                tvControlPosition.y,
                tvControlPosition.z,
              ]}
              rotation={[
                tvControlRotation.x,
                tvControlRotation.y,
                tvControlRotation.z,
              ]}
              scale={tvControlScale}
              onClick={
                [null, MODELS.BOOKSHELF].includes(inEventModel)
                  ? handleClickTvControl
                  : noop
              }
            />
          </Select>
        )}
      </Selection>
      <Room
        onClickFloor={handleClickFloor}
        position={[roomPosition.x, roomPosition.y, roomPosition.z]}
        rotation={[roomRotation.x, roomRotation.y, roomRotation.z]}
      />
      <Curtain
        position={[curtainPosition.x, curtainPosition.y, curtainPosition.z]}
        rotation={[curtainRotation.x, curtainRotation.y, curtainRotation.z]}
        scale={curtainScale}
        // onClick={inEventModel ? noop : handleClickDoor}
      />

      {tools.includes(MODELS.TIP_PAPER) ? null : (
        <TipPaper
          position={[
            tipPaperPosition.x,
            tipPaperPosition.y,
            tipPaperPosition.z,
          ]}
          rotation={[
            tipPaperRotation.x,
            tipPaperRotation.y,
            tipPaperRotation.z,
          ]}
          scale={tipPaperScale}
          onClick={
            [null, MODELS.COUCH].includes(inEventModel)
              ? handleClickTipPaper
              : noop
          }
        />
      )}

      {/* <BakeShadows /> */}
    </>
  );
}

export default Game;

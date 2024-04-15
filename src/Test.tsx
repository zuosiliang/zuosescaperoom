import { useControls } from "leva";
import { useInterface } from "./store/useInterface";
import {
  useCursor,
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useState, useRef, useMemo } from "react";
import {
  Outline,
  EffectComposer,
  Selection,
  Select,
} from "@react-three/postprocessing";
import { useThree, useFrame } from "@react-three/fiber";
import { MODELS, Model, TOO_FAR_TEXT } from "./const";
import * as THREE from "three";

type ScreenPosition = {
  x: number | null;
  y: number | null;
};

export type HoverStates = Record<Model, boolean>;

const defineCustomName = (obj, customName: Model) => {
  const rootNode = obj.scene;
  const traverse = (node) => {
    if (node.children.length) {
      node.children.forEach((item) => {
        traverse(item);
      });
    }

    node.userData.customName = customName;
  };
  traverse(rootNode);
  return obj;
};

function Test() {
  const {
    text: bookshelfText,
    showBookshelfText,
    tools,
    updateTools,
    showTooFarText,
  } = useInterface();

  const bookshelfModel = useGLTF("./shelf.glb");
  const cabinetModel = useGLTF(
    "./white-dresser-with-fully-modelled-drawers.glb",
  );
  const chairModel = useGLTF("./plastic-lawn-chair.glb");
  const couchModel = useGLTF("./couch.glb");
  const doorModel = useGLTF("./door.glb");
  const pointerRef = useRef(new THREE.Vector2());
  const raycaster = new THREE.Raycaster();

  const bookshelf = useMemo(
    () => defineCustomName(bookshelfModel, MODELS.BOOKSHELF),
    [bookshelfModel],
  );
  const chair = useMemo(
    () => defineCustomName(chairModel, MODELS.CHAIR),
    [chairModel],
  );
  const couch = useMemo(
    () => defineCustomName(couchModel, MODELS.COUCH),
    [couchModel],
  );
  const door = useMemo(
    () => defineCustomName(doorModel, MODELS.DOOR),
    [doorModel],
  );
  const cabinet = useMemo(
    () => defineCustomName(cabinetModel, MODELS.CABINET),
    [cabinetModel],
  );

  const [hoveredModel, setHoveredModel] = useState<Model | null>(null);
  const [isPaperPickedUp, setIsPaperPickedUp] = useState(false);
  const [footprintPosition, setFootprintPosition] = useState(
    new THREE.Vector3(3, 0.1, 0),
  );

  const pointerDownScreenPosition = useRef<ScreenPosition>({
    x: null,
    y: null,
  });
  const pointerUpScreenPosition = useRef<ScreenPosition>({ x: null, y: null });

  const isAnyModelThanFloorHovered =
    hoveredModel && hoveredModel !== MODELS.FLOOR;
  useCursor(isAnyModelThanFloorHovered && !bookshelfText);

  const cameraRef = useRef(null);
  const {
    position: bookshelfPosition,
    scaleX: bookShelfScaleX,
    scaleY: bookShelfScaleY,
    scaleZ: bookShelfScaleZ,
  } = useControls(MODELS.BOOKSHELF, {
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });

  const bookShelfScale = [bookShelfScaleX, bookShelfScaleY, bookShelfScaleZ];

  const {
    position: cabinetPosition,
    scaleX: cabinetScaleX,
    scaleY: cabinetScaleY,
    scaleZ: cabinetScaleZ,
  } = useControls(MODELS.CABINET, {
    position: {
      value: { x: -4, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 0.1, min: 0, max: 2 },
    scaleY: { value: 0.1, min: 0, max: 2 },
    scaleZ: { value: 0.1, min: 0, max: 2 },
  });
  const cabinetScale = [cabinetScaleX, cabinetScaleY, cabinetScaleZ];

  const {
    position: chairPosition,
    scaleX: chairScaleX,
    scaleY: chairScaleY,
    scaleZ: chairScaleZ,
  } = useControls(MODELS.CHAIR, {
    position: {
      value: { x: -3, y: 0, z: 0 },
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
  } = useControls(MODELS.COUCH, {
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });
  const couchScale = [couchScaleX, couchScaleY, couchScaleZ];

  const {
    position: doorPosition,
    scaleX: doorScaleX,
    scaleY: doorScaleY,
    scaleZ: doorScaleZ,
  } = useControls(MODELS.DOOR, {
    position: {
      value: { x: 7, y: 0, z: 0 },
      step: 0.01,
    },
    scaleX: { value: 1, min: 0, max: 2 },
    scaleY: { value: 1, min: 0, max: 2 },
    scaleZ: { value: 1, min: 0, max: 2 },
  });

  const { position: cameraPosition } = useControls({
    position: {
      value: {
        x: -3,
        y: 1.1,
        z: 4.5,
      },
      step: 0.1,
    },
  });

  const doorScale = [doorScaleX, doorScaleY, doorScaleZ];

  const { position: paperPosition } = useControls(MODELS.PAPER, {
    position: {
      value: { x: 3, y: 0.3, z: 0 },
      step: 0.01,
    },
  });

  const updateCameraOrbit = () => {
    // Update OrbitControls target to a point just in front of the camera
    const controls = get().controls;
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    controls?.target.copy(camera.position).add(forward);
  };
  const { camera, scene } = useThree();

  const { get } = useThree();

  const handleClickFloor = (event) => {
    const isOrbiting =
      pointerDownScreenPosition.current.x !==
        pointerUpScreenPosition.current.x &&
      pointerDownScreenPosition.current.y !== pointerUpScreenPosition.current.y;
    if (isAnyModelThanFloorHovered || isOrbiting) {
      return;
    }

    const clickPoint = event.intersections[0]?.point;
    if (clickPoint) {
      camera.position.set(clickPoint.x, 1.1, clickPoint.z);
    }

    updateCameraOrbit();
  };

  const handleClickBookshelf = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showTooFarText(TOO_FAR_TEXT[MODELS.BOOKSHELF]);
      return;
    }
    showBookshelfText();
  };

  const handleClickChair = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showTooFarText(TOO_FAR_TEXT[MODELS.CHAIR]);
      return;
    }
    showBookshelfText();
  };

  const handleClickCabinet = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showTooFarText(TOO_FAR_TEXT[MODELS.CABINET]);
      return;
    }
    showBookshelfText();
  };

  const handleClickDoor = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showTooFarText(TOO_FAR_TEXT[MODELS.DOOR]);
      return;
    }
    showBookshelfText();
  };

  const handleClickCouch = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showTooFarText(TOO_FAR_TEXT[MODELS.COUCH]);
      return;
    }
    showBookshelfText();
  };

  const handleClickPaper = (event) => {
    event.stopPropagation();
    if (event.distance > 2) {
      showTooFarText(TOO_FAR_TEXT[MODELS.PAPER]);
      return;
    }
    setIsPaperPickedUp(true);
    updateTools([...tools, MODELS.PAPER]);
  };

  function checkIntersection() {
    raycaster.setFromCamera(pointerRef.current, camera);
    const intersects = raycaster.intersectObject(scene, true);

    /** 鼠标是否在模型上 */
    if (intersects.length > 0) {
      const newhoveredModel = intersects[0].object.userData.customName;
      const intersectPoint = intersects[0].point;
      /** 鼠标在地板上 */
      if (newhoveredModel === MODELS.FLOOR) {
        setHoveredModel(MODELS.FLOOR);
        const newPosition = new THREE.Vector3(
          intersectPoint.x,
          intersectPoint.y + 0.01,
          intersectPoint.z,
        );
        setFootprintPosition(newPosition);
        return;
      }
      /** 鼠标还在同个模型上 */
      if (newhoveredModel === hoveredModel) {
        return;
      }
      /**鼠标在非地板的模型上 */
      if (newhoveredModel !== MODELS.FLOOR) {
        setHoveredModel(newhoveredModel);
      }
    } else {
      setHoveredModel(null);
    }
  }

  useFrame((state) => {
    const {
      pointer: { x, y },
    } = state;

    pointerRef.current.x = x;
    pointerRef.current.y = y;
    checkIntersection();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        manual
        args={[45, window.innerWidth / window.innerHeight, 1, 1000]}
        ref={cameraRef}
        position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
      />
      {/* <axesHelper args={[100]} /> */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        target={[-3, 1.1, 4.51]}
      />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <mesh
        userData={{ customName: MODELS.FLOOR }}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={handleClickFloor}
        onPointerUp={(e) => {
          pointerUpScreenPosition.current.x = e.x;
          pointerUpScreenPosition.current.y = e.y;
        }}
        onPointerDown={(e) => {
          pointerDownScreenPosition.current.x = e.x;
          pointerDownScreenPosition.current.y = e.y;
        }}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial side={THREE.DoubleSide} color="white" />
      </mesh>
      <mesh
        position={footprintPosition}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={handleClickPaper}
      >
        <torusGeometry args={[0.1, 0.01, 2, 74]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <Selection>
        <EffectComposer autoClear={false}>
          <Outline
            edgeStrength={30} // the edge strength
          />
        </EffectComposer>
        <Select enabled={hoveredModel === MODELS.BOOKSHELF}>
          <primitive
            position={[
              bookshelfPosition.x,
              bookshelfPosition.y,
              bookshelfPosition.z,
            ]}
            object={bookshelf.scene}
            scale={bookShelfScale}
            onClick={handleClickBookshelf}
          />
        </Select>
        {isPaperPickedUp ? null : (
          <Select enabled={hoveredModel === MODELS.PAPER}>
            <mesh
              userData={{ customName: MODELS.PAPER }}
              position={[paperPosition.x, paperPosition.y, paperPosition.z]}
              rotation={[Math.PI / 2, 0, 0]}
              onClick={handleClickPaper}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="hotpink" />
            </mesh>
          </Select>
        )}

        <Select enabled={hoveredModel === MODELS.CABINET}>
          <primitive
            position={[cabinetPosition.x, cabinetPosition.y, cabinetPosition.z]}
            object={cabinet.scene}
            scale={cabinetScale}
            onClick={handleClickCabinet}
          />
        </Select>
        <Select enabled={hoveredModel === MODELS.CHAIR}>
          <primitive
            position={[chairPosition.x, chairPosition.y, chairPosition.z]}
            object={chair.scene}
            scale={chairScale}
            onClick={handleClickChair}
          />
        </Select>
        <Select enabled={hoveredModel === MODELS.COUCH}>
          <primitive
            position={[couchPosition.x, couchPosition.y, couchPosition.z]}
            object={couch.scene}
            scale={couchScale}
            onClick={handleClickCouch}
          />
        </Select>
        <Select enabled={hoveredModel === MODELS.DOOR}>
          <primitive
            position={[doorPosition.x, doorPosition.y, doorPosition.z]}
            object={door.scene}
            scale={doorScale}
            onClick={handleClickDoor}
          />
        </Select>
      </Selection>
    </>
  );
}

export default Test;

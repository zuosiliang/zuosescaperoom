import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useCursor, useGLTF, OrbitControls } from "@react-three/drei";
import { useState, useRef } from "react";
import {
  Outline,
  EffectComposer,
  Selection,
  Select,
} from "@react-three/postprocessing";
import * as THREE from "three";

export type Model = "BOOKSHELF" | "CABINET" | "CHAIR" | "COUCH" | "DOOR";

const MODELS: Record<Model, Model> = {
  BOOKSHELF: "BOOKSHELF",
  CABINET: "CABINET",
  CHAIR: "CHAIR",
  COUCH: "COUCH",
  DOOR: "DOOR",
};

export type HoverStates = Record<Model, boolean>;

const initialHoverStates: HoverStates = {
  BOOKSHELF: false,
  CABINET: false,
  CHAIR: false,
  COUCH: false,
  DOOR: false,
};

function Test() {
  const bookshelf = useGLTF("./shelf.glb");
  const cabinet = useGLTF("./white-dresser-with-fully-modelled-drawers.glb");
  const chair = useGLTF("./plastic-lawn-chair.glb");
  const couch = useGLTF("./couch.glb");
  const door = useGLTF("./door.glb");

  const [hoverStates, setHoverStates] =
    useState<HoverStates>(initialHoverStates);

  const isAnyModelHovered = Object.values(hoverStates).includes(true);
  useCursor(isAnyModelHovered);

  const objectRef = useRef(null);

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

  const doorScale = [doorScaleX, doorScaleY, doorScaleZ];

  console.log(hoverStates);
  console.log(isAnyModelHovered);
  const setBookShelfHoverStateTrue = () => {
    setHoverStates({ ...hoverStates, [MODELS.BOOKSHELF]: true });
  };
  const setBookShelfHoverStateFalse = () => {
    setHoverStates({ ...hoverStates, [MODELS.BOOKSHELF]: false });
  };
  const setCouchHoverStateTrue = () => {
    setHoverStates({ ...hoverStates, [MODELS.COUCH]: true });
  };
  const setCouchHoverStateFalse = () => {
    setHoverStates({ ...hoverStates, [MODELS.COUCH]: false });
  };
  const setDoorHoverStateTrue = () => {
    setHoverStates({ ...hoverStates, [MODELS.DOOR]: true });
  };
  const setDoorHoverStateFalse = () => {
    setHoverStates({ ...hoverStates, [MODELS.DOOR]: false });
  };
  const setCabinetHoverStateTrue = () => {
    setHoverStates({ ...hoverStates, [MODELS.CABINET]: true });
  };
  const setCabinetHoverStateFalse = () => {
    setHoverStates({ ...hoverStates, [MODELS.CABINET]: false });
  };
  const setChairHoverStateTrue = () => {
    setHoverStates({ ...hoverStates, [MODELS.CHAIR]: true });
  };
  const setChairHoverStateFalse = () => {
    setHoverStates({ ...hoverStates, [MODELS.CHAIR]: false });
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0 }}
    >
      <Canvas
        style={{ background: "black" }} // Set background color here
      >
        <axesHelper args={[100]} />
        <OrbitControls makeDefault />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white" />
        </mesh>
        <Selection>
          <EffectComposer autoClear={false}>
            <Outline
              edgeStrength={30} // the edge strength
            />
          </EffectComposer>
          <Select enabled={hoverStates[MODELS.BOOKSHELF]}>
            <primitive
              position={[
                bookshelfPosition.x,
                bookshelfPosition.y,
                bookshelfPosition.z,
              ]}
              object={bookshelf.scene}
              scale={bookShelfScale}
              onPointerOver={setBookShelfHoverStateTrue}
              onPointerOut={setBookShelfHoverStateFalse}
              ref={objectRef}
            />
          </Select>
          <Select enabled={hoverStates[MODELS.CABINET]}>
            <primitive
              position={[
                cabinetPosition.x,
                cabinetPosition.y,
                cabinetPosition.z,
              ]}
              object={cabinet.scene}
              scale={cabinetScale}
              onPointerOver={setCabinetHoverStateTrue}
              onPointerOut={setCabinetHoverStateFalse}
              ref={objectRef}
            />
          </Select>
          <Select enabled={hoverStates[MODELS.CHAIR]}>
            <primitive
              position={[chairPosition.x, chairPosition.y, chairPosition.z]}
              object={chair.scene}
              scale={chairScale}
              onPointerOver={setChairHoverStateTrue}
              onPointerOut={setChairHoverStateFalse}
              ref={objectRef}
            />
          </Select>
          <Select enabled={hoverStates[MODELS.COUCH]}>
            <primitive
              position={[couchPosition.x, couchPosition.y, couchPosition.z]}
              object={couch.scene}
              scale={couchScale}
              onPointerOver={setCouchHoverStateTrue}
              onPointerOut={setCouchHoverStateFalse}
              ref={objectRef}
            />
          </Select>
          <Select enabled={hoverStates[MODELS.DOOR]}>
            <primitive
              position={[doorPosition.x, doorPosition.y, doorPosition.z]}
              object={door.scene}
              scale={doorScale}
              onPointerOver={setDoorHoverStateTrue}
              onPointerOut={setDoorHoverStateFalse}
              ref={objectRef}
            />
          </Select>
        </Selection>
      </Canvas>
    </div>
  );
}

export default Test;

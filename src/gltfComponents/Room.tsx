import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { MODELS } from "../const";

function Room({ onClickFloor, ...props }) {
  const { nodes, materials } = useGLTF("/room-v1.glb");

  const [floorColorMap, floorNormalMap, floorRoughMap] = useLoader(
    THREE.TextureLoader,
    [
      "./Wood_Floor_005_COLOR.jpg",
      "./Wood_Floor_005_NORM.jpg",
      "./Wood_Floor_005_ROUGH.jpg",
    ],
  );

  floorColorMap.wrapS = THREE.RepeatWrapping;
  floorColorMap.wrapT = THREE.RepeatWrapping;
  floorColorMap.repeat.set(8, 8); // Adjust the scale here

  floorNormalMap.wrapS = THREE.RepeatWrapping;
  floorNormalMap.wrapT = THREE.RepeatWrapping;
  floorNormalMap.repeat.set(8, 8); // Adjust the scale here

  floorRoughMap.wrapS = THREE.RepeatWrapping;
  floorRoughMap.wrapT = THREE.RepeatWrapping;
  floorRoughMap.repeat.set(8, 8); // Adjust the scale here

  const [wallBaseColorMap, wallNormalMap, wallRoughnessMap] = useLoader(
    THREE.TextureLoader,
    ["./wall-color.png", "./wall-normal.png", "./wall-rough.png"],
  );

  wallBaseColorMap.wrapS = THREE.RepeatWrapping;
  wallBaseColorMap.wrapT = THREE.RepeatWrapping;
  wallBaseColorMap.repeat.set(8, 8); // Adjust the scale here
  wallBaseColorMap.colorSpace = THREE.SRGBColorSpace;

  wallNormalMap.wrapS = THREE.RepeatWrapping;
  wallNormalMap.wrapT = THREE.RepeatWrapping;
  wallNormalMap.repeat.set(8, 8); // Adjust the scale here

  wallRoughnessMap.wrapS = THREE.RepeatWrapping;
  wallRoughnessMap.wrapT = THREE.RepeatWrapping;
  wallRoughnessMap.repeat.set(8, 8); // Adjust the scale here

  return (
    <group {...props} dispose={null}>
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[0, 1, 0]}
        userData={{ customName: "WALL" }}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          // color="pink"
          map={wallBaseColorMap}
          normalMap={wallNormalMap}
          //   displacementMap={wallDisplacementMap}
          //   metalnessMap={wallMetalnessMap}
          roughnessMap={wallRoughnessMap}
        />
      </mesh>
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.ground.geometry}
        material={materials.Material}
        position={[0, 1, 0]}
        onClick={onClickFloor}
        userData={{ customName: MODELS.FLOOR }}
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          // color="white"
          map={floorColorMap}
          normalMap={floorNormalMap}
          roughnessMap={floorRoughMap}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/room-v1.glb");

export default Room;

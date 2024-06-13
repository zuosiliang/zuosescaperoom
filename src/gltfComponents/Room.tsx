import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { MODELS } from "../const";

function Room({ onClickFloor, ...props }) {
  const { nodes } = useGLTF("/room-v4.glb");

  const [floorColorMap, floorNormalMap, floorRoughMap] = useLoader(
    THREE.TextureLoader,
    [
      "./laminate_floor_02_diff_1k.jpg",
      "./laminate_floor_02_nor_gl_1k.jpg",
      "./laminate_floor_02_rough_1k.jpg",
    ],
  );

  floorColorMap.wrapS = THREE.RepeatWrapping;
  floorColorMap.wrapT = THREE.RepeatWrapping;
  floorColorMap.repeat.set(12, 12); // Adjust the scale here

  floorNormalMap.wrapS = THREE.RepeatWrapping;
  floorNormalMap.wrapT = THREE.RepeatWrapping;
  floorNormalMap.repeat.set(12, 12); // Adjust the scale here

  floorRoughMap.wrapS = THREE.RepeatWrapping;
  floorRoughMap.wrapT = THREE.RepeatWrapping;
  floorRoughMap.repeat.set(12, 12); // Adjust the scale here

  const [wallBaseColorMap] = useLoader(THREE.TextureLoader, [
    "./beige_wall_001_diff_1k.jpg",
  ]);

  wallBaseColorMap.wrapS = THREE.RepeatWrapping;
  wallBaseColorMap.wrapT = THREE.RepeatWrapping;
  wallBaseColorMap.repeat.set(8, 8);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall.geometry}
        position={[-0.001, 1.2, -0.004]}
        userData={{ customName: MODELS.WALL }}
      >
        <meshLambertMaterial side={THREE.FrontSide} map={wallBaseColorMap} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.floor.geometry}
        position={[-0.001, 1.2, -0.004]}
        userData={{ customName: MODELS.FLOOR }}
        onClick={onClickFloor}
      >
        <meshStandardMaterial
          side={THREE.FrontSide}
          map={floorColorMap}
          normalMap={floorNormalMap}
          roughnessMap={floorRoughMap}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/room-v4.glb");

export default Room;

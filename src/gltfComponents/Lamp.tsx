import { useGLTF } from "@react-three/drei";
import { MODELS } from "../const";

function Lamp(props) {
  const { nodes, materials } = useGLTF("/lamp-v2.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LAMP_SHADE_GRAY.geometry}
        material={materials.LAMP_SHADE_GRAY}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.LAMP }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LIGHT_BULB.geometry}
        material={materials.PaletteMaterial001}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.LAMP }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.STEEL_GRAY.geometry}
        material={materials.STEEL_GRAY}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.LAMP }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WOOD.geometry}
        material={materials.WOOD}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.LAMP }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.STEEL_WHITE.geometry}
        material={materials.PaletteMaterial002}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.LAMP }}
      />
    </group>
  );
}

useGLTF.preload("/lamp-v2.glb");

export default Lamp;

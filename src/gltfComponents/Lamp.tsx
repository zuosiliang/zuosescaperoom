import { useGLTF } from "@react-three/drei";

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
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LIGHT_BULB.geometry}
        material={materials.PaletteMaterial001}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.STEEL_GRAY.geometry}
        material={materials.STEEL_GRAY}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WOOD.geometry}
        material={materials.WOOD}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.STEEL_WHITE.geometry}
        material={materials.PaletteMaterial002}
        position={[0, 128.466, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FLOOR.geometry}
        material={materials.FLOOR}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/lamp-v2.glb");

export default Lamp;

import { useGLTF } from "@react-three/drei";

function Lamp(props) {
  const { nodes, materials } = useGLTF("/lamp.glb");
  return (
    <group {...props} userData={{ customName: "lamp" }} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, 128.466]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.LAMP_SHADE_GRAY.geometry}
            material={materials.LAMP_SHADE_GRAY}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.LIGHT_BULB.geometry}
            material={materials.EnvironmentAmbientLight}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.STEEL_GRAY.geometry}
            material={materials.STEEL_GRAY}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WOOD.geometry}
            material={materials.WOOD}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.STEEL_WHITE.geometry}
            material={materials.STEEL_WHITE}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/lamp.glb");

export default Lamp;

import { useGLTF } from "@react-three/drei";

function Light(props) {
  const { nodes, materials } = useGLTF("/light-v3.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.lamp_01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.light.geometry}
        // material={materials.lamp_01}
      >
        <meshBasicMaterial color={[2, 2, 2]} toneMapped={false} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/light-v3.glb");

export default Light;

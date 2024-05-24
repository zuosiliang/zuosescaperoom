import { useGLTF } from "@react-three/drei";

function Painting(props) {
  const { nodes, materials } = useGLTF("/painting.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.569, -0.201, 0.758]} rotation={[0, 0, -1.591]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.defaultMat_1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.defaultMat_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.defaultMat}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/painting.glb");

export default Painting;

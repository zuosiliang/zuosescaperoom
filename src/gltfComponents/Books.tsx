import { useGLTF } from "@react-three/drei";

function Books(props) {
  const { nodes, materials } = useGLTF("/books-v5.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.g0001.geometry}
        material={materials.material}
        position={[0.062, 0.436, 0]}
        scale={0.5}
      />
    </group>
  );
}

useGLTF.preload("/books-v5.glb");

export default Books;

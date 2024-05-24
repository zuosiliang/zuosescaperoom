import { useGLTF } from "@react-three/drei";

function Books(props) {
  const { nodes, materials } = useGLTF("/childhood_books.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.5}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.g0_1.geometry}
            material={materials.material}
            position={[0.125, 0.871, 0]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/childhood_books.glb");

export default Books;

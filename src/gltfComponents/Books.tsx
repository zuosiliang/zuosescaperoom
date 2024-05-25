import { useGLTF } from "@react-three/drei";
import { MODELS } from "../const";

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
        userData={{ customName: MODELS.BOOKS }}
      />
    </group>
  );
}

useGLTF.preload("/books-v5.glb");

export default Books;

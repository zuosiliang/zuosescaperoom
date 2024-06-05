import { useGLTF } from "@react-three/drei";

function Curtain(props) {
  const { nodes, materials } = useGLTF("/curtain.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.left.geometry}
        material={materials.lambert4SG}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.008}
      />
    </group>
  );
}

useGLTF.preload("/curtain.glb");

export default Curtain;

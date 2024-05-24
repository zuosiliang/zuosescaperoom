import { useGLTF } from "@react-three/drei";

function PuzzlePaper(props) {
  const { nodes, materials } = useGLTF("/puzzlePaper.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.initialShadingGroup}
          position={[-2.375, 2.078, 0.119]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/puzzlePaper.glb");

export default PuzzlePaper;

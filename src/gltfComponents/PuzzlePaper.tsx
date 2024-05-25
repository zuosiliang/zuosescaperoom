import { useGLTF } from "@react-three/drei";
import { MODELS } from "../const";

function PuzzlePaper(props) {
  const { nodes, materials } = useGLTF("/puzzlePaper-v2.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.initialShadingGroup}
        position={[-2.375, 0.119, -2.078]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.PUZZLE_PAPER }}
      />
    </group>
  );
}

useGLTF.preload("/puzzlePaper-v2.glb");

export default PuzzlePaper;

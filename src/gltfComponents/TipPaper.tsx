import { useGLTF } from "@react-three/drei";
import { MODELS } from "../const";

function TipPaper(props) {
  const { nodes, materials } = useGLTF("/tipPaper-v2.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.initialShadingGroup}
        position={[-2.375, 0.119, -2.078]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.TIP_PAPER }}
      />
    </group>
  );
}

useGLTF.preload("/tipPaper-v2.glb");

export default TipPaper;

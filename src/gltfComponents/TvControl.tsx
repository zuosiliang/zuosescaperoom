import { useGLTF } from "@react-three/drei";

function TvControl(props) {
  const { nodes, materials } = useGLTF("/tv-remote-control-v2.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.base}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        material={materials.basemate}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.buttons}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/tv-remote-control-v2.glb");

export default TvControl;

import { useGLTF } from "@react-three/drei";

function TvControl(props) {
  const { nodes, materials } = useGLTF("/tv_remote_control.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.base}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.basemate}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.buttons}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/tv_remote_control.glb");

export default TvControl;

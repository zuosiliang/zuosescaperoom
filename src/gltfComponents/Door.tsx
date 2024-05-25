import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// TODO
// 1.输入正确密码后，再点击门需展示打开门的动画
// 2.通关后页面样式
function Door(props) {
  const { nodes, materials } = useGLTF("/door-v3.glb");
  const { gl } = useThree();
  const environment = new RoomEnvironment(gl);
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  materials.Frame.envMapIntensity = 1;

  materials.Frame.envMap = pmremGenerator.fromScene(environment).texture;
  materials.Metal.envMapIntensity = 1;

  materials.Metal.envMap = pmremGenerator.fromScene(environment).texture;

  materials.Pano.envMapIntensity = 1;

  materials.Pano.envMap = pmremGenerator.fromScene(environment).texture;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Frame}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial008.geometry}
        material={materials.Metal}
        position={[-0.916, 0, 0.117]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={0.001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial003.geometry}
        material={materials.Pano}
        position={[-0.149, 0.98, 0.095]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
    </group>
  );
}

useGLTF.preload("/door-v3.glb");

export default Door;

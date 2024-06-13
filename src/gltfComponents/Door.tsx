import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MODELS } from "../const";

// TODO
// 1.输入正确密码后，再点击门需展示打开门的动画
// 2.通关后页面样式
function Door(props) {
  const { nodes, materials } = useGLTF("/door-v4.glb");
  const { gl } = useThree();
  const environment = new RoomEnvironment(gl);
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  materials.Frame.envMapIntensity = 0.1;

  materials.Frame.envMap = pmremGenerator.fromScene(environment).texture;
  materials.Metal.envMapIntensity = 0.1;

  materials.Metal.envMap = pmremGenerator.fromScene(environment).texture;

  materials.Pano.envMapIntensity = 0.1;

  materials.Pano.envMap = pmremGenerator.fromScene(environment).texture;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.frame.geometry}
        material={materials.Frame}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.DOOR }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.handle.geometry}
        material={materials.Metal}
        position={[-0.916, 0, 0.117]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        userData={{ customName: MODELS.DOOR }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.panel.geometry}
        material={materials.Pano}
        position={[-0.149, 0.98, 0.095]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ customName: MODELS.DOOR }}
      />
    </group>
  );
}

useGLTF.preload("/door-v4.glb");

export default Door;

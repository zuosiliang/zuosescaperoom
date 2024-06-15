import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MODELS } from "../const";
import { useRef, useImperativeHandle } from "react";

// DONE
// 1.输入正确密码后，再点击门需展示打开门的动画
// 2.通关后页面样式

function Door({ animationRef, ...props }) {
  const { gl } = useThree();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/door-v5.glb");
  const { actions } = useAnimations(animations, group);

  const environment = new RoomEnvironment(gl);
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  materials.Frame.envMapIntensity = 0.1;

  materials.Frame.envMap = pmremGenerator.fromScene(environment).texture;
  materials.Metal.envMapIntensity = 0.1;

  materials.Metal.envMap = pmremGenerator.fromScene(environment).texture;

  materials.Pano.envMapIntensity = 0.1;

  materials.Pano.envMap = pmremGenerator.fromScene(environment).texture;

  useImperativeHandle(
    animationRef,
    () => {
      return {
        play() {
          actions?.panelAction.setLoop(THREE.LoopOnce, 1);
          actions.panelAction.clampWhenFinished = true;
          actions?.panelAction.play();
        },
      };
    },
    [actions?.panelAction],
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="frame"
          castShadow
          receiveShadow
          geometry={nodes.frame.geometry}
          material={materials.Frame}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ customName: MODELS.DOOR }}
        />
        <mesh
          name="hole"
          // castShadow
          // receiveShadow
          geometry={nodes.hole.geometry}
          material={materials.Metal}
          position={[-0.916, 0, 0.117]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          userData={{ customName: MODELS.DOOR }}
        />
        <mesh
          name="hinge"
          // castShadow
          // receiveShadow
          geometry={nodes.hinge.geometry}
          material={materials.Metal}
          position={[-0.916, 0, 0.117]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          userData={{ customName: MODELS.DOOR }}
        />
        <mesh
          name="panel"
          castShadow
          // receiveShadow
          geometry={nodes.panel.geometry}
          material={materials.Pano}
          position={[-0.093, 0.983, 0.111]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ customName: MODELS.DOOR }}
        >
          <mesh
            name="handle"
            // castShadow
            // receiveShadow
            geometry={nodes.handle.geometry}
            material={materials.Metal}
            position={[-0.715, -0.024, -0.05]}
            rotation={[0, 0, -Math.PI]}
            userData={{ customName: MODELS.DOOR }}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/door-v5.glb");

export default Door;

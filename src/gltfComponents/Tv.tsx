import { useGLTF, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../store/useGame";
import { TV_STATE } from "../const";
import { MODELS } from "../const";

// TODO
// 修复视频材质没有正好填满屏幕的问题
function Tv(props) {
  const videoTexture = useVideoTexture("./dogs.mp4");

  const { tvState } = useGame();

  const { nodes, materials } = useGLTF("./tv-v3.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.57, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.led_tv_phong1_0.geometry}
          material={materials.phong1}
          userData={{ customName: MODELS.TV }}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.screen.geometry}
          material={
            tvState === TV_STATE.OPENED
              ? new THREE.MeshBasicMaterial({
                  map: videoTexture,
                  toneMapped: false,
                })
              : materials.phong1
          }
          userData={{ customName: MODELS.TV }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/tv-v3.glb");

export default Tv;

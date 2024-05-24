import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import PuzzlePaper from "./PuzzlePaper";
import { useGame } from "../store/useGame";
import { MODELS } from "../const";

function Cabinet({ onClickPuzzlePaper, ...props }) {
  const { tools } = useGame();

  const group = useRef();
  const { nodes, materials } = useGLTF("/cabinet_a-v1.glb");
  const { gl } = useThree();
  const environment = new RoomEnvironment(gl);
  const pmremGenerator = new THREE.PMREMGenerator(gl);

  materials.Drawer.envMapIntensity = 0.2;
  materials.Drawer.envMap = pmremGenerator.fromScene(environment).texture;

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <group name="fbx_mergefbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="CabinetA_Frame"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="CabinetA_Frame_Drawer_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.CabinetA_Frame_Drawer_0.geometry}
                    material={materials.Drawer}
                  />
                </group>
                <group
                  name="CabinetA_DrawerLower"
                  position={[-0.001, 33.214, 0.133]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="CabinetA_DrawerLower_Drawer_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.CabinetA_DrawerLower_Drawer_0.geometry}
                    material={materials.Drawer}
                  />
                </group>
                <group
                  name="CabinetA_DrawerMiddle"
                  position={[0, 59.432, 0.05]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="CabinetA_DrawerMiddle_Drawer_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.CabinetA_DrawerMiddle_Drawer_0.geometry}
                    material={materials.Drawer}
                  />
                </group>
                <group
                  name="CabinetA_DrawerUpper"
                  position={[0, 79.603, 0.05]}
                  // position={[0, 79.603, 40.05]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  {tools.includes(MODELS.PUZZLE_PAPER) ? null : (
                    <PuzzlePaper
                      // position={[-2.44, 0.51, 3.81]}
                      position={[0, 0, -0.07]}
                      scale={0.01}
                      rotation={[Math.PI / 2, 0, 0]}
                      onClick={onClickPuzzlePaper}
                    />
                  )}
                  <mesh
                    name="CabinetA_DrawerUpper_Drawer_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.CabinetA_DrawerUpper_Drawer_0.geometry}
                    material={materials.Drawer}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/cabinet_a-v1.glb");

export default Cabinet;

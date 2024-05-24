import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// TODO
// 1.输入正确密码后，再点击门需展示打开门的动画
// 2.通关后页面样式
function Door(props) {
  const { nodes, materials } = useGLTF("/door.glb");
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
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-479.177, 1034.922, 23.483]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[479.177, 23.483, -1034.922]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.defaultMaterial.geometry}
                material={materials.Frame}
              />
              <group position={[-90.164, -121.53, 140.417]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.defaultMaterial_1.geometry}
                  material={materials.Metal}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.defaultMaterial_2.geometry}
                  material={materials.Metal}
                />
                <group position={[-62.169, 24.544, 859.583]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.defaultMaterial_3.geometry}
                    material={materials.Pano}
                  />
                  <group position={[-686.903, 0, -50]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.defaultMaterial_4.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.defaultMaterial_5.geometry}
                      material={materials.Metal}
                    />
                  </group>
                  <group position={[-744.586, 2.574, -50.001]}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.defaultMaterial_6.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes.defaultMaterial_7.geometry}
                      material={materials.Metal}
                      position={[-0.826, -0.037, -0.162]}
                      scale={[1.171, 0.859, 1.002]}
                    />
                  </group>
                </group>
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.defaultMaterial_8.geometry}
                material={materials.Metal}
                position={[-934.259, -119.313, 0.034]}
                rotation={[0, 0, -Math.PI]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/lira_pg_-_soft_touch_white.glb");

export default Door;

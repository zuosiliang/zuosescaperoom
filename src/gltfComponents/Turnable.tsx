import { useGLTF } from "@react-three/drei";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

function Turnable(props) {
  const { nodes, materials } = useGLTF("/turnable-v2.glb");
  const { gl } = useThree();
  const environment = new RoomEnvironment(gl);
  const pmremGenerator = new THREE.PMREMGenerator(gl);

  const modifiedMaterials = useMemo(() => {
    const newMaterials = { ...materials };
    Object.keys(newMaterials).forEach((material) => {
      newMaterials[material].envMapIntensity = 0.2;
      newMaterials[material].envMap =
        pmremGenerator.fromScene(environment).texture;
    });
    return newMaterials;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group {...props} dispose={null}>
      <group rotation={[-1.576, 0, 0]} scale={0.796}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={modifiedMaterials["1004"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial001.geometry}
            material={modifiedMaterials["1014"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial002.geometry}
            material={modifiedMaterials["1012"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial003.geometry}
            material={modifiedMaterials["1013"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial004.geometry}
            material={modifiedMaterials["1002"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial006.geometry}
            material={modifiedMaterials["1003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial007.geometry}
            material={modifiedMaterials["1006"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial008.geometry}
            material={modifiedMaterials["1001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial009.geometry}
            material={modifiedMaterials["1017"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial010.geometry}
            material={modifiedMaterials["1005"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial011.geometry}
            material={modifiedMaterials["1015"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial012.geometry}
            material={modifiedMaterials["1011"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/turnable-v2.glb");

export default Turnable;

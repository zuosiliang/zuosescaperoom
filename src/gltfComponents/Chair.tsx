import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MODELS } from "../const";

function Chair(props) {
  const { gl } = useThree();
  const environment = new RoomEnvironment(gl);
  const pmremGenerator = new THREE.PMREMGenerator(gl);

  const { nodes, materials } = useGLTF("/chair-v3.glb");
  materials.dcm_steel.envMapIntensity = 0.6;
  materials.dcm_rubber.envMapIntensity = 0.3;
  materials.dcm_wood.envMapIntensity = 0.3;

  materials.dcm_steel.envMap = pmremGenerator.fromScene(environment).texture;
  materials.dcm_rubber.envMap = pmremGenerator.fromScene(environment).texture;
  materials.dcm_wood.envMap = pmremGenerator.fromScene(environment).texture;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.dcm_steel}
        userData={{ customName: MODELS.CHAIR }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.dcm_rubber}
        userData={{ customName: MODELS.CHAIR }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.dcm_wood}
        userData={{ customName: MODELS.CHAIR }}
      />
    </group>
  );
}

useGLTF.preload("/chair-v3.glb");

export default Chair;

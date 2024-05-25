import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MODELS } from "../const";

function Bookshelf(props) {
  const { nodes, materials } = useGLTF("/bookshelf-v2.glb");
  const { gl } = useThree();
  const environment = new RoomEnvironment(gl);
  const pmremGenerator = new THREE.PMREMGenerator(gl);
  materials.phong1SG1.envMapIntensity = 0.1;

  materials.phong1SG1.envMap = pmremGenerator.fromScene(environment).texture;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Book_Shelf_phong1SG1_0.geometry}
        material={materials.phong1SG1}
        scale={0.01}
        userData={{ customName: MODELS.BOOKSHELF }}
      />
    </group>
  );
}

useGLTF.preload("/bookshelf-v2.glb");

export default Bookshelf;

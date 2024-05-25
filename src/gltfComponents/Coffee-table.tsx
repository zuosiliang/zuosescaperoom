import { useGLTF } from "@react-three/drei";
import { MODELS } from "../const";

function CoffeeTable(props) {
  const { nodes, materials } = useGLTF("/coffee-table-v3.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_Coffe_Table_01_LP_M_Grid_0.geometry}
        material={materials.M_Grid}
        rotation={[-Math.PI / 2, 0, 2.356]}
        scale={[0.507, 0.507, 0.843]}
        userData={{ customName: MODELS.COFFEE_TABLE }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_Coffe_Table_01_LP_M_Side_Table_0.geometry}
        material={materials.M_Side_Table}
        rotation={[-Math.PI / 2, 0, 2.356]}
        scale={[0.507, 0.507, 0.843]}
        userData={{ customName: MODELS.COFFEE_TABLE }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_Coffe_Table_01_LP_M_Slider_0.geometry}
        material={materials.M_Slider}
        rotation={[-Math.PI / 2, 0, 2.356]}
        scale={[0.507, 0.507, 0.843]}
        userData={{ customName: MODELS.COFFEE_TABLE }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SM_Coffe_Table_01_LP_M_Vienna_Straw_0.geometry}
        material={materials.M_Vienna_Straw}
        rotation={[-Math.PI / 2, 0, 2.356]}
        scale={[0.507, 0.507, 0.843]}
        userData={{ customName: MODELS.COFFEE_TABLE }}
      />
    </group>
  );
}

useGLTF.preload("/coffee-table-v3.glb");

export default CoffeeTable;

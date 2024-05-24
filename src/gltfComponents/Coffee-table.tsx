import { useGLTF } from "@react-three/drei";

function CoffeeTable(props) {
  const { nodes, materials } = useGLTF("/coffee-table.glb");

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.429}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            rotation={[-Math.PI / 2, 0, 2.356]}
            scale={[35.496, 35.496, 59.008]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SM_Coffe_Table_01_LP_M_Grid_0.geometry}
              material={materials.M_Grid}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SM_Coffe_Table_01_LP_M_Side_Table_0.geometry}
              material={materials.M_Side_Table}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SM_Coffe_Table_01_LP_M_Slider_0.geometry}
              material={materials.M_Slider}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SM_Coffe_Table_01_LP_M_Vienna_Straw_0.geometry}
              material={materials.M_Vienna_Straw}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/coffee-table.glb");

export default CoffeeTable;

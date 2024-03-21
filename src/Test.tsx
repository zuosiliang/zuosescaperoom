import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useCursor, useGLTF, OrbitControls } from "@react-three/drei";
import { useState } from "react";

function Test() {
  const model = useGLTF("./kallax-bookshelf.glb");
  const [hovered, set] = useState(false);
  useCursor(hovered);

  const { position } = useControls({
    position: {
      value: { x: -2, y: 0, z: 0 },
      step: 0.01,
    },
  });
  return (
    <Canvas style={{ width: "800px", height: "600px" }}>
      <OrbitControls makeDefault />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <primitive
        position={[position.x, position.y, position.z]}
        object={model.scene}
        scale={0.35}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
      />
      ;
    </Canvas>
  );
}

export default Test;

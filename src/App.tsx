import Test from "./Test";
import Interface from "./Interface";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0 }}
    >
      <Canvas style={{ background: "black" }}>
        <Test />
      </Canvas>
      <Interface />
    </div>
  );
}

export default App;

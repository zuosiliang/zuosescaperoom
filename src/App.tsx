import Game from "./Game";
import Interface from "./uiComponents/Interface";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Perf } from "r3f-perf";

//TODO
// 支持resize
function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0 }}
    >
      <Canvas style={{ background: "black" }} shadows>
        <Game />
        <Perf position="top-left" />
      </Canvas>
      <Interface />
      <Leva collapsed />
    </div>
  );
}

export default App;

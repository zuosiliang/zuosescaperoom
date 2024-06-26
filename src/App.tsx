import Game from "./Game";
import Interface from "./uiComponents/Interface";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
// import { Perf } from "r3f-perf";
import { Suspense } from "react";
import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { loaded } = useProgress();
  const percent = Math.floor((loaded / 112) * 100);

  return (
    <Html center>
      <div className="w-[800px] h-[600px] bg-black justify-center content-center">
        <div className="text-amber-50 cursor-pointer text-6xl text-center">
          {percent === 100 ? null : `${percent} % 加载中`}
        </div>
      </div>
    </Html>
  );
}
//TODO
// 1.支持resize
// 2.优化首屏白屏
function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0 }}
    >
      <Interface />
      <Canvas style={{ background: "black" }} shadows>
        <Suspense fallback={<Loader />}>
          <Game />
          {/* <Perf position="top-left" /> */}
        </Suspense>
      </Canvas>
      <Leva collapsed hidden />
    </div>
  );
}

export default App;

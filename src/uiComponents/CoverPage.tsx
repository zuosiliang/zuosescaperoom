import { gsap } from "gsap";
import { useGame } from "../store/useGame";

const CoverPage = () => {
  const { gameStarted, setGameStarted, showDialog } = useGame();
  const handleClick = () => {
    setGameStarted(true);
    gsap.to(".banner", {
      duration: 3,
      x: -10000,
      stagger: 0.1,
      ease: "none",
      onComplete: () => {
        showDialog("这是什么地方，我怎么莫名其妙出现在了这里，想办法逃出去吧");
      },
    });
  };

  return (
    <div className="fixed z-10">
      <div className="banner bg-black w-screen h-1/4 fixed top-0" />
      <div className="banner bg-black w-screen h-1/4 fixed top-1/4" />
      <div className="banner bg-black w-screen h-1/4 fixed top-2/4" />
      <div className="banner bg-black w-screen h-1/4 fixed top-3/4" />
      {gameStarted ? null : (
        <div
          onClick={handleClick}
          className="text-amber-50 fixed top-1/2 left-1/2 cursor-pointer text-6xl"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          开始游戏
        </div>
      )}
    </div>
  );
};

export default CoverPage;

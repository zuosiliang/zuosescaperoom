import { useGame } from "../store/useGame";
import ControlBar from "./ControlBar";
import Dialog from "./Dialog";
import BagSelect from "./BagSelect";
import CoverPage from "./CoverPage";

// DONE
// 找个好看点的道具图标
const Interface = () => {
  const { text, isBagOpened } = useGame();
  const isDialogOpened = !!text;

  return (
    <>
      <CoverPage />
      {isDialogOpened ? (
        <div className="absolute bottom-0 left-0 top-0 right-0 flex items-center justify-center z-20">
          <Dialog />
        </div>
      ) : null}
      {isBagOpened ? (
        <div className="absolute bottom-0 left-0 top-0 right-0 flex items-center justify-center backdrop-blur-sm z-20">
          <BagSelect />
        </div>
      ) : null}
      {!isBagOpened && !isDialogOpened ? <ControlBar /> : null}
    </>
  );
};

export default Interface;

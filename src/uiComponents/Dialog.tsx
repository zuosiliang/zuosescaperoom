import { useGame } from "../store/useGame";
import {
  MODELS,
  COUCH_STATE,
  BOOKSHELF_STATE,
  CABINET_STATE,
  TV_STATE,
  LOCK_STATE,
} from "../const";

const DialogButton = ({ text, onClick }) => {
  return (
    <div
      className="w-[100px] h-[30px] cursor-pointer text-center"
      onClick={onClick}
      style={{ background: "rgba(255, 255, 255, 0.3)" }}
    >
      {text}
    </div>
  );
};

const Dialog = () => {
  const {
    text,
    closeDialog,
    restoreFreePlayCallback,
    isModelClose,
    inEventModel,
    nextOperationCallback,
    couchState,
    bookshelfState,
    cabinetState,
    tvState,
    openBag,
    lockState,
  } = useGame();

  const handleCloseDialog = () => {
    closeDialog();
    restoreFreePlayCallback();
  };

  const handleNextOperation = () => {
    closeDialog();
    nextOperationCallback?.();
  };

  const handleUseTool = () => {
    closeDialog();
    openBag();
  };

  const doesModelHaveOperation =
    (inEventModel === MODELS.COUCH &&
      couchState === COUCH_STATE.FIRST_GLANCE) ||
    (inEventModel === MODELS.BOOKSHELF &&
      bookshelfState === BOOKSHELF_STATE.FIRST_GLANCE) ||
    (inEventModel === MODELS.CABINET &&
      cabinetState === CABINET_STATE.FIRST_GLANCE) ||
    (inEventModel === MODELS.LOCK && lockState === LOCK_STATE.LOCKED);
  const canModelUseTool =
    inEventModel === MODELS.TV && tvState === TV_STATE.TV_CONTROL_PICKED_UP;

  return (
    <div className="fixed bottom-0 h-[250px] flex flex-col">
      <div className="text-white font-black text-2xl">{text}</div>
      <div className="flex justify-end">
        <DialogButton onClick={handleCloseDialog} text="返回" />
        {canModelUseTool && isModelClose ? (
          <DialogButton onClick={handleUseTool} text="使用道具" />
        ) : null}
        {isModelClose && doesModelHaveOperation ? (
          <DialogButton onClick={handleNextOperation} text="下一步" />
        ) : null}
      </div>
    </div>
  );
};

export default Dialog;

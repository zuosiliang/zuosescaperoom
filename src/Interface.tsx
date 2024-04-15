import { useInterface } from "./store/useInterface";
import ControlBar from "./ControlBar";
import Mask from "./Mask";

const Interface = () => {
  const { text, isBagOpened } = useInterface();
  const isDialogOpened = !!text;

  return isDialogOpened || isBagOpened ? <Mask /> : <ControlBar />;
};

export default Interface;

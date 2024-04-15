import Dialog from "./Dialog";
import BagSelect from "./BagSelect";
import { useInterface } from "./store/useInterface";

const Mask = () => {
  const { text, isBagOpened } = useInterface();
  const isDialogOpened = !!text;

  return (
    <div className="text-green-400 absolute bottom-0 left-0 top-0 right-0 flex items-center justify-center	">
      {isBagOpened ? <BagSelect /> : null}
      {isDialogOpened ? <Dialog /> : null}
    </div>
  );
};

export default Mask;

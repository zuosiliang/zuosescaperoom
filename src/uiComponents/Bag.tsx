import { useGame } from "../store/useGame";
import ToolsIcon from "@rsuite/icons/Tools";

const Bag = () => {
  const openBag = useGame((state) => state.openBag);

  return (
    <div
      className="fixed bottom-[36px] right-[36px] cursor-pointer"
      onClick={openBag}
    >
      <ToolsIcon className="text-white w-[36px] h-[36px]" />
    </div>
  );
};

export default Bag;

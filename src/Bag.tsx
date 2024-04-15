import { useInterface } from "./store/useInterface";

const Bag = () => {
  const openBag = useInterface((state) => state.openBag);

  return (
    <div
      className="fixed w-[50px] h-[50px] bottom-0 bg-neutral-50 right-0 cursor-pointer"
      onClick={openBag}
    >
      Bag
    </div>
  );
};

export default Bag;

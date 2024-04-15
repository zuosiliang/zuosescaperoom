import { useInterface } from "./store/useInterface";

const BagSelect = () => {
  const { closeBag, tools } = useInterface();
  return (
    <div className="w-[800px] h-[500px] bg-neutral-50 right-0">
      {tools.map((tool) => (
        <div className="w-[40px] h-[40px] bg-rose-600">{tool}</div>
      ))}
      <div className="w-[200px] h-[100px] cursor-pointer" onClick={closeBag}>
        ❌
      </div>
    </div>
  );
};

export default BagSelect;

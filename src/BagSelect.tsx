import { useInterface } from "./store/useInterface";
import { TOOLS_IMG, Model } from "./const";
import { useState } from "react";

const BagSelect = () => {
  const { closeBag, tools } = useInterface();
  const [selectedTool, setSelectedTool] = useState<Model | null>(null);

  return (
    <div className="w-[800px] h-[500px] bg-neutral-50">
      {tools.map((tool) => (
        <div
          key={tool}
          className="w-[40px] h-[40px] bg-rose-600 cursor-pointer"
          onClick={() => {
            setSelectedTool(tool);
          }}
        >
          {tool}
        </div>
      ))}
      {selectedTool ? (
        <div className="w-800px h-[400px] bg-neutral-50">
          <img
            src={`./${TOOLS_IMG.PAPER}.jpg`}
            alt="Girl in a jacket"
            width="500"
            height="600"
          />
        </div>
      ) : null}

      <div className="w-[200px] h-[100px] cursor-pointer" onClick={closeBag}>
        ❌
      </div>
    </div>
  );
};

export default BagSelect;

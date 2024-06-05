import { useGame } from "../store/useGame";
import { Model, MODEL_NAME_MAP, MODEL_TOOL_MAP, TOOL_PIC_MAP } from "../const";
import { useState } from "react";

const BagButton = ({ text, onClick }) => {
  return (
    <div
      className="w-[100px] h-[60px] cursor-pointer text-center my-[20px] font-bold text-5xl"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

const BagSelect = () => {
  const {
    closeBag,
    tools,
    restoreFreePlayCallback,
    inEventModel,
    updateTools,
    toolCallback,
  } = useGame();
  const [selectedTool, setSelectedTool] = useState<Model | null>(null);

  const handleCloseBag = () => {
    setSelectedTool(null);
    closeBag();
  };

  const handleUseTool = () => {
    if (selectedTool === MODEL_TOOL_MAP[inEventModel]) {
      updateTools(tools.filter((tool) => tool !== selectedTool));
      closeBag();
      toolCallback();
      restoreFreePlayCallback();
    }
  };

  return (
    <div
      className="w-full h-full flex relative"
      // style={{ background: "rgba(255, 255, 255, 0.3)" }}
    >
      <div className="flex flex-col justify-between">
        <div className="pt-[24px] pl-[24px] font-bold text-7xl">TOOLS</div>

        <div className="flex flex-col grow items-center ml-[24px]">
          <div className="flex w-[400px] grow flex-col items-center pt-[20px] font-bold">
            {tools.map((tool) => (
              <div
                key={tool}
                className="w-[360px] cursor-pointer pl-[12px] mb-[12px]"
                onClick={() => {
                  setSelectedTool(tool);
                }}
              >
                <span className="text-4xl">{MODEL_NAME_MAP[tool]}</span>
                {selectedTool === tool ? (
                  <hr className="border-[#213547] border-2" />
                ) : (
                  <div className="h-[4px]" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-around w-full">
            <BagButton onClick={handleCloseBag} text="返回" />
            {inEventModel ? (
              <BagButton onClick={handleUseTool} text="使用" />
            ) : null}
          </div>
        </div>
      </div>

      {/**
       * TODO
       * 当选中道具后，右边应该显示一个3D viewer，而不是静态图片
       *
       */}
      {selectedTool ? (
        <div className="flex justify-center grow py-[100px]">
          <img src={`./${TOOL_PIC_MAP[selectedTool]}`} />
        </div>
      ) : null}
    </div>
  );
};

export default BagSelect;

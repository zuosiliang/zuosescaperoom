import { useInterface } from "./store/useInterface";

const Dialog = () => {
  const text = useInterface((state) => state.text);
  const closeDialog = useInterface((state) => state.closeDialog);
  return (
    <div className="fixed bottom-0 w-screen	h-[250px] border-solid border-2 border-indigo-600 bg-neutral-50	">
      <div>{text}</div>
      <div className="w-[200px] h-[100px] cursor-pointer" onClick={closeDialog}>
        ❌
      </div>
    </div>
  );
};

export default Dialog;

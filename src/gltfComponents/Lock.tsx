import { useGLTF } from "@react-three/drei";
import { useState, useRef } from "react";
import { CORRECT_PASSWORD, LOCK_STATE, MODELS, DOOR_STATE } from "../const";
import { useGame } from "../store/useGame";

// TODO
// 1.鼠标点击时应该有音效 optional
//
// DONE
// 1.按钮点击后应该要有位移动画
// 2.鼠标hover在按钮上时应该有手势光标
// 3. 模型旁边显示提示文案，提示按#号结束
// 4.输入#号时，按钮未显示动画

function Lock(props) {
  const { nodes, materials } = useGLTF("/lock.glb");
  const { setLockState, showDialog, inEventModel, setDoorState } = useGame();
  const [password, setPassword] = useState([]);

  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const refHash = useRef(null);
  const refAsterisk = useRef(null);

  const charRefMap = {
    "0": ref0,
    "1": ref1,
    "2": ref2,
    "3": ref3,
    "4": ref4,
    "5": ref5,
    "6": ref6,
    "7": ref7,
    "8": ref8,
    "9": ref9,
    "#": refHash,
    "*": refAsterisk,
  };

  const createHandleClick = (char) => () => {
    const clickAnimation = (char) => {
      charRefMap[char].current.translateY(0.2);
      setTimeout(() => {
        charRefMap[char].current.translateY(-0.2);
      }, 50);
    };

    if (inEventModel === MODELS.LOCK) {
      clickAnimation(char);
      setPassword((oldPassword) => [...oldPassword, char]);
    }
  };

  const handleClickZero = createHandleClick(0);
  const handleClickOne = createHandleClick(1);
  const handleClickTwo = createHandleClick(2);
  const handleClickThree = createHandleClick(3);
  const handleClickFour = createHandleClick(4);
  const handleClickFive = createHandleClick(5);
  const handleClickSix = createHandleClick(6);
  const handleClickSeven = createHandleClick(7);
  const handleClickEight = createHandleClick(8);
  const handleClickNine = createHandleClick(9);
  const handleClickStar = createHandleClick("*");

  const handleClickHash = () => {
    createHandleClick("#")();

    if (password.toString() === CORRECT_PASSWORD.toString()) {
      setLockState(LOCK_STATE.UNLOCKED);
      showDialog();
      setDoorState(DOOR_STATE.UNLOCKED);
      return;
    }
    showDialog("密码不对啊");
    setPassword([]);
  };

  return (
    <group {...props} dispose={null}>
      <group scale={0.025}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            ref={refHash}
            castShadow
            receiveShadow
            geometry={nodes["#"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickHash}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={refAsterisk}
            castShadow
            receiveShadow
            geometry={nodes["*"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickStar}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref0}
            castShadow
            receiveShadow
            geometry={nodes["0"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickZero}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref1}
            castShadow
            receiveShadow
            geometry={nodes["1"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickOne}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref2}
            castShadow
            receiveShadow
            geometry={nodes["2"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickTwo}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref3}
            castShadow
            receiveShadow
            geometry={nodes["3"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickThree}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref4}
            castShadow
            receiveShadow
            geometry={nodes["4"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickFour}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref5}
            castShadow
            receiveShadow
            geometry={nodes["5"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickFive}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref6}
            castShadow
            receiveShadow
            geometry={nodes["6"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickSix}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref7}
            castShadow
            receiveShadow
            geometry={nodes["7"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickSeven}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref8}
            castShadow
            receiveShadow
            geometry={nodes["8"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickEight}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={ref9}
            castShadow
            receiveShadow
            geometry={nodes["9"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickNine}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.KeypadDoorLock_KeypadDoorLock_0.geometry}
            material={materials.KeypadDoorLock}
            userData={{ customName: MODELS.LOCK }}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/lock.glb");

export default Lock;

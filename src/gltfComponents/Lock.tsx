import { useGLTF } from "@react-three/drei";
import { useState, useRef } from "react";
import { CORRECT_PASSWORD, LOCK_STATE, MODELS, DOOR_STATE } from "../const";
import { useGame } from "../store/useGame";

// TODO
// 1.按钮点击后应该要有位移动画
// 2.鼠标hover在按钮上时应该有手势光标
// 3.鼠标点击时应该有音效 optional
// 4.按#号后应该根据密码是否正确显示绿光红光 optional
// 5.模型旁边显示提示文案，提示按#号结束
function Lock(props) {
  const { nodes, materials } = useGLTF("/lock.glb");
  const { setLockState, showDialog, inEventModel, setDoorState } = useGame();
  const [password, setPassword] = useState([]);

  const numRef = useRef(null);

  const handleClickHash = () => {
    if (password.toString() === CORRECT_PASSWORD.toString()) {
      setLockState(LOCK_STATE.UNLOCKED);
      showDialog();
      setDoorState(DOOR_STATE.UNLOCKED);
      return;
    }

    showDialog("密码不对啊");
  };

  const createHandleClick = (char) => () => {
    if (inEventModel === MODELS.LOCK) {
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

  return (
    <group {...props} dispose={null}>
      <group scale={0.025}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["#"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickHash}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["*"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickStar}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            ref={numRef}
            castShadow
            receiveShadow
            geometry={nodes["0"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickZero}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["1"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickOne}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["2"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickTwo}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["3"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickThree}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["4"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickFour}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["5"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickFive}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["6"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickSix}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["7"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickSeven}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["8"].geometry}
            material={materials.KeypadDoorLock}
            onClick={handleClickEight}
            userData={{ customName: MODELS.LOCK }}
          />
          <mesh
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

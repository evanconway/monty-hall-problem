import { ReactNode } from "react";
import {
  selectGameStep,
  GAME_STEPS,
  hostRevealDoor,
  reveal,
} from "../../state/gameSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Door from "./Door";

const Game = () => {
  const dispatch = useAppDispatch();

  const gameStep = useAppSelector(selectGameStep);

  let stepElements: ReactNode = null;

  let msg = "";
  if (gameStep === GAME_STEPS.CONTESTANT_CHOOSE) msg = "Choose a door...";
  if (gameStep === GAME_STEPS.HOST_REVEAL) {
    msg = "The host will reveal a non-prize door.";
    stepElements = (
      <button onClick={() => dispatch(hostRevealDoor())}>Show Me</button>
    );
  }
  if (gameStep === GAME_STEPS.CONTESTANT_SWITCH)
    msg = "Stay with your original choice? Or choose the other door?";
  if (gameStep === GAME_STEPS.DRAMATIC_REVEAL) {
    msg = "Did you make the right choice?";
    stepElements = (
      <button onClick={() => dispatch(reveal())}>Show me the prize!</button>
    );
  }
  if (gameStep === GAME_STEPS.DONE) msg = "The game is over.";
  return (
    <div>
      <div>
        <p>{msg}</p>
        {stepElements}
      </div>
      <div style={{ display: "flex" }}>
        <Door doorNumber={1} />
        <Door doorNumber={2} />
        <Door doorNumber={3} />
      </div>
    </div>
  );
};

export default Game;

import { ReactNode } from "react";
import {
  selectGameStep,
  GAME_STEPS,
  hostRevealDoor,
  reveal,
  newGame,
  selectContestantDoorSelected,
  selectPrizeDoor,
} from "../../state/gameSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Door from "./Door";

const Game = () => {
  const dispatch = useAppDispatch();

  const gameStep = useAppSelector(selectGameStep);
  const contestantDoorSelect = useAppSelector(selectContestantDoorSelected);
  const prizeDoor = useAppSelector(selectPrizeDoor);

  let stepElements: ReactNode = null;

  let msg = "";
  if (gameStep === GAME_STEPS.CONTESTANT_CHOOSE) msg = "Choose a door...";
  if (gameStep === GAME_STEPS.HOST_REVEAL) {
    msg = "The host will reveal a non-prize door.";
    stepElements = (
      <button onClick={() => dispatch(hostRevealDoor())}>
        Reveal The Door
      </button>
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
  if (gameStep === GAME_STEPS.DONE) {
    msg = `The game is over. ${prizeDoor === contestantDoorSelect ? "You won!" : "You lost."}`;
    stepElements = (
      <button onClick={() => dispatch(newGame())}>Play Again?</button>
    );
  }
  return (
    <div>
      <div style={{ minHeight: "100px" }}>
        <p>{msg}</p>
        {stepElements}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Door doorNumber={1} />
        <Door doorNumber={2} />
        <Door doorNumber={3} />
      </div>
    </div>
  );
};

export default Game;

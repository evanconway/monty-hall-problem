import { ReactNode, useState } from "react";
import { GAME_STEPS } from "../../state/gameSlice";
import Door from "./Door";
import {
  DOOR_OPTIONS,
  montyHallGetContestantDoorChoice,
  montyHallGetInit,
  montyHallHostRevealDoor,
  montyHallReveal,
} from "../../montyHall";

const Game = () => {
  const [montyHall, setMontyHall] = useState(montyHallGetInit());
  const { step, prizeDoor } = montyHall;
  const contestantDoorSelected = montyHallGetContestantDoorChoice(montyHall);
  let stepElements: ReactNode = null;
  let msg = "";
  if (step === GAME_STEPS.CONTESTANT_CHOOSE) msg = "Choose a door...";
  if (step === GAME_STEPS.HOST_REVEAL) {
    msg = "The host will reveal a non-prize door.";
    stepElements = (
      <button onClick={() => setMontyHall(montyHallHostRevealDoor(montyHall))}>
        Reveal The Door
      </button>
    );
  }
  if (step === GAME_STEPS.CONTESTANT_SWITCH)
    msg = "Stay with your original choice? Or choose the other door?";
  if (step === GAME_STEPS.DRAMATIC_REVEAL) {
    msg = "Did you make the right choice?";
    stepElements = (
      <button onClick={() => setMontyHall(montyHallReveal(montyHall))}>
        Show me the prize!
      </button>
    );
  }
  if (step === GAME_STEPS.DONE) {
    msg = `The game is over. ${prizeDoor === contestantDoorSelected ? "You won!" : "You lost."}`;
    stepElements = (
      <button onClick={() => setMontyHall(montyHallGetInit())}>
        Play Again?
      </button>
    );
  }
  return (
    <div>
      <div style={{ minHeight: "60px" }}>
        <p>{msg}</p>
        {stepElements}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {DOOR_OPTIONS.map((o) => (
          <Door
            montyHall={montyHall}
            setMontyHall={setMontyHall}
            doorNumber={o}
            key={o}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;

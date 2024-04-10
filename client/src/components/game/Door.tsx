import {
  GAME_STEPS,
  PrizeDoor,
  contestantChooseDoor,
  contestantDecideSwitch,
  selectContestantDoorSelected,
  selectGameStep,
  selectHostDoorRevealed,
  selectPrizeDoor,
} from "../../state/gameSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

interface DoorProps {
  doorNumber: PrizeDoor;
}

const Door = ({ doorNumber }: DoorProps) => {
  const dispatch = useAppDispatch();

  const prizeDoor = useAppSelector(selectPrizeDoor);
  const gameStep = useAppSelector(selectGameStep);
  const contestantSelected = useAppSelector(selectContestantDoorSelected);
  const hostRevealed = useAppSelector(selectHostDoorRevealed);
  const selected = doorNumber === contestantSelected;

  const chooseEnabled =
    gameStep === GAME_STEPS.CONTESTANT_CHOOSE ||
    (gameStep === GAME_STEPS.CONTESTANT_SWITCH && doorNumber !== hostRevealed);

  const isRevealed =
    gameStep === GAME_STEPS.DONE || hostRevealed === doorNumber;

  return (
    <div
      style={{
        border: `2px ${selected ? "red" : ""} solid`,
        padding: "2em",
        margin: "2em",
      }}
    >
      <div style={{ fontSize: "4em" }}>{doorNumber}</div>
      <div style={{ fontSize: "5em" }}>
        {isRevealed ? (prizeDoor === doorNumber ? "$" : ".") : "?"}
      </div>
      <button
        disabled={!chooseEnabled}
        onClick={() => {
          if (gameStep === GAME_STEPS.CONTESTANT_CHOOSE) {
            dispatch(contestantChooseDoor(doorNumber));
          }
          if (gameStep === GAME_STEPS.CONTESTANT_SWITCH) {
            dispatch(contestantDecideSwitch(doorNumber !== contestantSelected));
          }
        }}
      >
        choose
      </button>
    </div>
  );
};

export default Door;

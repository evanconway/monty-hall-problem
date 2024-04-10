import {
  GAME_STEPS,
  PrizeDoor,
  contestantChooseDoor,
  contestantDecideSwitch,
  selectContestantDoorSelected,
  selectGameStep,
  selectHostDoorRevealed,
} from "../../state/gameSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

interface DoorProps {
  doorNumber: PrizeDoor;
}

const Door = ({ doorNumber }: DoorProps) => {
  const dispatch = useAppDispatch();

  const gameStep = useAppSelector(selectGameStep);
  const contestantSelected = useAppSelector(selectContestantDoorSelected);
  const hostRevealed = useAppSelector(selectHostDoorRevealed);
  const selected = doorNumber === contestantSelected;

  const enabled =
    gameStep === GAME_STEPS.CONTESTANT_CHOOSE ||
    (gameStep === GAME_STEPS.CONTESTANT_SWITCH && doorNumber !== hostRevealed);

  return (
    <div style={{ border: selected ? "1px red solid" : "", padding: "2em" }}>
      <div style={{ fontSize: "4em" }}>{doorNumber}</div>
      <div style={{ fontSize: "5em" }}>*</div>
      <button
        disabled={!enabled}
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

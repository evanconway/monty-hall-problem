import {
  GAME_STEPS,
  MontyHall,
  PrizeDoor,
  montyHallContestantChooseDoor,
  montyHallContestantSwitch,
  montyHallGetContestantDoorChoice,
} from "../../montyHall";

interface DoorProps {
  montyHall: MontyHall;
  setMontyHall: Function;
  doorNumber: PrizeDoor;
}

const Door = ({ montyHall, setMontyHall, doorNumber }: DoorProps) => {
  const { step, prizeDoor, doorHostRevealed } = montyHall;
  const contestantDoorSelected = montyHallGetContestantDoorChoice(montyHall);
  const selected = doorNumber === contestantDoorSelected;
  const chooseEnabled =
    step === GAME_STEPS.CONTESTANT_CHOOSE ||
    (step === GAME_STEPS.CONTESTANT_SWITCH && doorNumber !== doorHostRevealed);
  const isRevealed =
    step === GAME_STEPS.DONE || doorHostRevealed === doorNumber;

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
          if (step === GAME_STEPS.CONTESTANT_CHOOSE) {
            setMontyHall(montyHallContestantChooseDoor(montyHall, doorNumber));
          }
          if (step === GAME_STEPS.CONTESTANT_SWITCH) {
            setMontyHall(
              montyHallContestantSwitch(
                montyHall,
                doorNumber !== contestantDoorSelected,
              ),
            );
          }
        }}
      >
        choose
      </button>
    </div>
  );
};

export default Door;

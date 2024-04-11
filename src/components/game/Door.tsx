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
    <div>
      <div style={{ height: "20px" }}>
        {selected ? `chose ${doorNumber}` : ""}
      </div>
      <div
        style={{
          border: `2px ${selected ? "red" : ""} solid`,
          width: "90px",
          height: "200px",
          display: "flex",
          paddingBottom: "1em",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "4em" }}>{doorNumber}</div>
        {isRevealed ? (
          <div>{prizeDoor === doorNumber ? "The Prize!" : "(empty)"}</div>
        ) : (
          <div style={{ fontSize: "5em" }}>?</div>
        )}
        <button
          disabled={!chooseEnabled}
          onClick={() => {
            if (step === GAME_STEPS.CONTESTANT_CHOOSE) {
              setMontyHall(
                montyHallContestantChooseDoor(montyHall, doorNumber),
              );
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
    </div>
  );
};

export default Door;

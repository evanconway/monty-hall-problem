import { PrizeDoor, contestantChooseDoor, reveal } from "./state/gameSlice";

type GameStep = 0 | 1 | 2 | 3 | 4;

export const GAME_STEPS = {
  CONTESTANT_CHOOSE: 0 as GameStep,
  HOST_REVEAL: 1 as GameStep, // host hasn't revealed yet
  CONTESTANT_SWITCH: 2 as GameStep, // contestant is going to choose to switch
  DRAMATIC_REVEAL: 3 as GameStep,
  DONE: 4 as GameStep,
};

/*
  Infer what step we're on (contestant choosing door, host revelaing door...) by null values of
  values in game state.
  */
interface MontyHall {
  step: GameStep;
  prizeDoor: PrizeDoor;
  contestantDoorSelected: PrizeDoor | null;
  doorHostRevealed: PrizeDoor | null;
  contestantSwitch: boolean | null;
  reveal: boolean;
}

const doorOptions = [1, 2, 3] as PrizeDoor[];

const montyHallGetInit = () =>
  ({
    step: 0,
    prizeDoor: 1,
    contestantDoorSelected: null,
    doorHostRevealed: null,
    contestantSwitch: null,
    reveal: false,
  }) as MontyHall;

const montyHallContestantChooseDoor = (
  mh: MontyHall,
  contestantDoorSelected: PrizeDoor,
) => {
  if (mh.step !== GAME_STEPS.CONTESTANT_CHOOSE)
    throw new Error(
      "MontyHall must be at step 0 for contestant to choose door",
    );
  return { ...mh, step: mh.step + 1, contestantDoorSelected } as MontyHall;
};

const montyHallHostRevealDoor = (mh: MontyHall) => {
  if (mh.step !== GAME_STEPS.HOST_REVEAL)
    throw new Error("MontyHall must be at step 1 for host to reveal door");
  const options = doorOptions.filter(
    (o) => o != mh.contestantDoorSelected && o != mh.prizeDoor,
  );
  const doorHostRevealed = options[Math.floor(Math.random() * options.length)];
  return {
    ...mh,
    step: mh.step + 1,
    doorHostRevealed,
  } as MontyHall;
};

const montyHallContestantSwitch = (
  mh: MontyHall,
  contestantSwitch: boolean,
) => {
  if (mh.step !== GAME_STEPS.CONTESTANT_SWITCH)
    throw new Error(
      "MontyHall must be at step 2 for contestant to choose staying or switching",
    );
  return { ...mh, step: mh.step + 1, contestantSwitch };
};

const montyHallReveal = (mh: MontyHall) => {
  if (mh.step !== GAME_STEPS.DRAMATIC_REVEAL)
    throw new Error("MontyHall must be at step 3 to reveal outcome");
  return { ...mh, step: mh.step + 1, reveal: true };
};

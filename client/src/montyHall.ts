export type PrizeDoor = 1 | 2 | 3;

export const getRandomPrizeDoor = () => {
  return (Math.floor(Math.random() * 3) + 1) as PrizeDoor;
};

type GameStep = 0 | 1 | 2 | 3 | 4;

interface GameSteps {
  readonly CONTESTANT_CHOOSE: GameStep;
  readonly HOST_REVEAL: GameStep; // host hasn't revealed yet
  readonly CONTESTANT_SWITCH: GameStep; // contestant is going to choose to switch
  readonly DRAMATIC_REVEAL: GameStep;
  readonly DONE: GameStep;
}

export const GAME_STEPS: GameSteps = {
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
export interface MontyHall {
  step: GameStep;
  prizeDoor: PrizeDoor;
  contestantDoorSelected: PrizeDoor | null;
  doorHostRevealed: PrizeDoor | null;
  contestantSwitch: boolean | null;
  reveal: boolean;
}

export const DOOR_OPTIONS = [1, 2, 3] as PrizeDoor[];

export const montyHallGetInit = () =>
  ({
    step: 0,
    prizeDoor: getRandomPrizeDoor(),
    contestantDoorSelected: null,
    doorHostRevealed: null,
    contestantSwitch: null,
    reveal: false,
  }) as MontyHall;

export const montyHallContestantChooseDoor = (
  mh: MontyHall,
  contestantDoorSelected: PrizeDoor,
) => {
  if (mh.step !== GAME_STEPS.CONTESTANT_CHOOSE)
    throw new Error(
      "MontyHall must be at step 0 for contestant to choose door",
    );
  return { ...mh, step: mh.step + 1, contestantDoorSelected } as MontyHall;
};

export const montyHallHostRevealDoor = (mh: MontyHall) => {
  if (mh.step !== GAME_STEPS.HOST_REVEAL)
    throw new Error("MontyHall must be at step 1 for host to reveal door");
  const options = DOOR_OPTIONS.filter(
    (o) => o != mh.contestantDoorSelected && o != mh.prizeDoor,
  );
  const doorHostRevealed = options[Math.floor(Math.random() * options.length)];
  return {
    ...mh,
    step: mh.step + 1,
    doorHostRevealed,
  } as MontyHall;
};

export const montyHallContestantSwitch = (
  mh: MontyHall,
  contestantSwitch: boolean,
) => {
  if (mh.step !== GAME_STEPS.CONTESTANT_SWITCH)
    throw new Error(
      "MontyHall must be at step 2 for contestant to choose staying or switching",
    );
  return { ...mh, step: mh.step + 1, contestantSwitch } as MontyHall;
};

export const montyHallGetContestantDoorChoice = (mh: MontyHall) => {
  if (mh.contestantSwitch === null) return mh.contestantDoorSelected;
  const remainingOption = DOOR_OPTIONS.find((o) => {
    if (o === mh.doorHostRevealed) return false;
    if (mh.contestantSwitch && o === mh.contestantDoorSelected) return false;
    else return true;
  });
  if (remainingOption === undefined)
    throw new Error(
      "montyHallGetContestantDoorChoice found an undefined value, this should never happen",
    );
  return remainingOption;
};

export const montyHallReveal = (mh: MontyHall) => {
  if (mh.step !== GAME_STEPS.DRAMATIC_REVEAL)
    throw new Error("MontyHall must be at step 3 to reveal outcome");
  return { ...mh, step: mh.step + 1, reveal: true } as MontyHall;
};

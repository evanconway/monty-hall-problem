import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type PrizeDoor = 1 | 2 | 3;

type GameStep = 0 | 1 | 2 | 3 | 4;

export const GAME_STEPS = {
  CONTESTANT_CHOOSE: 0 as GameStep,
  HOST_REVEAL: 1 as GameStep, // host hasn't revealed yet
  CONTESTANT_SWITCH: 2 as GameStep, // contestant is going to choose to switch
  DRAMATIC_REVEAL: 3 as GameStep,
  DONE: 4 as GameStep,
};

const doorOptions = [1, 2, 3] as PrizeDoor[];

const getRandomPrizeDoor = () => {
  return (Math.floor(Math.random() * 3) + 1) as PrizeDoor;
};

/*
Infer what step we're on (contestant choosing door, host revelaing door...) by null values of
values in game state.
*/
interface GameState {
  prizeDoor: PrizeDoor;
  contestantDoorSelected: PrizeDoor | null;
  doorHostRevealed: PrizeDoor | null;
  contestantSwitch: boolean | null;
  reveal: boolean;
}

const initialState: GameState = {
  prizeDoor: getRandomPrizeDoor(),
  contestantDoorSelected: null,
  doorHostRevealed: null,
  contestantSwitch: null,
  reveal: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    contestantChooseDoor: (state, action: PayloadAction<PrizeDoor>) => {
      if (state.contestantDoorSelected !== null) {
        throw new Error(
          "contestant tried to choose a door but has already chosen a door",
        );
      }
      state.contestantDoorSelected = action.payload;
    },
    hostRevealDoor: (state) => {
      if (state.contestantDoorSelected === null) {
        throw new Error(
          "host tried to reveal door before contestant had chosen door",
        );
      }
      const options = doorOptions.filter(
        (o) => o != state.contestantDoorSelected && o != state.prizeDoor,
      );
      state.doorHostRevealed =
        options[Math.floor(Math.random() * options.length)];
    },
    contestantDecideSwitch: (state, action: PayloadAction<boolean>) => {
      if (state.doorHostRevealed === null) {
        throw new Error(
          "contestant tried to choose switch or stay before host had revealed non-prize door",
        );
      }
      state.contestantSwitch = action.payload;
    },
    reveal: (state) => {
      state.reveal = true;
    },
    newGame: (state) => {
      state.contestantDoorSelected = null;
      state.doorHostRevealed = null;
      state.contestantSwitch = null;
      state.prizeDoor = getRandomPrizeDoor();
      state.reveal = false;
    },
  },
});

export const {
  contestantChooseDoor,
  hostRevealDoor,
  contestantDecideSwitch,
  reveal,
  newGame,
} = gameSlice.actions;

export const selectGameStep = (state: RootState) => {
  const { contestantDoorSelected, doorHostRevealed, contestantSwitch, reveal } =
    state.game;
  if (contestantDoorSelected === null) return GAME_STEPS.CONTESTANT_CHOOSE;
  if (doorHostRevealed === null) return GAME_STEPS.HOST_REVEAL;
  if (contestantSwitch === null) return GAME_STEPS.CONTESTANT_SWITCH;
  if (!reveal) return GAME_STEPS.DRAMATIC_REVEAL;
  return GAME_STEPS.DONE;
};
export const selectContestantDoorSelected = (state: RootState) => {
  const { contestantDoorSelected, doorHostRevealed, contestantSwitch } =
    state.game;
  if (contestantDoorSelected === null) return null;
  if (doorHostRevealed === null || contestantSwitch === null)
    return contestantDoorSelected;
  if (contestantSwitch === false) return contestantDoorSelected;
  // return remaining door
  const finalOption = doorOptions.filter(
    (o) => o !== contestantDoorSelected && o !== doorHostRevealed,
  )[0];
  return finalOption;
};
export const selectHostDoorRevealed = (state: RootState) =>
  state.game.doorHostRevealed;
export const selectContestantSwitched = (state: RootState) =>
  state.game.contestantSwitch;
export const selectPrizeDoor = (state: RootState) => state.game.prizeDoor;

export default gameSlice.reducer;

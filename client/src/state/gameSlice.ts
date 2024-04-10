import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type PrizeDoor = 1 | 2 | 3;

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
}

const initialState: GameState = {
  prizeDoor: getRandomPrizeDoor(),
  contestantDoorSelected: null,
  doorHostRevealed: null,
  contestantSwitch: null,
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
      const options = ([1, 2, 3] as PrizeDoor[]).filter(
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
    newGame: (state) => {
      state.contestantDoorSelected = null;
      state.doorHostRevealed = null;
      state.contestantSwitch = null;
      state.prizeDoor = getRandomPrizeDoor();
    },
  },
});

export const {
  contestantChooseDoor,
  hostRevealDoor,
  contestantDecideSwitch,
  newGame,
} = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectContestantDoorSelected = (state: RootState) =>
  state.game.contestantDoorSelected;
export const selectHostDoorRevealed = (state: RootState) =>
  state.game.doorHostRevealed;
export const selectContestantSwitched = (state: RootState) =>
  state.game.contestantSwitch;
export const selectPrizeDoor = (state: RootState) => state.game.prizeDoor;

export default gameSlice.reducer;

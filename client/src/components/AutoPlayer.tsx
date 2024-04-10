import { useState } from "react";
import { contestantChooseDoor, getRandomPrizeDoor } from "../state/gameSlice";
import { useAppDispatch } from "../state/hooks";

const AutoPlayer = () => {
  const dispatch = useAppDispatch();
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState<boolean[]>([]); // boolean indicates game won
  const [alwaysSwitch, setAlwaysSwitch] = useState(true);

  const playGamesAuto = () => {
    setPlaying(true);
    const randomChoice = getRandomPrizeDoor();
    dispatch(contestantChooseDoor(randomChoice));
  };

  return (
    <div>
      <button onClick={() => setAlwaysSwitch(!alwaysSwitch)}>
        Toggle Always Switch
      </button>
      <div>{`Always Switch: ${alwaysSwitch ? "On" : "Off"}`}</div>
      <button disabled={playing} onClick={playGamesAuto}>
        Play 1000 games
      </button>
    </div>
  );
};

export default AutoPlayer;

import { useEffect, useState } from "react";
import {
  contestantChooseDoor,
  contestantDecideSwitch,
  getRandomPrizeDoor,
  hostRevealDoor,
  newGame,
  reveal,
} from "../state/gameSlice";
import { useAppDispatch } from "../state/hooks";

const AutoPlayer = () => {
  const dispatch = useAppDispatch();
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState<boolean[]>([]); // boolean indicates game won
  const [alwaysSwitch, setAlwaysSwitch] = useState(true);

  const playGamesAuto = () => {
    const timer = 500;
    const randomChoice = getRandomPrizeDoor();
    dispatch(contestantChooseDoor(randomChoice));
    setTimeout(() => {
      dispatch(hostRevealDoor());
      setTimeout(() => {
        dispatch(contestantDecideSwitch(alwaysSwitch));
        setTimeout(() => {
          dispatch(reveal());
          setTimeout(() => {
            dispatch(newGame());
            setPlaying(false);
          }, timer);
        }, timer);
      }, timer);
    }, timer);
  };

  useEffect(() => {
    if (playing) playGamesAuto();
  }, [playing]);

  return (
    <div>
      <button onClick={() => setAlwaysSwitch(!alwaysSwitch)}>
        Toggle Always Switch
      </button>
      <div>{`Always Switch: ${alwaysSwitch ? "On" : "Off"}`}</div>
      <button
        disabled={playing}
        onClick={() => {
          setPlaying(true);
        }}
      >
        Play 1000 games
      </button>
    </div>
  );
};

export default AutoPlayer;

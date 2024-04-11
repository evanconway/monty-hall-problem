import { useEffect, useState } from "react";
import {
  MontyHall,
  montyHallGetContestantDoorChoice,
  montyHallGetPlayedGame,
} from "../montyHall";

const AutoPlayer = () => {
  const gameCount = 1000;
  const [games, setGames] = useState<MontyHall[]>([]); // boolean indicates game won
  const [winLoss, setWinLoss] = useState({ win: 0, lose: 0 });
  const [alwaysSwitch, setAlwaysSwitch] = useState(true);
  const [autoTimeoutId, setAutoTimeoutId] = useState<number | null>(null);

  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing === false) return;
    if (games.length >= gameCount) {
      setPlaying(false);
      setAutoTimeoutId(null);
      return;
    }
    setAutoTimeoutId(
      setTimeout(() => {
        setGames([...games, montyHallGetPlayedGame(alwaysSwitch)]);
      }),
    );
  }, [playing, games, alwaysSwitch, setAutoTimeoutId]);

  useEffect(() => {
    setWinLoss(
      games.reduce(
        (prev, current) => {
          if (current.prizeDoor === montyHallGetContestantDoorChoice(current)) {
            return { ...prev, win: prev.win + 1 };
          } else return { ...prev, lose: prev.lose + 1 };
        },
        { win: 0, lose: 0 },
      ),
    );
  }, [games]);

  return (
    <div>
      <button
        disabled={autoTimeoutId !== null}
        onClick={() => setAlwaysSwitch(!alwaysSwitch)}
      >
        Toggle Always Switch
      </button>
      <div>{`Always Switch: ${alwaysSwitch ? "On" : "Off"}`}</div>
      <button
        disabled={autoTimeoutId !== null}
        onClick={() => {
          if (autoTimeoutId !== null) clearTimeout(autoTimeoutId);
          setGames([]);
          setPlaying(true);
        }}
      >
        {`Play ${gameCount} Games`}
      </button>
      <div>{`wins: ${winLoss.win} losses: ${winLoss.lose}`}</div>
      <div style={{ height: "60vh", overflowY: "scroll" }}>
        <ul>
          {games?.map((game, i) => (
            <li
              style={{ textAlign: "start" }}
              key={i}
            >{`prize: ${game.prizeDoor}, chosen: ${game.contestantDoorSelected}, switched: ${game.contestantSwitch}, won: ${game.prizeDoor === montyHallGetContestantDoorChoice(game)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AutoPlayer;

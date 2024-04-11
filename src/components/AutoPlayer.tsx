import { useEffect, useRef, useState } from "react";
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
  const gamesRef = useRef<HTMLUListElement | null>(null);

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
    if (gamesRef.current === null) return;
    gamesRef.current.scrollTop = gamesRef.current.scrollHeight;
  }, [games]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
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
      </div>
      <ul
        ref={gamesRef}
        style={{
          height: "60vh",
          overflowY: "scroll",
          border: "2px solid",
          listStyleType: "none",
        }}
      >
        {games?.map((game, i) => (
          <li
            style={{ textAlign: "start" }}
            key={i}
          >{`#${i + 1} prize behind door ${game.prizeDoor}, contestant chose door ${game.contestantDoorSelected}, contestant ${alwaysSwitch ? `switched to door ${montyHallGetContestantDoorChoice(game)}` : `stayed with door ${game.contestantDoorSelected}`}, ${game.prizeDoor === montyHallGetContestantDoorChoice(game) ? "won!" : "lost."}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AutoPlayer;

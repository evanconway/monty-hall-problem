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

  useEffect(() => {
    setGames([]);
  }, [alwaysSwitch, setGames]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "25%" }}>
        <button
          onClick={() => {
            setGames(
              [...new Array(gameCount)].map(() =>
                montyHallGetPlayedGame(alwaysSwitch),
              ),
            );
          }}
        >
          {`Play ${gameCount} Games`}
        </button>
        <div>{`wins: ${winLoss.win} losses: ${winLoss.lose}`}</div>
        <br />
        <button onClick={() => setAlwaysSwitch(!alwaysSwitch)}>
          Toggle Always Switch
        </button>
        <div>
          {alwaysSwitch ? "switch to other door" : "stay with first choice"}
        </div>
      </div>
      <ul
        style={{
          width: "60%",
          height: "60vh",
          overflowY: "scroll",
          border: `0.25em solid`,
          listStyleType: "none",
          padding: "1em",
        }}
      >
        {games.length <= 0 ? (
          <div>No games played yet.</div>
        ) : (
          games.map((game, i) => (
            <li key={i}>
              <div>{`#${i + 1}`}</div>
              <div>{`contestant chose door ${game.contestantDoorSelected}`}</div>
              <div>{`host revealed door ${game.doorHostRevealed} was empty`}</div>
              <div>{`contestant ${game.contestantSwitch ? `switched to door ${montyHallGetContestantDoorChoice(game)}` : `stayed with door ${game.contestantDoorSelected}`}`}</div>
              <div>{`prize was behind door ${game.prizeDoor}`}</div>
              <div>
                {game.prizeDoor === montyHallGetContestantDoorChoice(game)
                  ? "won!"
                  : "lost"}
              </div>
              <br />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AutoPlayer;

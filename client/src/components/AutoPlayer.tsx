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

  return (
    <div>
      <button onClick={() => setAlwaysSwitch(!alwaysSwitch)}>
        Toggle Always Switch
      </button>
      <div>{`Always Switch: ${alwaysSwitch ? "On" : "Off"}`}</div>
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
      <ul>
        {games?.map((game, i) => (
          <li
            style={{ textAlign: "start" }}
            key={i}
          >{`prize: ${game.prizeDoor}, chosen: ${game.contestantDoorSelected} switched: ${game.contestantSwitch} won: ${game.prizeDoor === montyHallGetContestantDoorChoice(game)}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AutoPlayer;

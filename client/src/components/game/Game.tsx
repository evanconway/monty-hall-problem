import Door from "./Door";

const Game = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Door doorNumber={1} />
        <Door doorNumber={2} />
        <Door doorNumber={3} />
      </div>
    </div>
  );
};

export default Game;

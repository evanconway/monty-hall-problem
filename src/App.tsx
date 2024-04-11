import AutoPlayer from "./components/AutoPlayer";
import Game from "./components/game/Game";

function App() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>To Switch Or Not To Switch?</h1>
      <section>
        <h2>The Problem</h2>
        <p>
          The{" "}
          <a href="https://en.wikipedia.org/wiki/Monty_Hall_problem">
            Monty Hall Problem
          </a>{" "}
          comes from a game show. The contestant is shown 3 doors. Behind one is
          a prize. First the contestant must choose a door they believe the
          prize is behind. Then of the remaining 2 doors, the host will open one
          to reveal it is empty. The host knows which door the prize is behind
          and will ALWAYS reveal an empty door. Then the contestant must choose
          to stay with their original door, or switch to the other closed door.
          Is there an optimal choice and which is it?
        </p>
      </section>
      <section>
        <h2>The Game</h2>
        <p>
          Play through the game below. Play multiple times to get a feel for it.
          Do you notice any patterns?
        </p>
      </section>
      <Game />
      <section>
        <h2>The Solution</h2>
        <p>
          There is an optimal choice. Switching doors has a greater probability
          of finding the prize than staying with your original choice. But it's
          hard to understand why. So instead of trying to explain it, let's see
          it play out. Below is the game again but this time with the option to
          play 1000 games instantly! Your initial door choice will be random.
          You decide whether to always stay with your original choice or switch
          to the other available door. Play games and see for yourself which
          option wins more often.
        </p>
      </section>
      <AutoPlayer />
    </div>
  );
}

export default App;

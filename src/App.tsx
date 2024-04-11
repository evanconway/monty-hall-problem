import AutoPlayer from "./components/AutoPlayer";
import Game from "./components/game/Game";

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>To Switch Or Not To Switch?</h1>
      <section>
        <h2>The problem</h2>
        <p>
          The Monty Hall problem comes from a game show. The contestant is shown
          3 doors. Behind one is a prize. Behind the others are duds . First the
          contestant must choose a door they believe the prize is behind. Then
          of the remaining 2 doors, the host will open one to reveal a dud. The
          host knows which door the prize is behind and will ALWAYS reveal a dud
          door. After this the contestant must choose to stay with their
          original door, or switch to the other closed door. Is there an optimal
          choice, and which is it?
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
          There is an optimal choice. You should always switch. But it's hard to
          understand why. So instead of trying to explain it. Let's see it play
          out in real time. Below is the game again, but this time with the
          option to play it automatically and really fast! Your initial door
          choice will be random, but you can decide whether to always stay with
          your original choice, or switch to the other available door.
        </p>
      </section>
      <AutoPlayer />
    </div>
  );
}

export default App;

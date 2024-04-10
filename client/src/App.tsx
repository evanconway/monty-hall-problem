function App() {
  return (
    <div>
      <h1>The problem</h1>
      <p>
        The Monty Hall problem comes from a game show. The contestent is shown 3
        doors. Behind one is a prize, but behind the other 2 are dud prizes.
        First the contestant must choose a door they believe the prize is
        behind. Then of the remaining 2 doors, the host will reveal a dud from
        one of them. The host knows which door the prize is behind and will
        ALWAYS reveal a dud door. After this the contestant is allowed to choose
        to stay with the door they originally picked, or switch the other close
        door. Is there an optimal choice, and which is it?
      </p>
      <h1>The Solution</h1>
      <p>
        There is an optimal choice. You should always switch. But it's hard to
        understand why. So instead of explaining it, let's see it.
      </p>
    </div>
  );
}

export default App;

import { SimpleReact } from "./src";

/** @jsx SimpleReact.createElement */
function Counter() {
  const [state, setState] = SimpleReact.useState(1);
  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  )
}

SimpleReact.render(<Counter />, document.getElementById("app"));

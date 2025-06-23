import { useState } from "react";
import ExpensiveComponent from "./ExpensiveComponent";

export default function Count() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <ExpensiveComponent value={100} />
    </div>
  );
}

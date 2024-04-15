import React, { useEffect, useState } from 'react';

function Totalstats() {
  // State example
  const [count, setCount] = useState(0);

  // Effect example
  useEffect(() => {
    // Code to run on component mount and whenever count changes
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <h1>My React Component</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Totalstats;

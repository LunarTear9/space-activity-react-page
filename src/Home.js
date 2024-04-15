import React, { useEffect } from 'react';

function Totalstats() {
  // State example
 

  // Effect example
  useEffect(() => {
    // Code to run on component mount and whenever count changes
    document.title = `You clicked ${count} times`;
  }, [count]);



  return (
    <div>
      <h1>My React Component</h1>
      <p>You clicked {count} times</p>
      
    </div>
  );
}

export default Totalstats;

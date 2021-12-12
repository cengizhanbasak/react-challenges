import React, { useState } from 'react';
import IncrementButton from './IncrementButton';
import CountContext from './context';

const App = () => {
  const [value, setValue] = useState<number>(0);
  return (
    <CountContext.Provider value={() => setValue(value + 1)}>
      <div className="counter">
        <div>
          Counter value is: {value}
          <IncrementButton />
        </div>
      </div>
    </CountContext.Provider>
  );
}

export default App;

import React, { useState } from 'react';
import TicTacToe from './TicTacToe';

const App = () => {
  const [value, setValue] = useState<number>(0);
  return (
      <div className="app">
        <div>
          <TicTacToe />
        </div>
      </div>
  );
}

export default App;

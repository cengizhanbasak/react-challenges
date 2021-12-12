import React, { useState } from 'react';
import DebouncedTextbox from './DebouncedTextbox';

const App = () => {
  const [value, setValue] = useState<string>("");
  return (
      <div className="app">
        <div>
          <DebouncedTextbox timeout={400} onChange={(value: string) => setValue(value)} />
          <div>
            Value is: {value}
          </div>
        </div>
      </div>
  );
}

export default App;

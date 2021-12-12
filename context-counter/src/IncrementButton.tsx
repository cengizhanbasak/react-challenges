import React, { FC, useContext } from 'react';
import CountContext from './context';

const IncrementButton: FC = () => {
  const incrementCounter = useContext(CountContext);
  return (
    <div>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
}

export default IncrementButton;

import React, { FC, useCallback, useState } from 'react';

const DebouncedTextbox: FC<{
  onChange: Function,
  timeout: number
}> = ({ onChange, timeout }) => {
  const [TO, setTO] = useState<NodeJS.Timeout>();
  const handleChange = useCallback((e) => {
    if (TO) {
      clearTimeout(TO);
    }
    const value = e.target.value;
    const handle = setTimeout(() => {
      onChange(value);
    }, timeout);
    setTO(handle);
  }, [TO, onChange, timeout]);
  return <input type="text" onChange={handleChange} />
}

export default DebouncedTextbox;
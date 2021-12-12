import React, { DragEvent, useCallback, useState } from 'react';

const App = () => {
  const [list, setList] = useState<string[]>(['Lorem', 'Ipsum', 'Dolor', 'Sit']);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentlyDragging, setCurrentlyDragging] = useState<number>(0);

  const handleAddItem = useCallback(() => {
    if (inputValue.length !== 0) {
      setList([...list, inputValue]);
      setInputValue('');
    }
  }, [inputValue, list, setInputValue]);

  const handleDeleteItem = useCallback((i) => {
    setList([...list.slice(0,i),...list.slice(i+1, list.length)]);
  }, [list]);
  const handleDragStart = (e: DragEvent, i: number) => {
    setCurrentlyDragging(i);
  };

  const calcNewList = (list: string[], from: number, to: number) => {
    const newList = [...list];
    const item = newList[from];
    newList.splice(from, 1);
    newList.splice(to, 0, item);
    return newList;
  }

  const handleDragOver = useCallback((i: number) => {
    const from = currentlyDragging;
    const to = i;
    setCurrentlyDragging(to);
    const newList = calcNewList(list, from, to);
    setList(newList);
  }, [currentlyDragging, list]);

  return (
    <div className="App">
      <div>
        <ul className="listContainer">
            {list.map((item, i) => (
              <li
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragEnter={() => handleDragOver(i)}
              >
                {item}
                <button
                  onClick={() => handleDeleteItem(i)}
                >
                  X
                </button>
              </li>  
            ))}
        </ul>
        <div className="inputContainer">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleAddItem()}
          />
          <button
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

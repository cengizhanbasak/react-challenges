import React, { useEffect, useState } from 'react';
import DebouncedTextbox from './DebouncedTextbox';

const App = () => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  useEffect(() => {
    const searchDigimon = async () => {
      if (!value) {
        setError('');
        setRecommendations([]);
        return;
      }
      try {
        setError('');
        const res = await fetch(`https://digimoncard.io/api-public/search.php?n=${value}`);
        const json = await res.json();
        setRecommendations(json.error ? [] : json.slice(0, 10));
      } catch (e: any) {
        setError(e.message);
        setRecommendations([]);
      }

    };
    searchDigimon();
  }, [value])
  return (
      <div className="counter">
        <div>
          <div>Digimon Search</div>
          <DebouncedTextbox timeout={500} onChange={setValue} />
          <ul>
            {recommendations.map(rec => (
              <div>{rec.name}({rec.color})</div>
            ))}
          </ul>
          {error && (<div>{error}</div>)}
        </div>
      </div>
  );
}

export default App;

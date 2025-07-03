import { useState } from 'react';
import axios from 'axios';

export default function MediaSearch() {
  const [query, setQuery] = useState('apollo');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = () => {
    setLoading(true);
    axios.get('https://stellarscope-sm5o.onrender.com/api/media', {
      params: { q: query },
    })
      .then(res => {
        setResults(res.data.collection.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-orbitron">
      <h1 className="text-3xl font-bold text-center mb-6">🎞️ NASA Image & Video Library</h1>

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="p-2 w-64 text-black rounded"
        />
        <button onClick={search} className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded font-bold">Search</button>
      </div>

      {loading && <p className="text-center">Searching...</p>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {results.map(item => {
          const data = item.data[0];
          const img = item.links?.[0]?.href;
          return (
            <div key={item.href} className="bg-gray-800 p-4 rounded text-white shadow">
              <img src={img} alt={data.title} className="mb-2 rounded w-full h-48 object-cover" />
              <h2 className="text-yellow-300 font-semibold">{data.title}</h2>
              <p className="text-sm text-gray-400">{data.date_created?.split('T')[0]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EONET() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://stellarscope-sm5o.onrender.com/api/eonet')
      .then(res => setEvents(res.data.events || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto font-orbitron">
      <h1 className="text-3xl font-bold text-center mb-6">🌍 Earth Natural Events (EONET)</h1>

      {loading && <p className="text-center">Loading events...</p>}

      <div className="grid gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-gray-800 p-4 rounded text-white shadow">
            <h2 className="text-yellow-300 font-semibold">{event.title}</h2>
            <p>🗓 Date: {event.geometry?.[0]?.date?.split('T')[0]}</p>
            <p>📍 Location: [{event.geometry?.[0]?.coordinates?.join(', ')}]</p>
            <p className="text-sm text-gray-400">Type: {event.categories?.[0]?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

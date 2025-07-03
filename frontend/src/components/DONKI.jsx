import { useState } from 'react';
import axios from 'axios';

export default function DONKI() {
  const [type, setType] = useState('CME');
  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-06-25');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonki = () => {
    setLoading(true);
    axios.get('https://stellarscope-sm5o.onrender.com/api/donki', {
      params: { type, startDate, endDate },
    })
      .then(res => setEvents(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-orbitron">
      <h1 className="text-3xl font-bold text-center mb-6">🌞 Space Weather Events (DONKI)</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select value={type} onChange={e => setType(e.target.value)} className="p-2 rounded text-black">
          <option value="CME">CME</option>
          <option value="FLR">Solar Flare</option>
          <option value="SEP">Solar Energetic Particles</option>
        </select>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-2 rounded text-black" />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-2 rounded text-black" />
        <button onClick={fetchDonki} className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded font-bold">Fetch</button>
      </div>

      {loading && <p className="text-center">Loading DONKI events...</p>}

      <div className="grid gap-4">
        {events.map((event, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded text-white shadow">
            <h2 className="text-yellow-300 font-semibold">{type} Event</h2>
            <p>🗓 Date: {event.startTime?.split('T')[0]}</p>
            <p>🔬 Details: {event.note || 'N/A'}</p>
            <p className="text-sm text-gray-400">ID: {event.activityID || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

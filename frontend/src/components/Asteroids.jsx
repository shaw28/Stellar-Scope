import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Asteroids() {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAsteroids = () => {
    setLoading(true);
    axios
      .get('https://stellarscope-sm5o.onrender.com/api/asteroids', {
        params: { start_date: startDate, end_date: endDate },
      })
      .then((res) => {
        const data = Object.values(res.data.near_earth_objects).flat();
        setAsteroids(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // Automatically fetch live data on page load
  useEffect(() => {
    fetchAsteroids();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto font-orbitron">
      <h1 className="text-3xl font-bold text-center mb-6">☄️ Near-Earth Asteroids</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded text-black"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          onClick={fetchAsteroids}
          className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded font-bold"
        >
          Fetch
        </button>
      </div>

      {loading && <p className="text-center">Loading asteroids...</p>}

      <div className="grid gap-4">
        {asteroids.map((ast) => (
          <div key={ast.id} className="bg-gray-800 p-4 rounded text-white shadow">
            <h2 className="text-yellow-300 font-semibold">{ast.name}</h2>
            <p>📅 Approach: {ast.close_approach_data[0]?.close_approach_date}</p>
            <p>
              📏 Diameter:{' '}
              {ast.estimated_diameter.meters.estimated_diameter_max.toFixed(1)} m
            </p>
            <p>
              🛰 Velocity:{' '}
              {parseFloat(
                ast.close_approach_data[0]?.relative_velocity.kilometers_per_hour
              ).toFixed(0)}{' '}
              km/h
            </p>
            <p>
              📍 Miss Distance:{' '}
              {parseFloat(
                ast.close_approach_data[0]?.miss_distance.kilometers
              ).toFixed(0)}{' '}
              km
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

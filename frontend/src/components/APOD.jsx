import { useEffect, useState } from 'react';
import axios from 'axios';

export default function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://stellarscope-sm5o.onrender.com/api/apod')
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch APOD:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-10">Loading Astronomy Picture...</p>;
  if (!apod) return <p className="text-center p-10 text-red-400">Failed to load APOD.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-center font-orbitron">
      <h1 className="text-3xl font-bold mb-4">{apod.title}</h1>

      {apod.media_type === 'image' ? (
        <img
          src={apod.url}
          alt={apod.title}
          className="rounded-lg shadow-xl mx-auto mb-4 max-h-[500px] w-full object-contain"
        />
      ) : (
        <iframe
          title="NASA Video"
          src={apod.url}
          className="w-full h-[400px] rounded-lg mb-4"
          allow="fullscreen"
        />
      )}

      <p className="text-white text-justify">{apod.explanation}</p>
      <p className="text-sm mt-4 text-gray-400">📅 Date: {apod.date}</p>
    </div>
  );
}

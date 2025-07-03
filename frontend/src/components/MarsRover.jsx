import { useState, useEffect } from 'react';
import axios from 'axios';

const rovers = ['curiosity', 'opportunity', 'spirit'];
const cameras = ['FHAZ', 'RHAZ', 'NAVCAM', 'MAST', 'CHEMCAM'];

export default function MarsRover() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sol, setSol] = useState(900);
  const [rover, setRover] = useState('curiosity');
  const [camera, setCamera] = useState('FHAZ');

  const fetchPhotos = () => {
    setLoading(true);
    axios
      .get('https://stellarscope-sm5o.onrender.com/api/mars', {
        params: { sol, rover, camera },
      })
      .then((res) => setPhotos(res.data.photos || []))
      .catch((err) => console.error('Error fetching Mars photos:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPhotos(); // fetch default on mount
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto font-orbitron">
      <h1 className="text-3xl text-center font-bold mb-6">🚀 Mars Rover Photo Gallery</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="number"
          value={sol}
          onChange={(e) => setSol(e.target.value)}
          className="p-2 rounded text-black"
          placeholder="Sol (Martian day)"
        />
        <select
          value={rover}
          onChange={(e) => setRover(e.target.value)}
          className="p-2 rounded text-black"
        >
          {rovers.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">All Cameras</option>
          {cameras.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={fetchPhotos}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded transition"
        >
          Fetch
        </button>
      </div>

      {/* Results */}
      {loading && <p className="text-center text-yellow-300">Loading photos...</p>}
      {!loading && photos.length === 0 && (
        <p className="text-center text-red-400">No photos found for these filters.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-gray-800 p-2 rounded shadow-lg">
            <img src={photo.img_src} alt={photo.id} className="rounded w-full mb-2" />
            <p className="text-sm text-white">📷 Camera: {photo.camera.name}</p>
            <p className="text-sm text-gray-400">
              🚀 Rover: {photo.rover.name} | 🪐 Sol: {photo.sol}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import APOD from './components/APOD';
import MarsRover from './components/MarsRover';
import Asteroids from './components/Asteroids';
import MediaSearch from './components/MediaSearch';
import EONET from './components/EONET';
import DONKI from './components/DONKI';
import About from './components/About'; 






function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    
    <Router>
      {/* Top Centered Navbar */}
      <header className="sticky top-0 z-50 bg-black/80 border-b border-yellow-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center relative text-yellow-300 font-orbitron">
          <nav className="flex items-center gap-6 text-sm sm:text-base">
            <Link to="/" className="hover:text-yellow-100 transition" onClick={closeDropdown}>
              🏠 Home
            </Link>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-yellow-100 transition"
              >
                🚀 Explore ▼
              </button>
              {dropdownOpen && (
                <div
                  onMouseLeave={closeDropdown}
                  className="absolute left-0 mt-2 bg-black border border-yellow-400 rounded shadow-lg text-left z-50"
                >
                  {[
                    ['📸 APOD', '/apod'],
                    ['🚀 Mars Rover', '/mars'],
                    ['☄️ Asteroids', '/asteroids'],
                    ['🎞️ Media Library', '/media'],
                    ['🌍 EONET', '/eonet'],
                  ].map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={closeDropdown}
                      className="block px-4 py-2 hover:bg-yellow-100 hover:text-black transition-all"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-yellow-100 transition" onClick={closeDropdown}>
              📘 About
            </Link>
          </nav>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/mars" element={<MarsRover />} />
        <Route path="/asteroids" element={<Asteroids />} />
        <Route path="/media" element={<MediaSearch />} />
        <Route path="/eonet" element={<EONET />} />
        <Route path="/donki" element={<DONKI />} />
        <Route path="/about" element={<About />} />
       
      </Routes>
    </Router>
  );
}

export default App;

import { useEffect, useState, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars, Text } from '@react-three/drei';

import earthTex from '../assets/textures/earth.jpg';
import marsTex from '../assets/textures/mars.jpg';
import moonTex from '../assets/textures/moon.jpg';
import sunTex from '../assets/textures/sun.jpg';


const PLANETS = [
  {
    name: 'Earth',
    path: '/asteroids',
    texture: earthTex,
    radius: 12,
    orbitSpeed: 0.007,
    size: 0.8,
    description: '🌍 Earth Mission Archive: Navigate asteroid threats orbiting near our planet in real-time.'
  },
  {
    name: 'Mars',
    path: '/media',
    texture: marsTex,
    radius: 15,
    orbitSpeed: 0.005,
    size: 0.7,
    description: '🚀 Mars Surface Feed: Access live rovers’ image archive and mission snapshots.'
  },
  {
    name: 'Moon',
    path: '/apod',
    texture: moonTex,
    radius: 6,
    orbitSpeed: 0.01,
    size: 0.5,
    description: '🌕 APOD Gateway: View daily astronomy photographs from across the cosmos.'
  },
  {
    name: 'Sun',
    path: '/donki',
    texture: sunTex,
    radius: 9,
    orbitSpeed: 0.004,
    size: 1.2,
    description: '☀️ Space Weather Relay: Track solar flares and coronal mass ejections.'
  }
];

function Planet({ planet, onHover }) {
  const mesh = useRef();
  const texture = useLoader(THREE.TextureLoader, planet.texture);
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);

  useFrame(() => {
    setAngle((prev) => prev + planet.orbitSpeed); // very slow
    const x = planet.radius * Math.cos(angle);
    const z = planet.radius * Math.sin(angle);

    if (mesh.current) {
      mesh.current.position.set(x, 0, z);
      mesh.current.rotation.y += 0.001; // subtle spin
    }
  });

  return (
    <>
      <mesh
        ref={mesh}
        onPointerOver={() => onHover(planet.description)}
        onPointerOut={() => onHover(null)}
        onClick={() => window.location.href = planet.path}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[planet.radius - 0.05, planet.radius + 0.05, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

function StarWarsText({ hoveredDescription }) {
  const ref = useRef();
  const [yPos, setYPos] = useState(-12);
  const [opacity, setOpacity] = useState(1);

  useFrame(() => {
    if (!hoveredDescription && ref.current) {
      const newY = yPos + 0.01;
      setYPos(newY);
      ref.current.position.y = newY;

      if (newY > 5) setOpacity((prev) => Math.max(prev - 0.01, 0));
      if (newY > 10) {
        setYPos(-12);
        setOpacity(1);
      }
    }
  });

  return (
    <Text
      ref={ref}
      position={[0, hoveredDescription ? 0 : yPos, -20]}
      rotation={[-0.35, 0, 0]}
      fontSize={2}
      maxWidth={22}
      lineHeight={1.4}
      color="yellow"
      anchorX="center"
      anchorY="middle"
    >
      {hoveredDescription || `Welcome to StellarScope.\n\nEach planet holds a data stream.\nClick to begin your journey.`}
    </Text>
  );
}

function SolarSystem() {
  const [hoveredDescription, setHoveredDescription] = useState(null);

  return (
    <div className="flex items-center justify-between w-full h-[90vh]">
      {/* Left - Solar System */}
      <Canvas camera={{ position: [0, 40, 0], fov: 50 }} className="w-3/5 h-full">
        <color attach="background" args={["black"]} />
        <Stars radius={300} depth={60} count={20000} factor={7} fade />
        <ambientLight intensity={0.9} />
        <pointLight position={[0, 0, 0]} intensity={3} />
        {PLANETS.map((planet) => (
          <Planet key={planet.name} planet={planet} onHover={setHoveredDescription} />
        ))}
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Right - StarWarsText or Description */}
      <div className="w-3/5 h-full flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 40], fov: 45 }} className="w-full h-full">
          <Stars radius={100} depth={50} count={7000} factor={4} fade />
          <ambientLight intensity={1.2} />
          <StarWarsText hoveredDescription={hoveredDescription} />
        </Canvas>
      </div>
    </div>
  );
}



function Sun() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.002;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial emissive={'yellow'} emissiveIntensity={2.5} />
    </mesh>
  );
}





export default function Landing() {
  const scrollRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      const indicator = document.getElementById('scroll-indicator');
      if (indicator) {
        if (window.scrollY > 50) {
          indicator.style.opacity = '0';
        } else {
          indicator.style.opacity = '1';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [donkiUpdate, setDonkiUpdate] = useState(null);
  const [showDonki, setShowDonki] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          'https://stellarscope-sm5o.onrender.com/api/donki?type=FLR&startDate=2025-06-20&endDate=2025-06-25'
        )
        .then((res) => {
          const latest = res.data[0];
          if (latest) {
            setDonkiUpdate(
              `🚨 ${latest.classType || 'Flare'} on ${
                latest.startTime?.split('T')[0]
              } — ${latest.note || 'Details unavailable'}`
            );
          }
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full text-white font-orbitron">
      {/* DONKI Tooltip */}
      {donkiUpdate && showDonki && (
        <div className="fixed bottom-4 right-4 z-50 bg-yellow-300 text-black px-4 py-2 rounded shadow-lg text-sm max-w-xs w-full">
          <div className="flex justify-between items-center">
            <p className="font-bold">🌞 Live Space Weather Update</p>
            <button
              onClick={() => setShowDonki(false)}
              className="ml-2 text-black hover:text-red-600 font-bold"
            >
              ✕
            </button>
          </div>
          <p>{donkiUpdate}</p>
          <p className="text-xs text-gray-600 mt-1">
            Updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* Hero Section */}
<section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
  <div className="max-w-screen-md w-full z-10 leading-none">
    <h1
      className="text-[5rem] sm:text-[6rem]  uppercase"
      style={{
        fontFamily: "'SF Distant Galaxy Outline', sans-serif",
        color: 'black',
        lineHeight: 0.5,
        textShadow: `
          2px 0 #facc15,
          -2px 0 #facc15,
          0 2px #facc15,
          0 -2px #facc15,
          1px 1px #facc15,
          -1px -1px #facc15,
          1px -1px #facc15,
          -1px 1px #facc15
        `
      }}
    >
      STELLAR
    </h1>
    <h1
      className="text-[6.5rem] sm:text-[8.5rem]  uppercase"
      style={{
        fontFamily: "'SF Distant Galaxy Outline', sans-serif",
        color: 'black',
        lineHeight: 1,
        textShadow: `
          2px 0 #facc15,
          -2px 0 #facc15,
          0 2px #facc15,
          0 -2px #facc15,
          1px 1px #facc15,
          -1px -1px #facc15,
          1px -1px #facc15,
          -1px 1px #facc15
        `
      }}
    >
      SCOPE
    </h1>
    <p
  className="mt-6 text-yellow-300 text-lg sm:text-xl px-4 max-w-3xl mx-auto italic tracking-wide leading-relaxed"
  style={{
    fontFamily: "'Orbitron', sans-serif",
    textAlign: 'center',
  }}
>
  Explore real-time NASA data through an immersive interface  <p className="text-white max-w-2xl mx-auto text-lg mb-12 italic">
            Mission Statement:
            navigate NASA data streams to understand and monitor our universe
            in real-time.
          </p>
</p>

  </div>

  <div
    className="absolute bottom-10 text-white text-sm sm:text-base animate-bounce z-10 transition-opacity duration-500"
    id="scroll-indicator"
  >
    ⬇️ Scroll to explore the galaxy
  </div>
</section>






      {/* Animated Content Section */}
      <motion.div className="py-20 px-4 text-center  mx-auto bg-black" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: false, amount: 0.3 }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="text-4xl font-bold text-yellow-300 mb-6">
  NASA’s API Data, Reimagined
</h2>
<p className="text-white max-w-2xl mx-auto text-lg mb-12 italic">
  Step beyond static dashboards. StellarSCOPE offers an immersive portal to explore live NASA feeds through an interactive solar system. Select any orbiting planet to access its stream — real-time space data visualized for the modern explorer.
</p>

        </motion.div>
      </motion.div>

      {/* Solar System Section */}
      <section className="w-full  bg-black">
  <h3 className="text-center text-yellow-300 text-2xl font-semibold mb-6">🪐 Interact with the solar system — each planet is a live data portal</h3>
        <SolarSystem />
      </section>
    </main>
  );
}

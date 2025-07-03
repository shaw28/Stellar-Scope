export default function About() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-6 text-white font-orbitron">
      <h1 className="text-4xl font-bold text-yellow-300 mb-6 text-center">🛰️ About StellarScope</h1>

      <p className="mb-6 text-lg text-justify">
        <strong>StellarScope</strong> is a interface built to visualize NASA’s open APIs through an immersive 3D solar system and inspired a bit from StarWars. Each orbiting celestial body represents live data from different missions—designed for space enthusiasts, students, and researchers.
      </p>

      <h2 className="text-2xl font-semibold text-yellow-300 mt-10 mb-4">🚀 Technologies Used</h2>
      <ul className="list-disc list-inside text-base space-y-2">
        <li><strong>Frontend:</strong> React.js + Tailwind CSS</li>
        <li><strong>3D Interface:</strong> Three.js via @react-three/fiber + @react-three/drei</li>
        <li><strong>Animation:</strong> Framer Motion</li>
        <li><strong>NASA APIs:</strong> APOD, Mars Rover, DONKI (Solar Weather), Asteroids, EONET, Media Library</li>
        <li><strong>Deployment:</strong> Vercel / Netlify / GitHub Pages</li>
        <li><strong>Routing:</strong> React Router DOM</li>
      </ul>

      <h2 className="text-2xl font-semibold text-yellow-300 mt-10 mb-4">👨‍💻 About the Developer</h2>
      <p className="mb-6 text-base text-justify">
        This project was designed and developed by <strong>Kishore Shaw M R</strong> as a creative frontend engineering showcase. With a background in Computer Science and HCI, I specialize in building interactive UIs using real-world data through API and full stack concepts.
      </p>
      <p className="mb-4 text-base">
        💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/kishore-shaw28" className="text-yellow-300 underline" target="_blank" rel="noreferrer">kishore-shaw28</a><br />
        💻 <strong>GitHub:</strong> <a href="https://github.com/shaw28" className="text-yellow-300 underline" target="_blank" rel="noreferrer">shaw28</a><br />
        📧 <strong>Email:</strong> <a href="mailto:mrkishore28@gmail.com" className="text-yellow-300 underline">mrkishore28@gmail.com</a>
      </p>

      <p className="text-sm italic text-gray-400 mt-12 text-center">
        This project is a non-commercial educational showcase built with publicly available NASA data.
      </p>
    </main>
  );
}

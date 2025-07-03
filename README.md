 🚀 StellarScope

**A Full Stack NASA Data Explorer Interface**

StellarScope is a full stack web application that implements NASA’s open APIs in a creative and interactive interface. Built using **React** (frontend), **Node.js + Express** (backend), the app lets users explore space data through an immersive solar system layout where each celestial object is linked to a unique NASA API.

<img width="1274" alt="image" src="https://github.com/user-attachments/assets/04b2aac7-1cb6-4f33-a630-771adb4bfb72" />


## @Live Application

👉 [Live Link FrontEnd - https://stellar-scope-frontend.vercel.app/ ]

👉 [Live Link BackEnd - https://stellarscope-sm5o.onrender.com/ ]

---

## 📁 Project Structure

StellarScope/
├── backend/ # Express server for API routes
│ └── index.js
├── frontend/ # React app for UI/UX and visualisation
│ └── src/
│ └── components/
│ └── assets/
│ └── api.js
├── .gitignore
├── README.md
└── package.json

## @Features

- 🌌 **Interactive Solar System**: Hover/click planets to explore real NASA APIs.
- 🖼️ **APOD**: Astronomy Picture of the Day.
- 🚀 **Mars Rover**: Access Curiosity’s mission images.
- 🌍 **Asteroids**: View real-time NEO data near Earth.
- 🛰️ **EONET**: Visualize Earth’s natural event alerts.
- ☀️ **DONKI**: Space weather and solar flares data in tooltip.
- 🧭 **Live Tooltip Updates** (e.g. solar flare alerts).
- ✨ **Star Wars-style text transitions**.
- 🎨 **Realistic 2D top-view planetary motion with textures**.
- ⚙️ **Custom Backend to prevent API key exposure**.

---

## 🔧 Technologies Used

### Frontend
- React.js
- @react-three/fiber (Three.js)
- Tailwind CSS
- Framer Motion
- axios

### Backend
- Node.js
- Express
- dotenv
- axios

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/shaw28/Stellar-Scope.git
cd Stellar-Scope
2. Backend Setup
bash

cd backend
npm install

cmd command to run
node index.js
Runs on: http://localhost:5000

3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
Update src/api.js to match your backend URL if needed.

Start frontend:

cmd command
npm start
Runs on: http://localhost:3000

🚀 Deployment Links

Live Site	[https://stellarscope-sm5o.onrender.com]   (https://stellar-scope-frontend.vercel.app/)
GitHub	https://github.com/shaw28/Stellar-Scope

🧪 Potential Improvements
Add unit testing using Jest or React Testing Library

Expand to use more NASA APIs (e.g. EPIC, Insight Mars Weather)

Optimize texture loading and canvas responsiveness

Responsive design tuning for small screen devices

Add more visualisation and interactivity

📜 License
This project is built for educational and demonstrative purposes as part of a Software Engineering coding challenge.

🛰️ Credits
NASA Open APIs https://api.nasa.gov

Planet textures from SolarSystemScope

StarWars

🧑‍💻 Developer
Kishore Shaw M R 

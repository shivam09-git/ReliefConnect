🌍 ReliefConnect — Disaster Relief & Assistance Platform

ReliefConnect is a real-time disaster management platform that connects victims, volunteers, and rescue authorities.
It enables fast, location-based help during emergencies such as floods, fire, drought, lightning, and more.

This system provides live updates, interactive maps, secure authentication, and real-time communication powered by Socket.io.

🚀 Features
🧑‍🤝‍🧑 User & Volunteer Tools

📍 Post Help Requests (food, shelter, medical, rescue)

🤝 Offer Help with real-time volunteer matching

🗺️ Interactive Relief Map (Leaflet + Satellite view)

🔄 Real-time Requests using Socket.io

🔐 Login & Register with JWT authentication

📊 System Features

Live disaster request feed

Background auto-rotating hero images

Status counters: Active requests, volunteers, regions

Preloaded media for smooth UI

Admin ready structure

🗺️ Map Features

Leaflet.js based

Satellite layer (Esri/Google Satellite)

Location-based clustering

User markers with details

Disaster category pins

🧠 How It Works

User posts a help request with GPS / location

Volunteers receive live updates via Socket.io

Map displays all active incidents

NGOs/Admins can monitor overall statistics

Rescue happens faster with real-time coordination

⚙️ Tech Stack
Frontend

React.js

React Router

Leaflet.js

Socket.io-client

CSS Animations

Backend

Node.js / Express

MongoDB / Mongoose

Socket.io

JWT Authentication

📁 Project Folder Structure
ReliefConnect/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── utils/
│
├── frontend/
│   ├── public/
│   │    ├── images/
│   │    │   ├── flood.webp
│   │    │   ├── fire.webp
│   │    │   ├── drought.webp
│   │    │   └── lightning.webp
│   │    └── index.html
│   │
│   ├── src/
│   │    ├── components/
│   │    │   ├── Home.js
│   │    │   ├── Login.js
│   │    │   ├── Register.js
│   │    │   ├── Map.js
│   │    │   ├── RequestHelp.js
│   │    │   └── OfferHelp.js
│   │    │
│   │    ├── pages/
│   │    ├── utils/
│   │    │   └── auth.js
│   │    ├── config.js
│   │    ├── App.js
│   │    ├── index.js
│   │    └── Home.css
│   │
│   └── package.json
│
├── README.md
└── .gitignore

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/shivam09-git/ReliefConnect.git
cd ReliefConnect

2️⃣ Backend Setup
cd backend
npm install
npm start

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start


Your React app will start at:
👉 http://localhost:3000

Backend API runs at:
👉 http://localhost:5000

📞 Helpline Contacts
National Disaster Helpline: 1078

Ambulance: 102 / 108

Fire Services: 101

Police Emergency: 100

Email: disasterhelpline@gov.in

👤 Author

Shivam Naik
🔗 GitHub: shivam09-git

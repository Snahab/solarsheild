# ☀️ SolarShield

AI-Powered Solar Planning & Performance Intelligence Platform

SolarShield is an intelligent solar analysis platform developed for a hackathon and educational purposes. It helps owners, residentials and investors evaluate solar feasibility, financial returns, environmental impact, and real-time system performance using Machine Learning and AI.

---

# 🚀 Features

## 🔮 Solar Planner
- ML-based solar system size prediction  
- ROI & payback calculation  
- Government subsidy integration  
- 25-year savings projection  
- Environmental impact estimation (CO₂ reduction)  
- AI-generated investment insights  

## 🛰 Performance Monitor
- Monthly expected vs actual generation comparison  
- Performance efficiency calculation  
- Surplus & deficit detection  
- Financial loss estimation  
- AI-powered improvement suggestions  
- Overperformance detection  

## 🤖 AI Chat Assistant
- Context-aware solar advisory  
- ROI & payback explanation  
- Investment clarity  
- Performance optimization suggestions  

---

# 🏗 Tech Stack

## Frontend
- Next.js  
- TypeScript  
- Tailwind CSS  
- Recharts  

## Backend
- Flask  
- Flask-CORS  
- Joblib  
- Requests  

## AI Engine
- Ollama (Local LLM)  
- Phi Model  

---

# ⚙️ Setup & Installation Guide

## 💻 Frontend Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🧠 Backend Setup

Navigate to backend folder:

```bash
cd ml
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
python server.py
```

Backend runs at:

```
http://localhost:5000
```

---

## 🤖 AI Setup (Ollama Required)

SolarShield uses Ollama for local AI inference.

### Step 1: Install Ollama

Download from:

https://ollama.com

### Step 2: Pull the Model

```bash
ollama pull phi
```

### Step 3: Ensure Ollama is Running

Ollama runs automatically in the background.

---

# 📊 Example Workflow

1. Enter electricity bill and roof size  
2. Get recommended solar system size  
3. View ROI, payback, and 25-year savings  
4. Analyze monthly performance  
5. Chat with AI for deeper insights  

---

# 📁 Project Structure

```
solarshield/
│
├── app/                     # Next.js frontend
├── ml/
│   ├── server.py            # Flask backend
│   ├── model.pkl            # Trained ML model
│   └── requirements.txt     # Python dependencies
├── package.json
└── README.md
```

---
# 📈 Future Improvements

- Seasonal performance normalization  
- Solar panel degradation prediction  
- Net-metering integration  
- Live solar irradiance API integration  
- Cloud deployment (Vercel + Render)  
- Production AI hosting  
- Expansion to corporate solar analysis solutions  
- Dedicated tools for solar panel installers  
- Government-level analytics for subsidy planning and policy support  
- Enterprise dashboard for large-scale solar asset monitoring  

---

# 👨‍💻 Authors

Developed by **Snaha & Sagnik**  
 

---

# 🏆 Project Note

This project was developed for a **Hackathon** and for **educational purposes** to demonstrate the integration of Machine Learning, AI (Ollama), and Full-Stack Web Development in the renewable energy domain.

# 📜 License

This project is built for educational, research, and portfolio purposes only.


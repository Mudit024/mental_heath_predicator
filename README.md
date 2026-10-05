# 🧠 Mental Health Predictor

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A full-stack Machine Learning application designed to assess and predict mental health impact scores for students based on their social media habits, screen time, physical activity, sleep patterns, and academic stress levels.

---

## 🌟 Key Features

- **📊 Comprehensive EDA**: Data preprocessing, feature engineering, and statistical analysis based on real-world student lifestyle metrics.
- **🤖 Machine Learning Model**: Trained pipeline estimating mental health scores on a scale from 1 to 10.
- **⚡ FastAPI REST API**: Asynchronous, high-performance Python backend with Pydantic data validation and CORS support.
- **🎨 Interactive Dashboard**: Modern, responsive React + Vite frontend with real-time score indicators, animated gauges, and personalized feedback.
- **📱 Standalone Web UI**: Alternative Vanilla HTML/CSS/JS frontend included for lightweight deployment.

---

## 🏗️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Machine Learning** | Python, Scikit-Learn, Pandas, NumPy, Joblib |
| **Backend API** | FastAPI, Uvicorn, Pydantic |
| **Frontend UI** | React 18, Vite, Lucide Icons, CSS3 Glassmorphism |
| **Analysis** | Jupyter Notebook, Matplotlib, Seaborn |

---

## 📁 Project Structure

```
Mental Health Predictor/
├── backend/                  # Modular FastAPI backend service
│   ├── app/                  # Core application package (main, predictor, schemas)
│   ├── models/               # Model binaries
│   └── requirements.txt      # Backend dependencies
├── frontend/                 # React + Vite frontend application
│   ├── src/                  # React components & UI styles
│   ├── public/               # Static assets & icons
│   └── package.json          # Frontend packages
├── notebooks/                # Model training & EDA notebooks
├── ML_Project.ipynb          # Exploratory Data Analysis Notebook
├── ML Project.html           # HTML export of data analysis report
├── Mental_Health_Model.pkl   # Serialized Scikit-Learn Model
├── main.py                   # FastAPI server entry point
├── index.html                # Standalone vanilla web interface
├── script.js                 # Standalone frontend logic
├── style.css                 # Standalone UI styling
├── requirements.txt          # Root Python dependencies
└── README.md                 # Project documentation
```

---

## 📊 Dataset & Input Features

The model evaluates **12 key lifestyle & behavioral indicators**:

| Feature | Type | Description / Valid Values |
| :--- | :--- | :--- |
| `age` | Integer | Age of student (10 – 100) |
| `gender` | Categorical | `Male`, `Female` |
| `country` | String | Country of residence (e.g. `India`, `USA`, `Canada`, `UK`, etc.) |
| `academic_level` | Categorical | `High School`, `Undergraduate`, `Graduate` |
| `most_used_platform` | Categorical | `Instagram`, `YouTube`, `TikTok`, `LinkedIn`, `Snapchat`, etc. |
| `purpose_of_use` | Categorical | `Networking`, `Education`, `Entertainment`, `News` |
| `avg_daily_usage_hours` | Float | Screen time per day in hours (0 – 24) |
| `daily_unlocks` | Integer | Phone unlocks per day |
| `study_hours` | Float | Daily study hours (0 – 24) |
| `physical_activity_hours` | Float | Daily exercise/activity in hours (0 – 24) |
| `sleep_hours_per_night` | Float | Sleep duration per night (0 – 24) |
| `stress_level` | Categorical | `Low`, `Medium`, `High`, `Very High` |

---

## 🚀 API Endpoint Documentation

### `POST /predict`

Calculates the mental health score based on user input metrics.

#### **Sample Request Body**
```json
{
  "age": 21,
  "gender": "Female",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_Use": "Entertainment",
  "avg_daily_usage_hours": 4.5,
  "daily_unlocks": 80,
  "study_hours": 6.0,
  "physical_activity_hours": 1.5,
  "sleep_hours_per_night": 7.0,
  "stress_level": "Medium"
}
```

#### **Sample Response**
```json
{
  "predicted_mental_health_score": 7.42
}
```

---

## 💻 Local Setup & Installation

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/Mudit024/mental_heath_predicator.git
cd mental_heath_predicator

# Create & activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload --port 8000
```
*API interactive documentation will be available at `http://localhost:8000/docs`.*

### 2. Frontend Setup (React App)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```
*Open `http://localhost:5173` in your browser to view the interactive application.*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/Mudit024/mental_heath_predicator/issues).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

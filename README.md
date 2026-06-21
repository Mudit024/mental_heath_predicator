# Mental Health Predictor

A Machine Learning powered web application that assesses mental health impact based on student social media usage and lifestyle metrics.

## Features
- **Exploratory Data Analysis (EDA)** on student lifestyle & mental health data.
- **Machine Learning Model** trained to predict mental health impact scores.
- **FastAPI Backend Service** providing REST endpoints for predictions.
- **Modern Interactive UI** (Vanilla Web & React Vite Frontend) for interactive assessment.

## Project Structure
```
Mental Health Predictor/
├── backend/            # FastAPI Backend Service
├── frontend/           # React + Vite Frontend Application
├── notebooks/          # Data Preprocessing & Model Training Notebooks
├── main.py             # Backend server entry point
├── script.js           # Frontend script logic
├── style.css           # Custom styling
└── requirements.txt    # Python dependencies
```

## Setup & Running
1. **Backend**:
   ```bash
   pip install -r requirements.txt
   python main.py
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

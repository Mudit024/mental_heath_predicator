# Student Wellness Analytics — Backend API

Modular FastAPI backend for predicting student mental health score using trained scikit-learn pipeline models.

## Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py       # Configuration & model paths
│   ├── main.py         # FastAPI routes & CORS setup
│   ├── predictor.py    # Model inference engine
│   └── schemas.py      # Pydantic data schemas
├── data/
│   └── Student Social Media And Mental Health Impact.csv
├── models/
│   └── Mental_Health_Model.pkl
├── requirements.txt
└── README.md
```

## Setup & Running

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Server**
   ```bash
   uvicorn backend.app.main:app --reload --port 8000
   ```
   Or execute directly:
   ```bash
   python -m backend.app.main
   ```

3. **API Documentation**
   Open your browser at `http://localhost:8000/docs` to test endpoints via Swagger UI.

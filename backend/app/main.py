import sys
from pathlib import Path

# Add backend directory to sys.path to allow both relative and direct package execution
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir.parent))

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from backend.app.schemas import StudentData, PredictionResponse, HealthCheckResponse
from backend.app.predictor import MentalHealthPredictor
from backend.app.config import ALLOWED_ORIGINS

app = FastAPI(
    title="Student Mental Health Signal API",
    description="Machine Learning API for predicting student mental health score based on digital habits and lifestyle.",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Predictor Engine
try:
    predictor = MentalHealthPredictor()
except Exception as e:
    predictor = None
    print(f"Warning: Failed to load model on startup: {e}")

@app.get('/', response_model=dict)
def root():
    return {
        "message": "Welcome to Student Wellness Analytics API",
        "docs": "/docs",
        "health": "/health"
    }

@app.get('/health', response_model=HealthCheckResponse)
def health_check():
    return HealthCheckResponse(
        status="healthy" if predictor and predictor.model else "degraded",
        model_loaded=predictor is not None and predictor.model is not None
    )

@app.post('/predict', response_model=PredictionResponse)
def predict_score(data: StudentData):
    if not predictor or not predictor.model:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Prediction model is not initialized."
        )
    try:
        score = predictor.predict(data)
        return PredictionResponse(predicted_mental_health_score=score)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference error: {str(err)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)

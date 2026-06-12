import joblib
import pandas as pd
import logging
from pathlib import Path
from backend.app.config import MODEL_PATH, ROOT_MODEL_PATH, TOP_COUNTRIES
from backend.app.schemas import StudentData

logger = logging.getLogger(__name__)

class MentalHealthPredictor:
    def __init__(self, model_path: Path = MODEL_PATH):
        self.model_path = model_path
        self.model = None
        self.load_model()

    def load_model(self):
        target_path = self.model_path if self.model_path.exists() else ROOT_MODEL_PATH
        if not target_path.exists():
            logger.error(f"Model file not found at {self.model_path} or {ROOT_MODEL_PATH}")
            raise FileNotFoundError(f"Model file missing at {target_path}")
        
        logger.info(f"Loading ML model from {target_path}...")
        self.model = joblib.load(target_path)
        logger.info("Model loaded successfully.")

    def predict(self, data: StudentData) -> float:
        if self.model is None:
            raise RuntimeError("Model is not loaded.")

        country_group = data.country if data.country in TOP_COUNTRIES else "Other"

        input_df = pd.DataFrame([{
            'Age': data.age,
            'Gender': data.gender,
            'Country': data.country,
            'Academic_Level': data.academic_level,
            'Most_Used_Platform': data.most_used_platform,
            'Purpose_Of_Use': data.purpose_of_use,
            'Avg_Daily_Usage_Hours': data.avg_daily_usage_hours,
            'Daily_Unlocks': data.daily_unlocks,
            'Study_Hours': data.study_hours,
            'Physical_Activity_Hours': data.physical_activity_hours,
            'Sleep_Hours_Per_Night': data.sleep_hours_per_night,
            'Stress_Level': data.stress_level,
            'Grouped_country': country_group
        }])

        raw_prediction = self.model.predict(input_df)[0]
        return round(float(raw_prediction), 2)

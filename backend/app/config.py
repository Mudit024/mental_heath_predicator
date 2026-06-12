import os
from pathlib import Path

# Base directory for the backend package
BASE_DIR = Path(__file__).resolve().parent.parent

# Model and Data Paths
MODEL_PATH = BASE_DIR / "models" / "Mental_Health_Model.pkl"
DATA_PATH = BASE_DIR / "data" / "Student Social Media And Mental Health Impact.csv"

# Fallback path to root model file if backend/models is not populated
ROOT_MODEL_PATH = BASE_DIR.parent / "Mental_Health_Model.pkl"

# Top countries recognized by the trained ML pipeline
TOP_COUNTRIES = [
    'Other', 'India', 'USA', 'Canada', 'Australia', 
    'UK', 'Germany', 'Mexico', 'Turkey', 'France'
]

# CORS configuration
ALLOWED_ORIGINS = ["*"]

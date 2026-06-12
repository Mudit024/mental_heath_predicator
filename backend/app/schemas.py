from pydantic import BaseModel, Field
from typing import Literal

class StudentData(BaseModel):
    age: int = Field(..., ge=10, le=100, description="Age of the student (10 to 100)")
    gender: Literal['Male', 'Female']
    country: str = Field(..., min_length=1, description="Country of origin")
    academic_level: Literal['Undergraduate', 'Graduate', 'High School']
    most_used_platform: Literal[
        'Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter',
        'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat'
    ]
    purpose_of_use: Literal['Networking', 'Education', 'Entertainment', 'News']
    avg_daily_usage_hours: float = Field(..., ge=0.0, le=24.0, description="Average daily social media usage in hours")
    daily_unlocks: int = Field(..., ge=0, description="Number of daily phone unlocks")
    study_hours: float = Field(..., ge=0.0, le=24.0, description="Daily study hours")
    physical_activity_hours: float = Field(..., ge=0.0, le=24.0, description="Daily physical activity in hours")
    sleep_hours_per_night: float = Field(..., ge=0.0, le=24.0, description="Sleep hours per night")
    stress_level: Literal['Low', 'Medium', 'High', 'Very High']

class PredictionResponse(BaseModel):
    predicted_mental_health_score: float = Field(..., description="Predicted score from 0.0 to 10.0")

class HealthCheckResponse(BaseModel):
    status: str
    model_loaded: bool
    version: str = "1.0.0"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import joblib
import pandas as pd


# =========================
# Create FastAPI App
# =========================

app = FastAPI()


# =========================
# CORS Configuration
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Load ML Model and Scaler
# =========================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = (BASE_DIR / "../models/model.pkl").resolve()
SCALER_PATH = (BASE_DIR / "../models/scaler.pkl").resolve()

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


# =========================
# Home Route
# =========================

@app.get("/")
def home():
    return {
        "message": "Smart Urban Intelligence API Running"
    }


# =========================
# Prediction Route
# =========================

@app.post("/predict")
def predict(data: dict):

    df = pd.DataFrame(
        [[
            data["hour"],
            data["day"],
            data["month"],
            data["weekday"],
            data["aqi"],
            data["temp"],
            data["humidity"],
            data["windspeed"]
        ]],
        columns=[
            "hour",
            "day",
            "month",
            "weekday",
            "aqi_value",
            "temperature",
            "humidity",
            "windspeed"
        ]
    )

    # Scale input data
    df_scaled = scaler.transform(df)

    # Make prediction
    result = model.predict(df_scaled)[0]

    return {
        "prediction": float(result)
    }
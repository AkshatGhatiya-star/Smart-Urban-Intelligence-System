from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("models/model.pkl")
scaler = joblib.load("models/scaler.pkl")

@app.get("/")
def home():
    return {"message": "API Running"}

@app.post("/predict")
def predict(data: dict):
    df = pd.DataFrame([[
        data['hour'],
        data['day'],
        data['month'],
        data['weekday'],
        data['aqi'],
        data['temp'],
        data['humidity'],
        data['windspeed']
    ]], columns=[
        'hour','day','month','weekday',
        'aqi_value','temperature','humidity','windspeed'
    ])

    df_scaled = scaler.transform(df)
    result = model.predict(df_scaled)[0]

    return {"prediction": float(result)}
import streamlit as st
import joblib
import pandas as pd
import matplotlib.pyplot as plt

# -------------------------------
# Load model and scaler
# -------------------------------
model = joblib.load("models/model.pkl")
scaler = joblib.load("models/scaler.pkl")

# -------------------------------
# Prediction function
# -------------------------------
def predict(hour, day, month, weekday, aqi, temp, humidity, windspeed):
    data = pd.DataFrame([[
        hour, day, month, weekday, aqi, temp, humidity, windspeed
    ]], columns=[
        'hour', 'day', 'month', 'weekday',
        'aqi_value', 'temperature', 'humidity', 'windspeed'
    ])

    # Apply scaling
    data_scaled = scaler.transform(data)

    return model.predict(data_scaled)[0]

# -------------------------------
# Area classification
# -------------------------------
def classify(consumption, aqi):
    score = consumption / (aqi + 1)

    if score > 200:
        return "🌟 Premium Investment Area"
    elif score > 100:
        return "🏗️ Developing Area"
    else:
        return "⚠️ Low Growth Area"

# -------------------------------
# UI Design
# -------------------------------
st.set_page_config(page_title="Smart Urban System", layout="wide")

st.markdown("# 🌆 Smart Urban Intelligence Dashboard")
st.markdown("### Energy Prediction + AQI Analysis")

# Layout
col1, col2 = st.columns(2)

with col1:
    hour = st.slider("Hour", 0, 23)
    day = st.slider("Day", 1, 31)
    month = st.slider("Month", 1, 12)
    weekday = st.slider("Weekday (0=Mon, 6=Sun)", 0, 6)

with col2:
    aqi = st.number_input("AQI Value", min_value=0)
    temp = st.number_input("Temperature", value=25.0)
    humidity = st.number_input("Humidity", value=50.0)
    windspeed = st.number_input("Wind Speed", value=3.0)

# -------------------------------
# Prediction Button
# -------------------------------
if st.button("Predict"):
    result = predict(hour, day, month, weekday, aqi, temp, humidity, windspeed)
    area = classify(result, aqi)

    st.success(f"⚡ Predicted Energy Consumption: {result:.2f}")
    st.info(f"🏙️ Area Type: {area}")

    # -------------------------------
    # Visualization
    # -------------------------------
    st.subheader("📊 Prediction Visualization")

    fig, ax = plt.subplots()
    ax.bar(["Predicted Energy"], [result])
    ax.set_ylabel("Energy Consumption")

    st.pyplot(fig)

# -------------------------------
# Footer
# -------------------------------
st.markdown("---")
st.markdown("📌 Model: Random Forest | Features: Time + AQI + Weather")
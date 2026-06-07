import pandas as pd

def load_and_process():
    # Load datasets
    energy = pd.read_csv("data/powerconsumption.csv")
    aqi = pd.read_csv("data/aqi.csv")

    # -------------------------------
    # 1. Convert datetime
    # -------------------------------
    energy['Datetime'] = pd.to_datetime(energy['Datetime'], errors='coerce')
    aqi['date'] = pd.to_datetime(aqi['date'], dayfirst=True, errors='coerce')

    # -------------------------------
    # 2. Drop invalid rows
    # -------------------------------
    energy.dropna(subset=['Datetime'], inplace=True)
    aqi.dropna(subset=['aqi_value'], inplace=True)

    # -------------------------------
    # 3. Time-based features
    # -------------------------------
    energy['hour'] = energy['Datetime'].dt.hour
    energy['day'] = energy['Datetime'].dt.day
    energy['month'] = energy['Datetime'].dt.month
    energy['weekday'] = energy['Datetime'].dt.weekday

    # -------------------------------
    # 4. Environmental features
    # -------------------------------
    energy['temperature'] = energy['Temperature']
    energy['humidity'] = energy['Humidity']
    energy['windspeed'] = energy['WindSpeed']

    # Fill missing environmental values
    energy[['temperature', 'humidity', 'windspeed']] = (
        energy[['temperature', 'humidity', 'windspeed']]
        .fillna(method='ffill')
        .fillna(method='bfill')
    )

    # -------------------------------
    # 5. AQI feature (average)
    # -------------------------------
    avg_aqi = aqi['aqi_value'].mean()
    energy['aqi_value'] = avg_aqi

    # -------------------------------
    # 6. Remove outliers (optional but good)
    # -------------------------------
    energy = energy[energy['PowerConsumption_Zone3'] > 0]

    # -------------------------------
    # 7. Final dataset selection
    # -------------------------------
    df = energy[[
        'hour',
        'day',
        'month',
        'weekday',
        'aqi_value',
        'temperature',
        'humidity',
        'windspeed',
        'PowerConsumption_Zone3'
    ]]

    return df
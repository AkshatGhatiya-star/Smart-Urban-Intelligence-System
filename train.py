from preprocess import load_and_process
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import StandardScaler
import joblib

# -------------------------------
# 1. Load processed data
# -------------------------------
df = load_and_process()

print("Dataset shape:", df.shape)

if df.shape[0] == 0:
    print("❌ Error: No data available after preprocessing")
    exit()

# -------------------------------
# 2. Features and Target
# -------------------------------
X = df[[
    'hour',
    'day',
    'month',
    'weekday',
    'aqi_value',
    'temperature',
    'humidity',
    'windspeed'
]]

y = df['PowerConsumption_Zone3']

# -------------------------------
# 3. Train-Test Split
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------------------------------
# 4. Feature Scaling (Pro Step)
# -------------------------------
scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# -------------------------------
# 5. Model Training
# -------------------------------
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# -------------------------------
# 6. Evaluation
# -------------------------------
y_pred = model.predict(X_test)

error = mean_absolute_error(y_test, y_pred)
print(f"📊 Mean Absolute Error: {error:.2f}")

# -------------------------------
# 7. Save model & scaler
# -------------------------------
joblib.dump(model, "models/model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("✅ Model Trained Successfully")
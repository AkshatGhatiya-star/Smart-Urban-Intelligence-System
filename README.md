# 🏙️ Smart Urban Intelligence System

An AI-powered command center engineered for real-time urban monitoring, energy consumption forecasting, and strategic city planning. This system utilizes a high-performance Machine Learning backend paired with an intuitive data visualization interface to transform complex environmental telemetry into actionable urban insights.

---

## 📊 Project Overview
The **Smart Urban Intelligence System** ingests critical environmental, spatial, and temporal parameters to predict energy loads (kWh) and classify urban sectors. By processing live data streams, it assists city administrators in transitioning from reactive resource allocation to proactive, data-driven planning.

### **Core Capabilities:**
* **Predictive ML Engine:** Live energy load forecasting using an asynchronous FastAPI service layer.
* **5-Tier Urban Zonal Classification:** Automatically categorizes city regions into tactical zones based on localized sensor parameters (e.g., *Elite Smart Zone*, *Industrial Sector*, *Developing Zone*).
* **Advanced Data Visualization:** Dynamic analytics dashboards featuring multivariate radar metrics and long-term intelligence forecasting.

---

## 🔄 System Architecture & Data Flow

[Raw Data Inputs] ──> [FastAPI Backend / Pandas] ──> [Scikit-Learn ML Model] ──> [React Frontend Dashboards]
(CSV Telemetry)       (Data Transformation)       (Load Prediction & Class)      (Interactive Charts)


### **Quick Input-Output Pipeline Matrix:**
The table below represents how the processing core handles localized datasets:

| S.No | Input (Data Source) | Processed Parameter | Output Dashboard Result | Zonal Analytics Status |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `aqi.csv` | Air Quality & Emissions | Environmental Line Chart | **Tracking Normal** |
| **02** | `powerconsumption.csv` | Grid Telemetry (kWh) | Load Forecast Analytics | **Peak Efficiency: 92%** |
| **03** | Sensor Arrays | Real-time Weather/Temp | Multivariate Radar Map | **System Optimization Active** |
| **04** | Core Features | Combined Matrix | Model Variant Evaluation | **Zonal Classification Engine Live** |

---

## 📂 Data, Model & Assets Access
To keep the codebase lightweight, clean, and fully optimized for version control, all heavy binaries, large tabular datasets, and documentation assets are hosted externally on Google Drive. 

Before running the application locally, download these files and place them into your project root directory:

| File Name | Description | Download Link |
| :--- | :--- | :--- |
| 🧠 **model.pkl** | Trained Machine Learning Model Weights (361.17 MB) | [Download Model Weights](https://drive.google.com/file/d/1hLeCpZ5_Cr1oD_m5M4xzwVwiqtAjrI8V/view?usp=sharing) |
| 📈 **aqi.csv** | Environmental Baseline Training Dataset | [Download Environmental Data](https://drive.google.com/file/d/1ihCq_RBQkR0V-_377rTbY7UcV75TYo_t/view?usp=sharing) |
| 📊 **powerconsumption.csv** | Power Consumption Tracking Metrics | [Download Power Data](https://drive.google.com/file/d/1FSZqx13UrabQH3G2sLDtHrWBjuPmbeB-/view?usp=sharing) |

---

## 🛠️ System Tech Stack

### **Frontend Interface Client**
* **Framework:** React.js
* **Styling:** Tailwind CSS (Responsive Utility Architecture)
* **Data Visualization:** Recharts Engine (Interactive Analytics Layouts)
* **API Client:** Axios

### **Backend Module & Machine Learning Engine**
* **Core Runtime:** Python 3.11
* **Web Framework:** FastAPI (Asynchronous ASGI Architecture)
* **Data Processing:** Pandas & NumPy
* **ML Framework:** Scikit-Learn

---

## ⚙️ Local Installation & Deployment

### **1. Clone the Application Repository**
```bash
git clone [https://github.com/AkshatGhatiya-star/Smart-Urban-Intelligence-System.git](https://github.com/AkshatGhatiya-star/Smart-Urban-Intelligence-System.git)
cd Smart-Urban-Intelligence-System
2. Environment Dependency Configuration
For the FastAPI Backend Server:

Bash
cd backend
python -m venv venv
# Activate the virtual environment (Windows PowerShell)
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
For the React Frontend Client:

Bash
# Navigate to the frontend workspace directory
cd ../frontend
npm install
3. Strategic File Placement
Ensure your downloaded model.pkl, aqi.csv, and powerconsumption.csv files are saved directly inside the backend folder where the server execution contexts can find them.

4. Execution Execution Commands
Launch Backend API Server:

Bash
uvicorn main:app --reload
Launch Frontend Development Client:

Bash
npm run dev

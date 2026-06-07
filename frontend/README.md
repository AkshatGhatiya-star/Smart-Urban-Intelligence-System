# 🏙️ Smart Urban Intelligence System

An AI-powered command center designed for real-time urban monitoring, energy consumption forecasting, and strategic city planning. This system utilizes a Machine Learning backend to transform environmental data into actionable urban insights.

## 📊 Project Overview
The **Smart Urban Intelligence System** ingests 8 key environmental and temporal parameters to predict energy loads (kWh) and classify urban zones into five distinct categories. It provides a visual analytics dashboard to help city administrators move from reactive to proactive resource management.

## 📂 Data, Model & Assets Access
Due to GitHub's file size limitations, heavy files are hosted externally. Please download these and place them in your local project directory as needed:

| File | Description | Download Link |
| :--- | :--- | :--- |
| **model.pkl** | Trained ML Model Weights | [Download Model](https://drive.google.com/file/d/1hLeCpZ5_Cr1oD_m5M4xzwVwiqtAjrI8V/view?usp=sharing) |
| **aqi.csv** | Environmental Dataset | [Download Dataset](https://drive.google.com/file/d/1ihCq_RBQkR0V-_377rTbY7UcV75TYo_t/view?usp=sharing) |
| **Project Assets** | Additional Project Documentation/Assets | [Download Assets](https://drive.google.com/file/d/1FSZqx13UrabQH3G2sLDtHrWBjuPmbeB-/view?usp=sharing) |

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Recharts
- **Backend:** Python, FastAPI
- **ML Engine:** Scikit-Learn

## ⚙️ Installation & Setup
1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/AkshatGhatiya-star/Smart-Urban-Intelligence-System.git](https://github.com/AkshatGhatiya-star/Smart-Urban-Intelligence-System.git)


2. Add Large Files: Place the downloaded model.pkl and aqi.csv into the root directory.

3. Install Dependencies:

Frontend: npm install

Backend: pip install -r requirements.txt


---

### **Step 2: The Final Upload Steps (To fix the Large File Error)**

You must follow these steps to "wipe" the 361 MB file from Git's memory.

#### **1. Delete the hidden `.git` folder**
Open your project folder `E:\smart-urban-ml` in Windows File Explorer. Delete the hidden folder named **`.git`**. This is necessary to clear the "rejected" history.

#### **2. Ensure your `.gitignore` is correct**
Make sure a file named `.gitignore` exists in your root folder with these lines:
```text
model.pkl
aqi.csv
node_modules/
venv/
.venv/
__pycache__/
*.dll
*.node
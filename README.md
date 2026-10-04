# Chikitsak AI (चिकित्सक AI)
> **AI-powered symptom analysis and explanation.**

A modern, responsive, clinical-grade healthcare web application designed to help patients understand complex health symptoms through machine learning pattern recognition and clear, empathetic generative AI explanations.

---

## 🏥 Architecture Overview

Chikitsak AI implements a decoupled **Dual-Engine Architecture**:

```
                       USER
                        │
                        ▼
           [ Modern Responsive Frontend ]
            (HTML5 / CSS3 / Vanilla JS)
                        │
                        ▼  POST /predict (JSON)
           [ Python API Server (Flask) ]
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
[ ML Prediction Engine ]       [ Gemini Explainer Engine ]
  • Scikit-Learn SVM Pipeline    • Google Gemini 3.8 Flash
  • 132 Clinical Biomarkers      • Strict Clinical Guardrails
  • 41 Prognosis Classes         • Patient-Friendly Translation
  • Trained on Clinical Data     • Zero-Prescription Mandate
        │                               │
        └───────────────┬───────────────┘
                        ▼
       [ Structured Assessment Response ]
                        │
                        ▼
       [ Interactive Results & Report ]
```

### 1. Supervised Machine Learning Engine (SVM)
* **Model Type**: Support Vector Machine (RBF kernel inside a Scikit-Learn Pipeline, loaded from `Final_model.pkl`).
* **Input Features**: Exactly **132 clinical symptom features** encoded into binary presence indicators (`1` for affirmative, `0` for absent).
* **Target Classes**: 41 distinct medical conditions and prognoses.
* **Integrity**: Real statistical inference executed locally in Python. No mocked predictions or hardcoded disease maps.

### 2. Generative AI Explainer (Google Gemini 3.8 Flash)
* **SDK**: `google-genai` Python SDK (`from google import genai`).
* **Role**: **Explanation Only**. Gemini strictly translates the ML model's prediction into everyday, compassionate patient terminology. Gemini is barred from independently diagnosing or altering the statistical outcome.
* **Safety Mandate**:
  1. Never diagnose or claim medical certainty.
  2. Never prescribe medications or specific drug dosages.
  3. Clearly emphasize that predictions are statistical estimates, not clinical diagnoses.
  4. Always instruct patients to seek professional medical care.

---

## 🎨 UI/UX Features & Design Direction

* **Visual Aesthetic**: Clean, minimalist, trustworthy healthcare interface utilizing a calm palette of Deep Obsidian Navy (`#0b192c`), Medical Azure (`#0284c7`), Mint Teal (`#0d9488`), and Ice Blue (`#f0f9ff`).
* **Targeted Questioning**: Patients select from 16 intuitive health categories (Skin, Respiratory, Neurological, Digestive, etc.) rather than confronting all 132 technical features simultaneously.
* **Patient-Friendly Lexicon**: Technical column identifiers (e.g. `extra_marital_contacts`, `toxic_look_(typhos)`) are transformed into compassionate, clinical inquiries (e.g., *"History of multiple sexual partners"*, *"Severely sick or flushed appearance"*).
* **3-Step Assessment Flow**:
  1. **Category Selection**: Interactive cards with search filtering and multi-category selection.
  2. **Symptom Screening**: Yes/No toggle cards with accessible tap targets and clinical context questions.
  3. **Review & Confirmation**: Full summary of reported affirmative symptoms with instant modification options.
* **Dynamic Analysis Loader**: Multi-phase telemetry animation that visually explains the ML inference and Gemini formulation phases.
* **Executive Results View**:
  * Prominent **Possible Condition** card with an unambiguous *"AI Prediction — Not a Confirmed Diagnosis"* badge.
  * 5 structured explanation modules:
    * **Possible Condition**
    * **What It Means**
    * **Why The AI Predicted This**
    * **What You Should Know**
    * **Important Notice**
  * Emergency alert banner.
  * Print-ready stylesheet for saving reports or taking them to a clinic.

---

## 📁 Project Structure

```
Minor Project/
├── app.py                      # Flask API server & static frontend hosting
├── Final_model.pkl             # Trained Scikit-Learn SVM Pipeline model
├── Training.xlsx               # Source dataset containing the 132 features
├── .env                        # Local secrets (GEMINI_API_KEY, PORT)
├── .env.example                # Template for environment configuration
├── .gitignore                  # Git privacy rules
│
├── backend/
│   ├── __init__.py             # Backend package declaration
│   ├── ml_engine.py            # SVM model loader and predictor
│   ├── gemini_engine.py        # Gemini 3.8 Flash interaction & retry handler
│   └── symptom_data.py         # 132-feature metadata, questions & categories
│
└── frontend/
    ├── index.html              # Responsive single-page application
    ├── css/
    │   └── style.css           # Healthcare design system & print styles
    └── js/
        ├── data.js             # Client category & question registry
        ├── api.js              # Modular backend communication service
        └── app.js              # Application state machine & rendering
```

---

## 🚀 Running the Application

### 1. Requirements
* Python 3.10+
* Packages: `flask`, `flask-cors`, `scikit-learn`, `joblib`, `pandas`, `google-genai`, `python-dotenv`

### 2. Environment Setup
Configure your Google Gemini API Key in `.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
HOST=0.0.0.0
```

### 3. Start the Server
Run the unified Flask application:
```bash
python app.py
```

Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 🔌 API Reference

### 1. Symptom Prediction & Explanation
* **Route**: `POST /predict` (also available at `POST /api/predict`)
* **Headers**: `Content-Type: application/json`

**Sample Request**:
```json
{
  "symptoms": {
    "itching": 1,
    "skin_rash": 1,
    "nodal_skin_eruptions": 1,
    "family_history": 0
  }
}
```

**Sample Response**:
```json
{
  "prediction": "Fungal infection",
  "reported_symptoms": [
    "Skin Itching",
    "Skin Rash",
    "Nodal Skin Eruptions"
  ],
  "reported_keys": [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions"
  ],
  "explanation": {
    "possible_condition": "Fungal infection",
    "what_it_means": "A fungal infection of the skin happens when microscopic fungi grow more than usual or enter through small breaks in the skin...",
    "why_ai_predicted_this": "The computer model analyzed the specific combination of symptoms you reported...",
    "what_you_should_know": "Keep the skin clean and dry, avoid scratching, and consult a doctor...",
    "important_notice": "This result is an AI-generated statistical prediction, not a confirmed medical diagnosis..."
  },
  "disclaimer": "AI-generated statistical prediction. Not a confirmed medical diagnosis.",
  "meta": {
    "features_analyzed": 132,
    "symptoms_reported_count": 3
  }
}
```

### 2. Service Health Status
* **Route**: `GET /api/health`
* **Response**:
```json
{
  "app_name": "Chikitsak AI",
  "gemini_engine": {
    "model": "gemini-3.8-flash",
    "ready": true
  },
  "ml_engine": {
    "model_type": "Support Vector Machine (SVM Pipeline)",
    "ready": true,
    "total_features": 132
  },
  "status": "healthy",
  "tagline": "AI-powered symptom analysis and explanation"
}
```

### 3. Categories & Question Metadata
* **Route**: `GET /api/categories`
* **Route**: `GET /api/symptoms`

---

## 🔒 Medical & Ethical Disclaimer

**Chikitsak AI** is developed solely for educational and preliminary health literacy purposes. The statistical classifications generated by the underlying Support Vector Machine model do not constitute formal medical evaluations, diagnostic opinions, or prescriptions. Patients experiencing acute, severe, or worsening symptoms must seek immediate evaluation from a certified medical doctor or emergency services.

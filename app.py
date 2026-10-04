"""
Chikitsak AI - Production Web API Server
Flask application integrating SVM Machine Learning model and Google Gemini AI.
Serves both REST API endpoints and responsive frontend web application.
"""

import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Ensure parent directory is on python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.ml_engine import ml_engine
from backend.gemini_engine import gemini_engine
from backend.symptom_data import CATEGORIES, COMMON_QUESTIONS, SYMPTOM_DETAILS, FEATURE_COLUMNS

FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)  # Enable Cross-Origin Resource Sharing for modern decoupled frontends

# -----------------
# API ENDPOINTS
# -----------------

@app.route("/api/health", methods=["GET"])
def health_check():
    """Returns real-time operational status of ML and Gemini services."""
    return jsonify({
        "status": "healthy",
        "app_name": "Chikitsak AI",
        "tagline": "AI-powered symptom analysis and explanation",
        "ml_engine": {
            "ready": ml_engine.is_ready(),
            "model_type": "Support Vector Machine (SVM Pipeline)",
            "total_features": len(FEATURE_COLUMNS)
        },
        "gemini_engine": {
            "ready": gemini_engine.is_ready(),
            "model": "gemini-flash-lite-latest"
        }
    }), 200

@app.route("/api/categories", methods=["GET"])
def get_categories():
    """Returns available symptom categories, icons, and questions."""
    return jsonify({
        "categories": CATEGORIES,
        "common_questions": COMMON_QUESTIONS
    }), 200

@app.route("/api/symptoms", methods=["GET"])
def get_symptoms():
    """Returns comprehensive dictionary of all 132 features with clinical descriptions."""
    return jsonify({
        "features": FEATURE_COLUMNS,
        "details": SYMPTOM_DETAILS
    }), 200

@app.route("/predict", methods=["POST"])
@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Main prediction endpoint.
    Expects JSON payload:
    {
        "symptoms": {
            "itching": 1,
            "skin_rash": 0,
            "red_spots_over_body": 1
        }
    }
    """
    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({
                "error": "Invalid request: JSON payload is required.",
                "example": {
                    "symptoms": {"itching": 1, "skin_rash": 1}
                }
            }), 400

        symptoms = data.get("symptoms", {})
        if not isinstance(symptoms, dict) or not symptoms:
            return jsonify({
                "error": "Missing or invalid 'symptoms' dictionary in request payload.",
                "message": "Please provide symptom answers with keys matching clinical features."
            }), 400

        # Step 1: Run Machine Learning model prediction
        try:
            ml_result = ml_engine.predict(symptoms)
        except ValueError as ve:
            return jsonify({
                "error": str(ve),
                "message": "At least one positive symptom (value: 1) is required to run assessment."
            }), 422

        predicted_condition = ml_result["prediction"]
        reported_symptoms = ml_result["reported_symptoms"]
        reported_keys = ml_result["reported_keys"]

        # Step 2: Generate Gemini AI patient-friendly explanation
        explanation = gemini_engine.generate_explanation(
            predicted_condition=predicted_condition,
            reported_symptoms=reported_symptoms
        )

        # Step 3: Format and return consolidated response
        response_payload = {
            "prediction": predicted_condition,
            "reported_symptoms": reported_symptoms,
            "reported_keys": reported_keys,
            "explanation": {
                "possible_condition": explanation.get("possible_condition", predicted_condition),
                "what_it_means": explanation.get("what_it_means", ""),
                "why_ai_predicted_this": explanation.get("why_ai_predicted_this", ""),
                "what_you_should_know": explanation.get("what_you_should_know", ""),
                "important_notice": explanation.get("important_notice", "")
            },
            "disclaimer": "AI-generated statistical prediction. Not a confirmed medical diagnosis.",
            "meta": {
                "features_analyzed": len(FEATURE_COLUMNS),
                "symptoms_reported_count": len(reported_keys)
            }
        }

        return jsonify(response_payload), 200

    except Exception as e:
        print(f"Error in /predict endpoint: {e}")
        return jsonify({
            "error": "Internal assessment processing error.",
            "details": str(e)
        }), 500

# -----------------
# FRONTEND STATIC ROUTES
# -----------------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    """Serves the responsive single-page web app and static assets."""
    if path != "" and os.path.exists(os.path.join(FRONTEND_DIR, path)):
        return send_from_directory(FRONTEND_DIR, path)
    return send_from_directory(FRONTEND_DIR, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    host = os.environ.get("HOST", "0.0.0.0")
    print(f"Starting Chikitsak AI server on http://127.0.0.1:{port}")
    app.run(host=host, port=port, debug=False)

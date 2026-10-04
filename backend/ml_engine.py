"""
Chikitsak AI - Machine Learning Prediction Engine
Loads the trained SVM pipeline model and executes predictions on 132 features.
"""

import os
import joblib
import numpy as np
from backend.symptom_data import FEATURE_COLUMNS, SYMPTOM_DETAILS

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "Final_model.pkl")

class MLEngine:
    def __init__(self, model_path=MODEL_PATH):
        self.model_path = model_path
        self.model = None
        self.load_model()

    def load_model(self):
        """Loads the pre-trained SVM pipeline."""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model file not found at {self.model_path}")
        try:
            self.model = joblib.load(self.model_path)
            print(f"ML Engine: Successfully loaded model from {self.model_path}")
        except Exception as e:
            print(f"ML Engine Error: Failed to load model: {e}")
            raise e

    def is_ready(self) -> bool:
        """Returns True if the ML model is initialized and ready."""
        return self.model is not None

    def predict(self, symptoms_input: dict):
        """
        Executes prediction using the trained SVM model.
        
        Args:
            symptoms_input (dict): Mapping of symptom key -> 1 (Yes) or 0 (No).
            
        Returns:
            dict: {
                "prediction": str,
                "reported_symptoms": list of friendly symptom names,
                "reported_keys": list of raw feature keys,
                "feature_count": int (count of reported symptoms)
            }
        """
        if not self.model:
            raise RuntimeError("ML model is not loaded.")

        if not isinstance(symptoms_input, dict):
            raise ValueError("Invalid symptoms payload: expected a dictionary.")

        # Build 132-dimension feature vector strictly aligned with training columns
        feature_vector = [0] * len(FEATURE_COLUMNS)
        reported_keys = []
        reported_symptoms = []

        for key, value in symptoms_input.items():
            # Standardize key (strip, clean)
            clean_key = str(key).strip()
            
            # Check if affirmative
            is_affirmative = False
            if isinstance(value, (int, float)) and value == 1:
                is_affirmative = True
            elif isinstance(value, str) and value.strip().lower() in ("1", "yes", "true"):
                is_affirmative = True
            elif isinstance(value, bool) and value is True:
                is_affirmative = True

            if is_affirmative:
                if clean_key in FEATURE_COLUMNS:
                    idx = FEATURE_COLUMNS.index(clean_key)
                    feature_vector[idx] = 1
                    reported_keys.append(clean_key)
                    # Friendly title or fallback to readable string
                    detail = SYMPTOM_DETAILS.get(clean_key)
                    friendly_name = detail["title"] if detail else clean_key.replace("_", " ").title()
                    reported_symptoms.append(friendly_name)

        if len(reported_keys) == 0:
            raise ValueError("No affirmative symptoms reported. Please select at least one symptom.")

        import pandas as pd
        input_df = pd.DataFrame([feature_vector], columns=FEATURE_COLUMNS)

        # Execute prediction with the SVM model
        prediction_result = self.model.predict(input_df)
        
        # Handle string or array output
        if isinstance(prediction_result, (list, np.ndarray)):
            predicted_condition = str(prediction_result[0]).strip()
        else:
            predicted_condition = str(prediction_result).strip()

        return {
            "prediction": predicted_condition,
            "reported_symptoms": reported_symptoms,
            "reported_keys": reported_keys,
            "feature_count": len(reported_keys)
        }

# Singleton instance
ml_engine = MLEngine()

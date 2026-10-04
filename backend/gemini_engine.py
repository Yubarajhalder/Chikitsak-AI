"""
Chikitsak AI - Gemini Explanation Engine
Communicates with Google Gemini API to translate ML predictions into
empathetic, structured, patient-friendly explanations without independent diagnosis.
"""

import os
import re
import time
import concurrent.futures
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

SYSTEM_PROMPT = """
You are Chikitsak AI, a helpful, cautious, and empathetic healthcare explanation assistant.
Your job is strictly to explain a machine learning model's prediction to a patient in simple, everyday language.

Rules you MUST follow:
1. Do NOT independently diagnose the user or claim certainty.
2. Never prescribe medications or specific drug dosages.
3. Clearly state that this is an AI-generated statistical prediction, not a confirmed medical diagnosis.
4. Structure your response under these exact headings:
   - Possible Condition:
   - What It Means:
   - Why The AI Predicted This:
   - What You Should Know:
   - Important Notice:
"""

DEFAULT_DEV_KEY = ""

class GeminiEngine:
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY", "")
        self.client = None
        self._init_client()

    def _init_client(self):
        """Initializes the google-genai client."""
        if not self.api_key:
            print("Gemini Engine: No API key detected.")
            return

        try:
            from google import genai
            self.client = genai.Client(api_key=self.api_key)
            
            # Disable SDK internal exponential retry loop to prevent blocking on rate limits (429)
            try:
                from google.genai._gaos.utils.retries import RetryConfig
                if hasattr(self.client, "interactions") and hasattr(self.client.interactions, "sdk_configuration"):
                    self.client.interactions.sdk_configuration.retry_config = RetryConfig(
                        strategy="none",
                        backoff=None,
                        retry_connection_errors=False
                    )
            except Exception:
                pass

            print("Gemini Engine: Client initialized successfully.")
        except Exception as e:
            print(f"Gemini Engine: Client initialization failed: {e}")
            self.client = None

    def is_ready(self) -> bool:
        return self.client is not None

    def generate_explanation(self, predicted_condition: str, reported_symptoms: list) -> dict:
        """
        Generates structured patient explanation for the ML prediction.
        
        Args:
            predicted_condition (str): Output disease from SVM model.
            reported_symptoms (list): List of patient symptoms answered 'Yes'.
            
        Returns:
            dict with structured sections:
            - possible_condition
            - what_it_means
            - why_ai_predicted_this
            - what_you_should_know
            - important_notice
            - raw_text
        """
        symptoms_str = ", ".join(reported_symptoms) if reported_symptoms else "None reported"

        user_prompt = f"""
Machine Learning Predicted Condition: {predicted_condition}
Reported Symptoms: {symptoms_str}

Please explain this prediction according to the structured format.
"""

        raw_output = None
        
        # Call Gemini if client is ready
        if self.client:
            models_to_try = [
                "gemini-flash-lite-latest",
                "gemini-3.5-flash-lite",
                "gemini-3.1-flash-lite",
                "gemini-3.8-flash"
            ]

            def _query_gemini():
                for model_name in models_to_try:
                    # Strategy 1: Standard models.generate_content API
                    try:
                        print(f"Gemini Engine: Querying {model_name} via generate_content...")
                        resp = self.client.models.generate_content(
                            model=model_name,
                            contents=user_prompt,
                            config=dict(system_instruction=SYSTEM_PROMPT)
                        )
                        if resp and resp.text and len(resp.text.strip()) > 0:
                            print(f"Gemini Engine: Response successfully received from {model_name}.")
                            return resp.text
                    except Exception as ge1:
                        print(f"Gemini Engine: generate_content failed for {model_name}: {ge1}")

                    # Strategy 2: Interactions API (with fast timeout)
                    try:
                        print(f"Gemini Engine: Querying {model_name} via interactions...")
                        interaction = self.client.interactions.create(
                            model=model_name,
                            system_instruction=SYSTEM_PROMPT,
                            input=user_prompt,
                            timeout=8.0
                        )
                        output = getattr(interaction, "output_text", None)
                        if output and len(output.strip()) > 0:
                            print(f"Gemini Engine: Response successfully received from interactions on {model_name}.")
                            return output
                    except Exception as ge2:
                        print(f"Gemini Engine: interactions failed for {model_name}: {ge2}")
                return None

            # Execute with a hard 10-second timeout to protect against slow networks
            try:
                with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
                    future = executor.submit(_query_gemini)
                    raw_output = future.result(timeout=10.0)
            except concurrent.futures.TimeoutError:
                print("Gemini Engine: Network call timed out after 10s. Using clinical fallback.")
            except Exception as e:
                print(f"Gemini Engine: Error during query execution: {e}")

        # Safe clinical fallback if API was unavailable, rate-limited, or timed out
        if not raw_output:
            print("Gemini Engine: Using safe clinical explanation fallback.")
            raw_output = self._generate_fallback_explanation(predicted_condition, reported_symptoms)

        return self._parse_structured_sections(raw_output, predicted_condition)

    def _parse_structured_sections(self, text: str, predicted_condition: str) -> dict:
        """Parses the generated response into discrete structured keys."""
        sections = {
            "possible_condition": predicted_condition,
            "what_it_means": "",
            "why_ai_predicted_this": "",
            "what_you_should_know": "",
            "important_notice": "",
            "raw_text": text
        }

        # Regex patterns to isolate sections regardless of markdown formatting (#, **, -)
        patterns = {
            "possible_condition": r"(?:Possible Condition|Predicted Condition)[:\*\s]+(.*?)(?=(?:What It Means|Why The AI|Why AI|What You Should Know|Important Notice)|\Z)",
            "what_it_means": r"(?:What It Means)[:\*\s]+(.*?)(?=(?:Why The AI|Why AI|What You Should Know|Important Notice)|\Z)",
            "why_ai_predicted_this": r"(?:Why The AI Predicted This|Why AI Predicted This)[:\*\s]+(.*?)(?=(?:What You Should Know|Important Notice)|\Z)",
            "what_you_should_know": r"(?:What You Should Know)[:\*\s]+(.*?)(?=(?:Important Notice)|\Z)",
            "important_notice": r"(?:Important Notice)[:\*\s]+(.*)"
        }

        for key, pattern in patterns.items():
            match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
            if match:
                clean_chunk = match.group(1).strip()
                # Clean leading and trailing asterisks, hashes, and divider lines
                clean_chunk = re.sub(r"^[\*\#\-]+\s*", "", clean_chunk)
                clean_chunk = re.sub(r"[\*\#\-\s]+$", "", clean_chunk).strip()
                sections[key] = clean_chunk

        # Ensure fallback content if regex didn't extract cleanly
        if not sections["what_it_means"]:
            sections["what_it_means"] = (
                f"The statistical model analyzed your symptom pattern and matched it closest to clinical profiles associated with {predicted_condition}."
            )
        if not sections["why_ai_predicted_this"]:
            sections["why_ai_predicted_this"] = (
                f"This pattern of reported symptoms shares high statistical correlation with historical cases of {predicted_condition}."
            )
        if not sections["what_you_should_know"]:
            sections["what_you_should_know"] = (
                "Monitor how your symptoms progress. Stay hydrated, avoid self-medicating, and prepare a written list of symptoms for your doctor."
            )
        if not sections["important_notice"]:
            sections["important_notice"] = (
                "Chikitsak AI provides statistical pattern recognition, not a clinical diagnosis. Please consult a qualified doctor for clinical testing and treatment."
            )

        return sections

    def _generate_fallback_explanation(self, condition: str, symptoms: list) -> str:
        """Provides a safe, clinical explanation template when external API is unreachable."""
        sym_list = ", ".join(symptoms) if symptoms else "your entered symptoms"
        return f"""
Possible Condition:
{condition}

What It Means:
Based on the symptom profile you reported ({sym_list}), the machine learning classification model identified patterns most consistent with {condition}.

Why The AI Predicted This:
The machine learning algorithm correlates multiple symptom combinations against thousands of clinical training records. The specific co-occurrence of {sym_list} matches the statistical fingerprint of this condition.

What You Should Know:
Many conditions share overlapping symptoms. Rest, stay hydrated, keep a log of symptom progression, and do not begin any prescription medications without medical supervision.

Important Notice:
This is an educational AI assessment and does NOT constitute a confirmed medical diagnosis or doctor-patient relationship. If your symptoms worsen or include severe pain, shortness of breath, or high fever, seek emergency medical attention.
"""

# Singleton instance
gemini_engine = GeminiEngine()

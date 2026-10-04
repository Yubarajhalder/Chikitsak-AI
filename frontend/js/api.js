/**
 * Chikitsak AI - Modular API Service Layer
 * Encapsulates all communication with the Python Machine Learning & Gemini Backend.
 * Allows easy reconfiguration of API endpoints without modifying UI components.
 */

class ChikitsakApiClient {
  constructor(baseUrl = null) {
    // If running in browser served by Flask, use relative origin or default local port 5000
    if (baseUrl) {
      this.baseUrl = baseUrl.replace(/\/+$/, '');
    } else if (window.CHIKITSAK_API_URL) {
      this.baseUrl = window.CHIKITSAK_API_URL.replace(/\/+$/, '');
    } else if (window.location.protocol.startsWith('http')) {
      // Running from http:// or https:// (e.g., Flask server or local dev server)
      this.baseUrl = window.location.origin;
    } else {
      // Running directly via file:/// protocol
      this.baseUrl = 'http://127.0.0.1:5000';
    }

    this.timeoutMs = 60000; // 60 seconds to accommodate ML inference + Gemini LLM generation
  }

  /**
   * Update API Base URL dynamically (e.g., from settings modal)
   */
  setBaseUrl(newUrl) {
    this.baseUrl = newUrl ? newUrl.replace(/\/+$/, '') : '';
  }

  /**
   * Helper to perform fetch requests with abort timeout
   */
  async _fetchWithTimeout(resource, options = {}) {
    const { timeout = this.timeoutMs } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      if (err.name === 'AbortError') {
        throw new Error('The assessment request timed out. The AI backend took longer than expected.');
      }
      throw err;
    }
  }

  /**
   * Check connection and health of the Python backend & ML model
   */
  async checkHealth() {
    try {
      const endpoint = `${this.baseUrl}/api/health`;
      const response = await this._fetchWithTimeout(endpoint, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        timeout: 5000
      });

      if (!response.ok) {
        return {
          connected: false,
          statusText: `Backend responded with HTTP ${response.status}`,
          details: null
        };
      }

      const data = await response.json();
      return {
        connected: true,
        statusText: 'Connected & Ready',
        details: data
      };
    } catch (err) {
      return {
        connected: false,
        statusText: 'Backend Offline',
        error: err.message,
        details: null
      };
    }
  }

  /**
   * Submit symptom answers to the ML model and Gemini explainer
   * @param {Object} symptomsMap - Dictionary of symptom_key -> 1 or 0
   * @returns {Promise<Object>} Formatted prediction & Gemini explanation
   */
  async predict(symptomsMap) {
    // Validate input before network call
    if (!symptomsMap || typeof symptomsMap !== 'object') {
      throw new Error('Invalid input: symptoms must be an object.');
    }

    const affirmativeCount = Object.values(symptomsMap).filter(v => v === 1 || v === true).length;
    if (affirmativeCount === 0) {
      throw new Error('Please select at least one symptom answered with "Yes" before submitting.');
    }

    const payload = {
      symptoms: symptomsMap
    };

    const targetUrl = `${this.baseUrl}/predict`;

    try {
      const response = await this._fetchWithTimeout(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = (responseData && (responseData.message || responseData.error))
          ? (responseData.message || responseData.error)
          : `Prediction failed with HTTP status ${response.status}`;
        throw new Error(errorMsg);
      }

      if (!responseData || !responseData.prediction) {
        throw new Error('Incomplete response received from ML prediction backend.');
      }

      return responseData;
    } catch (err) {
      // Differentiate network failure from server error
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error(
          `Unable to connect to the Chikitsak AI backend at ${this.baseUrl}. ` +
          `Please make sure the Python server is running (run 'python app.py' in your terminal).`
        );
      }
      throw err;
    }
  }
}

// Global API Service instance
window.apiService = new ChikitsakApiClient();

/**
 * Chikitsak AI - Frontend Application Controller
 * Handles application state, step transitions, dynamic rendering, and UX interactions.
 */

class ChikitsakApp {
  constructor() {
    this.state = {
      currentStep: 'landing', // 'landing', 'step1', 'step2', 'step3', 'loading', 'results'
      selectedCategories: [], // Array of category IDs
      symptomAnswers: {},     // Key -> 1 or 0
      commonAnswers: {},      // Common key -> 1 or 0
      categorySearch: '',
      predictionResult: null,
      backendReady: false,
      backendDetails: null
    };

    this.loaderInterval = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.checkBackendHealth();
    this.renderCategoryCards();
    
    // Periodically verify backend connection
    setInterval(() => this.checkBackendHealth(true), 15000);
  }

  /**
   * Health status polling
   */
  async checkBackendHealth(silent = false) {
    const statusPill = document.getElementById('backend-status-pill');
    const statusText = document.getElementById('backend-status-text');
    const statusDot = document.getElementById('backend-status-dot');

    const result = await window.apiService.checkHealth();
    this.state.backendReady = result.connected;
    this.state.backendDetails = result.details;

    if (result.connected) {
      if (statusPill) statusPill.className = 'status-pill online';
      if (statusText) statusText.textContent = 'ML & Gemini Ready';
      if (statusDot) statusDot.className = 'status-dot online';
    } else {
      if (statusPill) statusPill.className = 'status-pill offline';
      if (statusText) statusText.textContent = 'Backend Offline (Click to config)';
      if (statusDot) statusDot.className = 'status-dot offline';
    }
  }

  /**
   * Attach DOM event listeners
   */
  bindEvents() {
    // Robust document-level event delegation for all action triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-action]');
      if (!trigger) return;
      const action = trigger.getAttribute('data-action');

      if (action === 'start-assessment') {
        e.preventDefault();
        this.goToStep('step1');
      } else if (action === 'go-home') {
        e.preventDefault();
        this.goToStep('landing');
      } else if (action === 'scroll-how-it-works') {
        e.preventDefault();
        if (this.state.currentStep !== 'landing') {
          this.goToStep('landing');
        }
        setTimeout(() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (action === 'scroll-about') {
        e.preventDefault();
        if (this.state.currentStep !== 'landing') {
          this.goToStep('landing');
        }
        setTimeout(() => {
          const el = document.getElementById('about-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });

    // Step 1: Category Continue
    const btnContinueToQuestions = document.getElementById('btn-continue-to-questions');
    if (btnContinueToQuestions) {
      btnContinueToQuestions.addEventListener('click', () => {
        if (this.state.selectedCategories.length === 0) {
          this.showToast('Please select at least one health category to proceed.', 'warning');
          return;
        }
        this.goToStep('step2');
      });
    }

    // Step 1: Category Search Input
    const categorySearchInput = document.getElementById('category-search-input');
    if (categorySearchInput) {
      categorySearchInput.addEventListener('input', (e) => {
        this.state.categorySearch = e.target.value.toLowerCase().trim();
        this.renderCategoryCards();
      });
    }

    // Step 2: Navigation
    const btnBackToCategories = document.getElementById('btn-back-to-categories');
    if (btnBackToCategories) {
      btnBackToCategories.addEventListener('click', () => {
        this.goToStep('step1');
      });
    }

    const btnContinueToReview = document.getElementById('btn-continue-to-review');
    if (btnContinueToReview) {
      btnContinueToReview.addEventListener('click', () => {
        const affirmativeCount = this.getAffirmativeCount();
        if (affirmativeCount === 0) {
          this.showToast('Please answer "Yes" to at least one symptom to run the AI assessment.', 'warning');
          return;
        }
        this.goToStep('step3');
      });
    }

    // Quick Action: Mark unanswered in current view as "No"
    const btnMarkAllNo = document.getElementById('btn-mark-all-no');
    if (btnMarkAllNo) {
      btnMarkAllNo.addEventListener('click', () => {
        this.markUnansweredAsNo();
      });
    }

    // Step 3: Edit answers & Submit
    const btnEditAnswers = document.getElementById('btn-edit-answers');
    if (btnEditAnswers) {
      btnEditAnswers.addEventListener('click', () => {
        this.goToStep('step2');
      });
    }

    const btnAnalyzeSymptoms = document.getElementById('btn-analyze-symptoms');
    if (btnAnalyzeSymptoms) {
      btnAnalyzeSymptoms.addEventListener('click', () => {
        this.submitAssessment();
      });
    }

    // Results Actions
    const btnStartNew = document.getElementById('btn-start-new');
    if (btnStartNew) {
      btnStartNew.addEventListener('click', () => {
        this.resetAssessment();
      });
    }

    const btnPrintReport = document.getElementById('btn-print-report');
    if (btnPrintReport) {
      btnPrintReport.addEventListener('click', () => {
        window.print();
      });
    }

    // API Config Modal
    const statusPill = document.getElementById('backend-status-pill');
    const apiModal = document.getElementById('api-config-modal');
    const closeApiModal = document.getElementById('close-api-modal');
    const saveApiBtn = document.getElementById('save-api-url-btn');
    const apiUrlInput = document.getElementById('api-url-input');

    if (statusPill && apiModal) {
      statusPill.addEventListener('click', () => {
        if (apiUrlInput) apiUrlInput.value = window.apiService.baseUrl;
        apiModal.classList.add('active');
      });
    }

    if (closeApiModal && apiModal) {
      closeApiModal.addEventListener('click', () => {
        apiModal.classList.remove('active');
      });
    }

    if (saveApiBtn && apiModal && apiUrlInput) {
      saveApiBtn.addEventListener('click', async () => {
        const newUrl = apiUrlInput.value.trim();
        if (newUrl) {
          window.apiService.setBaseUrl(newUrl);
          this.showToast('API URL updated. Testing connection...', 'info');
          await this.checkBackendHealth();
          apiModal.classList.remove('active');
        }
      });
    }
  }

  /**
   * Main Navigation Controller
   */
  goToStep(stepName) {
    this.state.currentStep = stepName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const landingView = document.getElementById('view-landing');
    const assessmentShell = document.getElementById('assessment-flow-container');

    const stepViews = {
      step1: document.getElementById('view-step1'),
      step2: document.getElementById('view-step2'),
      step3: document.getElementById('view-step3'),
      loading: document.getElementById('view-loading'),
      results: document.getElementById('view-results')
    };

    const inAssessment = ['step1', 'step2', 'step3', 'loading', 'results'].includes(stepName);

    // Toggle Landing page view
    if (landingView) {
      if (stepName === 'landing') {
        landingView.classList.remove('hidden');
        landingView.classList.add('active');
      } else {
        landingView.classList.add('hidden');
        landingView.classList.remove('active');
      }
    }

    // Toggle Assessment container wrapper
    if (assessmentShell) {
      if (inAssessment) {
        assessmentShell.classList.remove('hidden');
        assessmentShell.classList.add('active');
      } else {
        assessmentShell.classList.add('hidden');
        assessmentShell.classList.remove('active');
      }
    }

    // Toggle inner assessment step cards
    Object.keys(stepViews).forEach(key => {
      const el = stepViews[key];
      if (el) {
        if (key === stepName) {
          el.classList.remove('hidden');
          el.classList.add('active');
        } else {
          el.classList.add('hidden');
          el.classList.remove('active');
        }
      }
    });

    // Update assessment progress bar
    const progressBar = document.getElementById('assessment-progress-bar');
    const progressLabel = document.getElementById('assessment-step-indicator');

    if (progressBar && progressLabel) {
      if (stepName === 'step1') {
        progressBar.style.width = '33.33%';
        progressLabel.textContent = 'Step 1 of 3: Health Category Selection';
      } else if (stepName === 'step2') {
        progressBar.style.width = '66.66%';
        progressLabel.textContent = 'Step 2 of 3: Symptom & Risk Questions';
        this.renderSymptomQuestions();
      } else if (stepName === 'step3') {
        progressBar.style.width = '100%';
        progressLabel.textContent = 'Step 3 of 3: Clinical Review & Confirmation';
        this.renderReviewSummary();
      } else if (stepName === 'loading' || stepName === 'results') {
        progressBar.style.width = '100%';
        progressLabel.textContent = 'Assessment Completed';
      }
    }

    // Refresh Lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /**
   * Step 1: Render Health Category Cards
   */
  renderCategoryCards() {
    const grid = document.getElementById('category-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const query = this.state.categorySearch;

    const filtered = SYMPTOM_DATA.categories.filter(cat => {
      if (!query) return true;
      return (
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-filter-state">
          <i data-lucide="search-x" class="empty-icon"></i>
          <h4>No matching categories found</h4>
          <p>Try searching for "Skin", "Respiratory", "Chest", or "Digestive".</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach(cat => {
      const isSelected = this.state.selectedCategories.includes(cat.id);
      const card = document.createElement('div');
      card.className = `category-card ${isSelected ? 'selected' : ''}`;
      card.tabIndex = 0;
      card.setAttribute('role', 'checkbox');
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');

      card.innerHTML = `
        <div class="card-header-flex">
          <div class="cat-icon-box">
            <i data-lucide="${cat.icon || 'activity'}"></i>
          </div>
          <span class="cat-badge">${cat.badge || 'Symptoms'}</span>
        </div>
        <h4 class="cat-title">${cat.name}</h4>
        <p class="cat-desc">${cat.description}</p>
        <div class="cat-selection-indicator">
          <span class="indicator-check"><i data-lucide="check"></i></span>
          <span class="indicator-text">${isSelected ? 'Selected' : 'Click to Select'}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.toggleCategorySelection(cat.id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.toggleCategorySelection(cat.id);
        }
      });

      grid.appendChild(card);
    });

    this.updateCategoryCounter();
    if (window.lucide) window.lucide.createIcons();
  }

  toggleCategorySelection(catId) {
    const index = this.state.selectedCategories.indexOf(catId);
    if (index > -1) {
      this.state.selectedCategories.splice(index, 1);
    } else {
      this.state.selectedCategories.push(catId);
    }
    this.renderCategoryCards();
  }

  updateCategoryCounter() {
    const count = this.state.selectedCategories.length;
    const btn = document.getElementById('btn-continue-to-questions');
    const label = document.getElementById('selected-cat-count-badge');

    if (label) {
      label.textContent = count > 0 ? `${count} selected` : 'None selected';
      label.className = `count-badge ${count > 0 ? 'highlight' : ''}`;
    }

    if (btn) {
      if (count > 0) {
        btn.removeAttribute('disabled');
        btn.classList.remove('disabled');
      } else {
        btn.setAttribute('disabled', 'true');
        btn.classList.add('disabled');
      }
    }
  }

  /**
   * Step 2: Render Symptom Questions for chosen categories + common clinical questions
   */
  renderSymptomQuestions() {
    const container = document.getElementById('symptoms-questions-container');
    const commonContainer = document.getElementById('common-questions-container');
    if (!container || !commonContainer) return;

    container.innerHTML = '';
    commonContainer.innerHTML = '';

    // Collect all symptom keys across selected categories (without duplicates)
    const activeSymptomKeys = new Set();
    this.state.selectedCategories.forEach(catId => {
      const cat = SYMPTOM_DATA.categories.find(c => c.id === catId);
      if (cat && cat.symptoms) {
        cat.symptoms.forEach(sym => activeSymptomKeys.add(sym));
      }
    });

    const symptomList = Array.from(activeSymptomKeys);

    if (symptomList.length === 0) {
      container.innerHTML = `
        <div class="empty-state-notice">
          <p>No symptoms found for the selected category. Please go back and select a category.</p>
        </div>
      `;
    } else {
      symptomList.forEach(key => {
        const detail = SYMPTOM_DATA.symptomDetails[key] || {
          title: key.replace(/_/g, ' ').toUpperCase(),
          question: `Do you have ${key.replace(/_/g, ' ')}?`,
          description: "Clinical biomarker monitored by the SVM model."
        };

        const currentAnswer = this.state.symptomAnswers[key]; // 1, 0, or undefined
        const card = this.createQuestionCard(key, detail, currentAnswer, (val) => {
          this.setSymptomAnswer(key, val);
        });

        container.appendChild(card);
      });
    }

    // Render Common Questions (Risk factors)
    SYMPTOM_DATA.commonQuestions.forEach(cq => {
      const currentAnswer = this.state.commonAnswers[cq.key];
      const card = this.createQuestionCard(cq.key, cq, currentAnswer, (val) => {
        this.setCommonAnswer(cq.key, val);
      }, true);
      commonContainer.appendChild(card);
    });

    this.updateSymptomAnswerCounters();
    if (window.lucide) window.lucide.createIcons();
  }

  createQuestionCard(key, info, currentVal, onChangeCallback, isCommon = false) {
    const card = document.createElement('div');
    const isYes = currentVal === 1;
    const isNo = currentVal === 0;

    card.className = `question-card ${isYes ? 'answered-yes' : ''} ${isNo ? 'answered-no' : ''}`;
    card.id = `q-card-${key}`;

    card.innerHTML = `
      <div class="q-content">
        <div class="q-header">
          <h4 class="q-title">${info.title}</h4>
          ${isCommon ? '<span class="common-badge">Clinical Context</span>' : ''}
        </div>
        <p class="q-prompt">${info.question}</p>
        <p class="q-desc">${info.description}</p>
      </div>
      <div class="q-actions" role="group" aria-label="${info.title} answers">
        <button type="button" class="btn-toggle-answer yes ${isYes ? 'active' : ''}" aria-pressed="${isYes ? 'true' : 'false'}">
          <i data-lucide="check"></i> Yes
        </button>
        <button type="button" class="btn-toggle-answer no ${isNo ? 'active' : ''}" aria-pressed="${isNo ? 'true' : 'false'}">
          <i data-lucide="x"></i> No
        </button>
      </div>
    `;

    const yesBtn = card.querySelector('.btn-toggle-answer.yes');
    const noBtn = card.querySelector('.btn-toggle-answer.no');

    yesBtn.addEventListener('click', () => {
      onChangeCallback(1);
      this.updateCardState(card, 1);
    });

    noBtn.addEventListener('click', () => {
      onChangeCallback(0);
      this.updateCardState(card, 0);
    });

    return card;
  }

  updateCardState(card, value) {
    const yesBtn = card.querySelector('.btn-toggle-answer.yes');
    const noBtn = card.querySelector('.btn-toggle-answer.no');

    card.classList.toggle('answered-yes', value === 1);
    card.classList.toggle('answered-no', value === 0);

    if (yesBtn) {
      yesBtn.classList.toggle('active', value === 1);
      yesBtn.setAttribute('aria-pressed', value === 1 ? 'true' : 'false');
    }
    if (noBtn) {
      noBtn.classList.toggle('active', value === 0);
      noBtn.setAttribute('aria-pressed', value === 0 ? 'true' : 'false');
    }

    this.updateSymptomAnswerCounters();
  }

  setSymptomAnswer(key, value) {
    this.state.symptomAnswers[key] = value;
  }

  setCommonAnswer(key, value) {
    this.state.commonAnswers[key] = value;
  }

  markUnansweredAsNo() {
    // Iterate over visible symptoms and common questions
    this.state.selectedCategories.forEach(catId => {
      const cat = SYMPTOM_DATA.categories.find(c => c.id === catId);
      if (cat && cat.symptoms) {
        cat.symptoms.forEach(sym => {
          if (this.state.symptomAnswers[sym] === undefined) {
            this.state.symptomAnswers[sym] = 0;
            const card = document.getElementById(`q-card-${sym}`);
            if (card) this.updateCardState(card, 0);
          }
        });
      }
    });

    SYMPTOM_DATA.commonQuestions.forEach(cq => {
      if (this.state.commonAnswers[cq.key] === undefined) {
        this.state.commonAnswers[cq.key] = 0;
        const card = document.getElementById(`q-card-${cq.key}`);
        if (card) this.updateCardState(card, 0);
      }
    });

    this.showToast('Remaining unanswered questions marked as "No".', 'info');
  }

  getAffirmativeCount() {
    let count = 0;
    Object.values(this.state.symptomAnswers).forEach(v => {
      if (v === 1) count++;
    });
    Object.values(this.state.commonAnswers).forEach(v => {
      if (v === 1) count++;
    });
    return count;
  }

  updateSymptomAnswerCounters() {
    const affirmativeCount = this.getAffirmativeCount();
    const countBadge = document.getElementById('symptoms-answered-counter');
    const continueBtn = document.getElementById('btn-continue-to-review');

    if (countBadge) {
      countBadge.textContent = `${affirmativeCount} Symptom${affirmativeCount === 1 ? '' : 's'} Reported ("Yes")`;
      countBadge.classList.toggle('has-symptoms', affirmativeCount > 0);
    }

    if (continueBtn) {
      if (affirmativeCount > 0) {
        continueBtn.removeAttribute('disabled');
        continueBtn.classList.remove('disabled');
      } else {
        continueBtn.setAttribute('disabled', 'true');
        continueBtn.classList.add('disabled');
      }
    }
  }

  /**
   * Step 3: Render Review Summary before ML inference
   */
  renderReviewSummary() {
    const symptomsContainer = document.getElementById('review-reported-symptoms-list');
    const commonContainer = document.getElementById('review-common-factors-list');
    const reviewCountBadge = document.getElementById('review-total-count');

    if (!symptomsContainer || !commonContainer) return;

    symptomsContainer.innerHTML = '';
    commonContainer.innerHTML = '';

    const positiveSymptoms = [];
    Object.entries(this.state.symptomAnswers).forEach(([key, val]) => {
      if (val === 1) {
        const detail = SYMPTOM_DATA.symptomDetails[key];
        positiveSymptoms.push({
          key,
          title: detail ? detail.title : key.replace(/_/g, ' ').toUpperCase(),
          desc: detail ? detail.description : ''
        });
      }
    });

    if (positiveSymptoms.length === 0) {
      symptomsContainer.innerHTML = `
        <div class="empty-review-warning">
          <i data-lucide="alert-triangle"></i>
          <p>No affirmative symptoms selected. Please return to Step 2 and select at least one symptom answered with "Yes".</p>
        </div>
      `;
    } else {
      positiveSymptoms.forEach(item => {
        const chip = document.createElement('div');
        chip.className = 'reported-chip';
        chip.innerHTML = `
          <div class="chip-content">
            <span class="chip-bullet"></span>
            <strong>${item.title}</strong>
          </div>
          <button type="button" class="chip-remove" title="Remove symptom" aria-label="Remove ${item.title}">
            <i data-lucide="x"></i>
          </button>
        `;

        chip.querySelector('.chip-remove').addEventListener('click', () => {
          this.state.symptomAnswers[item.key] = 0;
          this.renderReviewSummary();
        });

        symptomsContainer.appendChild(chip);
      });
    }

    // Render answered Common Questions
    let commonAnswersRendered = 0;
    SYMPTOM_DATA.commonQuestions.forEach(cq => {
      const val = this.state.commonAnswers[cq.key];
      if (val !== undefined) {
        commonAnswersRendered++;
        const row = document.createElement('div');
        row.className = `review-common-row ${val === 1 ? 'is-yes' : 'is-no'}`;
        row.innerHTML = `
          <div class="row-info">
            <span class="row-title">${cq.title}</span>
            <span class="row-sub">${cq.question}</span>
          </div>
          <span class="row-val-badge ${val === 1 ? 'badge-yes' : 'badge-no'}">
            ${val === 1 ? '<i data-lucide="check"></i> Yes' : '<i data-lucide="x"></i> No'}
          </span>
        `;
        commonContainer.appendChild(row);
      }
    });

    if (commonAnswersRendered === 0) {
      commonContainer.innerHTML = `
        <p class="text-muted">No clinical risk questions have been answered yet.</p>
      `;
    }

    if (reviewCountBadge) {
      reviewCountBadge.textContent = `${positiveSymptoms.length} Reported`;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Submit to Python ML & Gemini Backend
   */
  async submitAssessment() {
    const affirmativeCount = this.getAffirmativeCount();
    if (affirmativeCount === 0) {
      this.showToast('Please select at least one symptom answered with "Yes".', 'warning');
      return;
    }

    // Prepare consolidated symptoms dictionary
    const symptomsPayload = {
      ...this.state.symptomAnswers,
      ...this.state.commonAnswers
    };

    // Show loading view
    this.goToStep('loading');
    this.startLoadingAnimations();

    try {
      const result = await window.apiService.predict(symptomsPayload);
      this.stopLoadingAnimations();
      this.state.predictionResult = result;
      this.renderResults(result);
      this.goToStep('results');
    } catch (err) {
      this.stopLoadingAnimations();
      this.goToStep('step3');
      this.showToast(err.message || 'Error occurred while communicating with the AI backend.', 'error');
    }
  }

  /**
   * Progressive Status Loading Animation
   */
  startLoadingAnimations() {
    const label = document.getElementById('loading-dynamic-step');
    const messages = [
      "Analyzing your reported symptoms against 132 clinical features...",
      "Executing Support Vector Machine (SVM) classifier...",
      "Consulting Google Gemini AI to formulate patient-friendly explanation...",
      "Finalizing structured medical safety notices..."
    ];

    let index = 0;
    if (label) label.textContent = messages[0];

    this.loaderInterval = setInterval(() => {
      index = (index + 1) % messages.length;
      if (label) {
        label.style.opacity = '0';
        setTimeout(() => {
          label.textContent = messages[index];
          label.style.opacity = '1';
        }, 300);
      }
    }, 2500);
  }

  stopLoadingAnimations() {
    if (this.loaderInterval) {
      clearInterval(this.loaderInterval);
      this.loaderInterval = null;
    }
  }

  /**
   * Render the comprehensive Result Page
   */
  renderResults(data) {
    const predictionTitle = document.getElementById('result-condition-name');
    const reportedChipsContainer = document.getElementById('result-reported-symptoms-chips');
    const dateStamp = document.getElementById('result-timestamp');

    // Section containers for Gemini Explanation
    const secWhatItMeans = document.getElementById('explanation-what-it-means');
    const secWhyPredicted = document.getElementById('explanation-why-predicted');
    const secWhatToKnow = document.getElementById('explanation-what-to-know');
    const secNotice = document.getElementById('explanation-important-notice');

    if (predictionTitle) {
      predictionTitle.textContent = data.prediction || 'Assessment Complete';
    }

    if (dateStamp) {
      const now = new Date();
      dateStamp.textContent = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    // Render reported symptoms chips
    if (reportedChipsContainer && data.reported_symptoms) {
      reportedChipsContainer.innerHTML = '';
      data.reported_symptoms.forEach(sym => {
        const span = document.createElement('span');
        span.className = 'result-sym-chip';
        span.innerHTML = `<i data-lucide="check-circle-2"></i> ${sym}`;
        reportedChipsContainer.appendChild(span);
      });
    }

    // Populate structured explanation sections
    const exp = data.explanation || {};

    if (secWhatItMeans) {
      secWhatItMeans.innerHTML = this.formatMarkdown(
        exp.what_it_means || 'The machine learning model analyzed your symptom combination and identified this condition as the closest statistical pattern.'
      );
    }

    if (secWhyPredicted) {
      secWhyPredicted.innerHTML = this.formatMarkdown(
        exp.why_ai_predicted_this || 'The model correlated the presence of your reported symptoms against clinical training instances.'
      );
    }

    if (secWhatToKnow) {
      secWhatToKnow.innerHTML = this.formatMarkdown(
        exp.what_you_should_know || 'Keep track of your symptoms, note any changes, stay hydrated, and arrange a visit with a medical practitioner.'
      );
    }

    if (secNotice) {
      secNotice.innerHTML = this.formatMarkdown(
        exp.important_notice || 'This is an educational statistical prediction generated by an AI model and is not a clinical medical diagnosis.'
      );
    }

    if (window.lucide) window.lucide.createIcons();
  }

  formatMarkdown(text) {
    if (!text) return '';
    let clean = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    clean = clean.replace(/\*(.*?)\*/g, '<em>$1</em>');
    clean = clean.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>');
    clean = clean.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    clean = clean.replace(/\n\n+/g, '</p><p>');
    return `<p>${clean}</p>`;
  }

  /**
   * Reset assessment state
   */
  resetAssessment() {
    this.state.selectedCategories = [];
    this.state.symptomAnswers = {};
    this.state.commonAnswers = {};
    this.state.predictionResult = null;
    this.goToStep('step1');
  }

  /**
   * Toast notification helper
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-pill ${type}`;
    
    let iconName = 'info';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'alert-circle';
    if (type === 'success') iconName = 'check-circle';

    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.chikitsakApp = new ChikitsakApp();
});

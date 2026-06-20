import React, { useState } from 'react';
import { 
  Activity, Brain, Smartphone, Moon, BookOpen, User, 
  Sparkles, RefreshCw, AlertTriangle, ShieldCheck, HeartHandshake, Globe
} from 'lucide-react';
import Gauge from './components/Gauge';

const PRIMARY_API_URL = "http://localhost:8000/predict";
const FALLBACK_API_URL = "https://mansik-santulan-score.onrender.com/predict";

const DEFAULT_FORM = {
  age: '',
  gender: '',
  country: 'India',
  academic_level: '',
  most_used_platform: '',
  purpose_of_use: '',
  avg_daily_usage_hours: '',
  daily_unlocks: '',
  study_hours: '',
  physical_activity_hours: '',
  sleep_hours_per_night: '',
  stress_level: ''
};

export default function App() {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});
  const [uiState, setUiState] = useState('idle'); // 'idle' | 'loading' | 'result' | 'error'
  const [prediction, setPrediction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleStressSelect = (level) => {
    setFormData(prev => ({ ...prev, stress_level: level }));
    if (errors.stress_level) {
      setErrors(prev => ({ ...prev, stress_level: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const numericRanges = [
      ['age', 10, 100, 'Age must be between 10 and 100'],
      ['avg_daily_usage_hours', 0, 24, 'Usage must be 0–24 hours'],
      ['daily_unlocks', 0, 1000, 'Unlocks must be 0 or more'],
      ['study_hours', 0, 24, 'Study hours must be 0–24 hours'],
      ['physical_activity_hours', 0, 24, 'Activity must be 0–24 hours'],
      ['sleep_hours_per_night', 0, 24, 'Sleep must be 0–24 hours']
    ];

    numericRanges.forEach(([key, min, max, msg]) => {
      const val = parseFloat(formData[key]);
      if (formData[key] === '' || isNaN(val)) {
        newErrors[key] = 'Required';
      } else if (val < min || val > max) {
        newErrors[key] = msg;
      }
    });

    ['gender', 'country', 'academic_level', 'most_used_platform', 'purpose_of_use', 'stress_level'].forEach(key => {
      if (!formData[key] || formData[key].trim() === '') {
        newErrors[key] = 'Required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUiState('loading');
    setErrorMessage('');

    const payload = {
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      country: formData.country.trim(),
      academic_level: formData.academic_level,
      most_used_platform: formData.most_used_platform,
      purpose_of_use: formData.purpose_of_use,
      avg_daily_usage_hours: parseFloat(formData.avg_daily_usage_hours),
      daily_unlocks: parseInt(formData.daily_unlocks, 10),
      study_hours: parseFloat(formData.study_hours),
      physical_activity_hours: parseFloat(formData.physical_activity_hours),
      sleep_hours_per_night: parseFloat(formData.sleep_hours_per_night),
      stress_level: formData.stress_level
    };

    try {
      let response;
      try {
        response = await fetch(PRIMARY_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Primary API failed, trying fallback remote endpoint...");
        response = await fetch(FALLBACK_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `API returned status ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.predicted_mental_health_score);
      setUiState('result');
    } catch (err) {
      setErrorMessage(err.message || "Failed to reach prediction server.");
      setUiState('error');
    }
  };

  const getScoreBand = (score) => {
    if (score < 4.0) {
      return {
        class: 'strained',
        title: 'Signal: Elevated Strain',
        desc: 'Your routine shows signs of digital overload or reduced rest. Prioritizing rest and screen-free intervals will help restore balance.'
      };
    } else if (score < 7.0) {
      return {
        class: 'balanced',
        title: 'Signal: Steady & Balanced',
        desc: 'Your daily rhythm is stable with good balance between studies and habits. Minor adjustments can further enhance focus and energy.'
      };
    } else {
      return {
        class: 'strong',
        title: 'Signal: Strong Wellness',
        desc: 'Your physical activity, sleep, and digital habits reflect a resilient baseline. Keep maintaining these healthy daily boundaries!'
      };
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-badge">
          <Sparkles size={14} /> Student Wellness Intelligence
        </div>
        <h1 className="header-title">
          Mental Health <em>Signal</em>
        </h1>
        <p className="header-subtitle">
          An AI-powered read on how daily habits, screen exposure, and lifestyle impact your baseline wellness.
        </p>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="main-grid">
        {/* INPUT FORM PANEL */}
        <div className="card-panel">
          <form onSubmit={handleSubmit} novalidate>
            {/* SECTION 1: PROFILE */}
            <div className="form-section">
              <div className="section-header">
                <span className="section-num">01</span>
                <User size={18} color="#60a5fa" />
                <span>Personal Profile</span>
              </div>
              <div className="grid-3">
                <div className={`form-group ${errors.age ? 'has-error' : ''}`}>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 21"
                    className="form-control"
                  />
                  <span className="field-error-msg">{errors.age}</span>
                </div>

                <div className={`form-group ${errors.gender ? 'has-error' : ''}`}>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="" disabled hidden>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <span className="field-error-msg">{errors.gender}</span>
                </div>

                <div className={`form-group ${errors.country ? 'has-error' : ''}`}>
                  <label htmlFor="country"><Globe size={14} /> Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    list="country-list"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. India"
                    className="form-control"
                  />
                  <datalist id="country-list">
                    {['India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France'].map(c => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  <span className="field-error-msg">{errors.country}</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: DIGITAL & ACADEMIC HABITS */}
            <div className="form-section">
              <div className="section-header">
                <span className="section-num">02</span>
                <Smartphone size={18} color="#60a5fa" />
                <span>Academic &amp; Digital Habits</span>
              </div>
              <div className="grid-2">
                <div className={`form-group ${errors.academic_level ? 'has-error' : ''}`}>
                  <label htmlFor="academic_level">Academic Level</label>
                  <select
                    id="academic_level"
                    name="academic_level"
                    value={formData.academic_level}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="" disabled hidden>Select Level</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                  <span className="field-error-msg">{errors.academic_level}</span>
                </div>

                <div className={`form-group ${errors.most_used_platform ? 'has-error' : ''}`}>
                  <label htmlFor="most_used_platform">Top Social Platform</label>
                  <select
                    id="most_used_platform"
                    name="most_used_platform"
                    value={formData.most_used_platform}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="" disabled hidden>Select Platform</option>
                    {['Instagram','YouTube','TikTok','Snapchat','Twitter','LinkedIn','Facebook','WhatsApp','WeChat','LINE','KakaoTalk','VKontakte'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <span className="field-error-msg">{errors.most_used_platform}</span>
                </div>

                <div className={`form-group ${errors.purpose_of_use ? 'has-error' : ''}`}>
                  <label htmlFor="purpose_of_use">Primary Purpose</label>
                  <select
                    id="purpose_of_use"
                    name="purpose_of_use"
                    value={formData.purpose_of_use}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="" disabled hidden>Select Purpose</option>
                    <option value="Networking">Networking</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="News">News</option>
                  </select>
                  <span className="field-error-msg">{errors.purpose_of_use}</span>
                </div>

                <div className={`form-group ${errors.avg_daily_usage_hours ? 'has-error' : ''}`}>
                  <label htmlFor="avg_daily_usage_hours">Daily Screen Time</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="avg_daily_usage_hours"
                      name="avg_daily_usage_hours"
                      step="0.5"
                      value={formData.avg_daily_usage_hours}
                      onChange={handleChange}
                      placeholder="e.g. 4.5"
                      className="form-control"
                    />
                    <span className="unit">hrs</span>
                  </div>
                  <span className="field-error-msg">{errors.avg_daily_usage_hours}</span>
                </div>

                <div className={`form-group ${errors.daily_unlocks ? 'has-error' : ''}`}>
                  <label htmlFor="daily_unlocks">Phone Unlocks / Day</label>
                  <input
                    type="number"
                    id="daily_unlocks"
                    name="daily_unlocks"
                    value={formData.daily_unlocks}
                    onChange={handleChange}
                    placeholder="e.g. 60"
                    className="form-control"
                  />
                  <span className="field-error-msg">{errors.daily_unlocks}</span>
                </div>
              </div>
            </div>

            {/* SECTION 3: LIFESTYLE & STRESS */}
            <div className="form-section">
              <div className="section-header">
                <span className="section-num">03</span>
                <Activity size={18} color="#60a5fa" />
                <span>Lifestyle &amp; Stress Indicator</span>
              </div>
              <div className="grid-3">
                <div className={`form-group ${errors.study_hours ? 'has-error' : ''}`}>
                  <label htmlFor="study_hours"><BookOpen size={14} /> Study Hours</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="study_hours"
                      name="study_hours"
                      step="0.5"
                      value={formData.study_hours}
                      onChange={handleChange}
                      placeholder="e.g. 5.0"
                      className="form-control"
                    />
                    <span className="unit">hrs</span>
                  </div>
                  <span className="field-error-msg">{errors.study_hours}</span>
                </div>

                <div className={`form-group ${errors.physical_activity_hours ? 'has-error' : ''}`}>
                  <label htmlFor="physical_activity_hours"><Activity size={14} /> Physical Activity</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="physical_activity_hours"
                      name="physical_activity_hours"
                      step="0.5"
                      value={formData.physical_activity_hours}
                      onChange={handleChange}
                      placeholder="e.g. 1.0"
                      className="form-control"
                    />
                    <span className="unit">hrs</span>
                  </div>
                  <span className="field-error-msg">{errors.physical_activity_hours}</span>
                </div>

                <div className={`form-group ${errors.sleep_hours_per_night ? 'has-error' : ''}`}>
                  <label htmlFor="sleep_hours_per_night"><Moon size={14} /> Sleep / Night</label>
                  <div className="input-with-unit">
                    <input
                      type="number"
                      id="sleep_hours_per_night"
                      name="sleep_hours_per_night"
                      step="0.5"
                      value={formData.sleep_hours_per_night}
                      onChange={handleChange}
                      placeholder="e.g. 7.5"
                      className="form-control"
                    />
                    <span className="unit">hrs</span>
                  </div>
                  <span className="field-error-msg">{errors.sleep_hours_per_night}</span>
                </div>
              </div>

              <div className={`form-group ${errors.stress_level ? 'has-error' : ''}`} style={{ marginTop: '1rem' }}>
                <label><Brain size={14} /> Perceived Stress Level</label>
                <div className="segmented-control">
                  {['Low', 'Medium', 'High', 'Very High'].map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      className={`seg-btn ${formData.stress_level === lvl ? 'active' : ''}`}
                      onClick={() => handleStressSelect(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
                <span className="field-error-msg">{errors.stress_level}</span>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={uiState === 'loading'}>
              {uiState === 'loading' ? (
                <>
                  <RefreshCw size={18} className="spinner" /> Analyzing Signal...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Predict Mental Health Signal
                </>
              )}
            </button>
          </form>
        </div>

        {/* RESULTS & ANALYTICS PANEL */}
        <div className="card-panel">
          <div className="result-panel-inner">
            {uiState === 'idle' && (
              <div>
                <Gauge score={0} state="idle" />
                <h3 style={{ fontSize: '1.2rem', marginTop: '1rem', color: '#f3f4f6' }}>
                  Ready to Analyze
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', maxWidth: '300px', margin: '0.5rem auto' }}>
                  Fill out your lifestyle habits and submit the form to generate your wellness signal score (0–10).
                </p>
              </div>
            )}

            {uiState === 'loading' && (
              <div>
                <RefreshCw size={48} color="#3b82f6" className="spinner" style={{ margin: '2rem auto' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#60a5fa' }}>Processing Model Pipeline...</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                  Calculating feature correlations and inference score.
                </p>
              </div>
            )}

            {uiState === 'result' && prediction !== null && (() => {
              const band = getScoreBand(prediction);
              return (
                <div style={{ width: '100%' }}>
                  <Gauge score={prediction} state="result" />
                  <div className="score-display">
                    <span className="score-value">{prediction.toFixed(2)}</span>
                    <span className="score-max">/10</span>
                  </div>

                  <span className={`score-badge ${band.class}`}>
                    {band.title}
                  </span>

                  <p className="score-desc">{band.desc}</p>

                  <div className="insights-box">
                    <div className="insights-title">Habit Breakdown</div>
                    <div className="insight-item">
                      <Smartphone size={14} color="#60a5fa" />
                      <span>Screen vs Sleep: <strong>{formData.avg_daily_usage_hours || 0}h</strong> screen / <strong>{formData.sleep_hours_per_night || 0}h</strong> sleep</span>
                    </div>
                    <div className="insight-item">
                      <Activity size={14} color="#34d399" />
                      <span>Physical Activity: <strong>{formData.physical_activity_hours || 0}h/day</strong></span>
                    </div>
                    <div className="insight-item">
                      <Brain size={14} color="#fbbf24" />
                      <span>Perceived Stress: <strong>{formData.stress_level}</strong></span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ marginTop: '1.5rem' }}
                    onClick={() => setUiState('idle')}
                  >
                    Reset &amp; Run Another
                  </button>
                </div>
              );
            })()}

            {uiState === 'error' && (
              <div>
                <AlertTriangle size={48} color="#ef4444" style={{ margin: '1rem auto' }} />
                <h3 style={{ color: '#f87171', fontSize: '1.1rem' }}>Connection / Inference Error</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0.6rem 0 1.2rem' }}>
                  {errorMessage}
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setUiState('idle')}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <HeartHandshake size={14} /> Designed for informational purposes — not a clinical assessment.
        </p>
      </footer>
    </div>
  );
}

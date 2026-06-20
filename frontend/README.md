# Student Mental Health Signal — Frontend (React + Vite)

Modern React frontend built with Vite, Lucide Icons, and Vanilla CSS glassmorphism styling for visualizing student mental health scores.

## Features
- **Interactive Multi-Section Form**: Student demographics, digital habits, lifestyle & stress indicators.
- **Real-Time Validation**: Field-level feedback and error clearing.
- **Custom Animated SVG Gauge**: Visual score readout (0.0 – 10.0) with category bands (strained, balanced, strong).
- **Backend API Integration**: Connects with local FastAPI backend (`http://localhost:8000/predict`) with fallback support.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production**
   ```bash
   npm run build
   ```

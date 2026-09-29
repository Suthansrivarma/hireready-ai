# HireReady AI - Production-Ready SaaS Resume Optimizer & ATS Matcher

HireReady AI helps job seekers (primarily students, fresh graduates, and early-career software/IT professionals) analyze, score, and optimize their resumes against target job descriptions using Google Gemini AI models.

---

## 🌟 Features

### 1. Resume & Job Description Matching
- **Multi-Format Parser**: Supports PDF (`.pdf`) and Word (`.docx`) upload or raw text pasting with file size & type validation (max 5MB).
- **Cumulative Match Score**: Gives an overall ATS Match Score (0-100%) broken down by Technical Skills, Experience Alignment, Education, and Formatting.
- **Skill Gaps & Keyword Search**: Explicitly lists matched skills vs missing skills and keywords required by the employer.

### 2. Ethical AI Enhancements (Zero Fabrication)
- **Non-Fabricated Professional Summary**: Generates a tailored executive summary based strictly on verified resume details.
- **Bullet Point Rewriter**: Converts weak descriptions into high-impact bullet points using action verbs and measurable result placeholders (`[X%]`, `[N users]`).
- **Tailored Cover Letter**: Generates a customized cover letter for the employer.
- **10 Job-Specific Interview Questions**: Provides 10 tailored technical & behavioral interview questions with sample answer strategies.

### 3. Clean ATS PDF Export
- **1-Click ATS Export**: Generates a clean, single-column ATS-friendly PDF version of the optimized resume.

### 4. Application Tracker & SaaS Architecture
- **Kanban Job Application Board**: Track target companies across Wishlist, Applied, Interviewing, Offer, and Rejected statuses.
- **Monetization & Usage Tier System**: Enforces usage limits for Free tier (1 analysis) and unlocks unlimited analyses for Premium & Pro tiers. Integrated with checkout session endpoints ready for Stripe.
- **SEO & Social Optimization**: Built-in Open Graph metadata, title tags, meta descriptions, sitemap, and `robots.txt`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Axios, React Router DOM, html2canvas, jsPDF.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication, Multer file processing, `pdf-parse`, `mammoth`.
- **AI Engine**: Google Gemini API (`@google/generative-ai`) with fallback heuristic rule parser.

---

## 🚀 Quick Local Setup Instructions

### Prerequisites
- **Node.js**: v18 or higher (Tested on Node v22)
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/hireready_ai`) or MongoDB Atlas URI (optional; app gracefully falls back if MongoDB is pending).
- **Google Gemini API Key**: Optional (`GEMINI_API_KEY`). If no key is set, backend uses an intelligent local heuristic analysis engine out-of-the-box!

---

### Step 1: Clone & Installation

```bash
# Navigate to project root
cd D:\hireready-ai

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

---

### Step 2: Environment Setup

#### Backend Environment (`D:\hireready-ai\backend\.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/hireready_ai
JWT_SECRET=hireready_super_secret_jwt_key_2026_dev_mode
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

---

### Step 3: Start the Application

#### 1. Start Backend Server (Port 5000)
```bash
cd D:\hireready-ai\backend
npm start
```
*Health Check endpoint*: [http://localhost:5000/api/health](http://localhost:5000/api/health)

#### 2. Start Frontend Dev Server (Port 5173)
```bash
cd D:\hireready-ai\frontend
npm run dev
```
*Application URL*: [http://localhost:5173](http://localhost:5173)

---

## 🔗 Key API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Authenticate & get JWT token | Public |
| `GET` | `/api/auth/me` | Get current user details | Private |
| `POST` | `/api/analysis/analyze` | Upload resume & run AI analysis | Private |
| `GET` | `/api/analysis/recent` | Fetch user's recent analyses history | Private |
| `GET` | `/api/analysis/:id` | Fetch single analysis by ID | Private |
| `DELETE` | `/api/analysis/:id` | Delete saved analysis | Private |
| `GET` | `/api/tracker` | List user's tracked job applications | Private |
| `POST` | `/api/tracker` | Add new job application to board | Private |
| `POST` | `/api/payment/create-checkout-session` | Payment gateway checkout session | Private |

---

## 🛡️ Security & Privacy
- Resumes are processed in-memory for document text parsing and discarded.
- Passwords are hashed with `bcryptjs`.
- Strict prompt guardrails prevent prompt injection and hallucination.

<p align="center">
  <img src="https://img.shields.io/badge/IMPERIALS-Luxury%20Fashion-D4AF37?style=for-the-badge&labelColor=0A0A0A&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDJMMiA3bDEwIDUgMTAtNS0xMC01eiIvPjxwYXRoIGQ9Ik0yIDE3bDEwIDUgMTAtNSIvPjxwYXRoIGQ9Ik0yIDEybDEwIDUgMTAtNSIvPjwvc3ZnPg==" alt="IMPERIALS">
</p>

<h1 align="center">✦ IMPERIALS ✦</h1>

<p align="center">
  <em>An Ultra-Luxury Fashion E-Commerce Experience</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Google%20Cloud-Run-4285F4?style=flat-square&logo=googlecloud" alt="Cloud Run">
  <img src="https://img.shields.io/badge/Gemini-AI%20Concierge-886FBF?style=flat-square&logo=google" alt="Gemini AI">
</p>

<p align="center">
  <a href="https://imperials-frontend-4hwdib62gq-uc.a.run.app"><strong>🌐 Live Demo</strong></a> &nbsp;·&nbsp;
  <a href="https://imperials-backend-4hwdib62gq-uc.a.run.app/docs"><strong>📡 API Docs</strong></a>
</p>

---

## 📖 Overview

**IMPERIALS** is a full-stack luxury fashion e-commerce platform built with a minimalist editorial aesthetic. It combines a blazing-fast **Next.js 16** frontend with a robust **FastAPI** backend, powered by **Google Gemini AI** for an intelligent personal shopping concierge. The entire platform is containerized and deployed on **Google Cloud Run** for seamless scalability.

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client["🖥️ Client Browser"]
        UI["Next.js 16 Frontend<br/>React 19 + TypeScript"]
    end

    subgraph GCP["☁️ Google Cloud Platform"]
        subgraph CloudRun["Cloud Run Services"]
            FE["imperials-frontend<br/>Node.js 22 Alpine<br/>Port 8080"]
            BE["imperials-backend<br/>Python 3.11 Slim<br/>Port 8080"]
        end
        GEMINI["Gemini 2.5 Flash<br/>AI Model"]
    end

    UI -->|HTTPS| FE
    FE -->|API Calls| BE
    BE -->|AI Concierge| GEMINI

    style Client fill:#1a1a1a,stroke:#D4AF37,color:#fff
    style GCP fill:#0d1117,stroke:#4285F4,color:#fff
    style CloudRun fill:#161b22,stroke:#30a14e,color:#fff
    style FE fill:#000,stroke:#D4AF37,color:#D4AF37
    style BE fill:#000,stroke:#009688,color:#009688
    style GEMINI fill:#000,stroke:#886FBF,color:#886FBF
    style UI fill:#000,stroke:#fff,color:#fff
```

---

## 🔄 Request Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant FE as 🖥️ Frontend<br/>(Next.js)
    participant BE as ⚙️ Backend<br/>(FastAPI)
    participant AI as 🤖 Gemini AI

    U->>FE: Visit Store
    FE->>BE: GET /products
    BE-->>FE: Product Catalog (JSON)
    FE-->>U: Render Collection

    U->>FE: Add to Cart
    FE->>FE: localStorage Update

    U->>FE: Proceed to Checkout
    FE->>BE: POST /process-payment
    BE-->>FE: Payment Confirmation
    FE-->>U: Success Animation

    U->>FE: Open AI Concierge
    FE->>BE: POST /chat
    BE->>AI: Generate Response
    AI-->>BE: AI Response
    BE-->>FE: Concierge Reply
    FE-->>U: Display Message
```

---

## 📁 Project Structure

```mermaid
graph LR
    subgraph Root["📦 imperial"]
        direction TB
        subgraph Backend["⚙️ backend/"]
            B1["main.py"]
            B2["requirements.txt"]
            B3["Dockerfile"]
        end
        subgraph Frontend["🖥️ frontend/"]
            direction TB
            subgraph App["src/app/"]
                A1["page.tsx — Home"]
                A2["about/page.tsx"]
                A3["checkout/page.tsx"]
                A4["contact/page.tsx"]
                A5["layout.tsx"]
                A6["globals.css"]
            end
            subgraph Components["src/components/"]
                C1["Header.tsx"]
                C2["ProductGrid.tsx"]
                C3["CartDrawer.tsx"]
                C4["AiChatFab.tsx"]
                C5["GlobalLayout.tsx"]
                C6["ui/button.tsx"]
                C7["ui/spotlight-background.tsx"]
            end
            subgraph Hooks["src/hooks/"]
                H1["useCart.tsx"]
            end
            F1["Dockerfile"]
            F2["next.config.ts"]
            F3["package.json"]
        end
    end

    style Root fill:#0d1117,stroke:#D4AF37,color:#fff
    style Backend fill:#161b22,stroke:#009688,color:#009688
    style Frontend fill:#161b22,stroke:#D4AF37,color:#D4AF37
    style App fill:#1a1a2e,stroke:#4285F4,color:#fff
    style Components fill:#1a1a2e,stroke:#886FBF,color:#fff
    style Hooks fill:#1a1a2e,stroke:#30a14e,color:#fff
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛍️ **Product Catalog** | Curated luxury collection with elegant hover animations and responsive grid layout |
| 🛒 **Smart Cart** | Persistent shopping cart with localStorage, quantity management, and slide-out drawer |
| 💳 **Simulated Checkout** | Full checkout flow with payment processing simulation and success animations |
| 🤖 **AI Concierge** | Gemini-powered chat assistant with sophisticated luxury brand personality |
| 📬 **Contact Concierge** | Inquiry form with Google Maps integration for flagship boutique location |
| 🌟 **Spotlight Background** | Dynamic spotlight cursor effect using Framer Motion for premium feel |
| 📱 **Fully Responsive** | Optimized for all screen sizes from mobile to ultra-wide displays |

---

## 🛠️ Tech Stack

```mermaid
graph LR
    subgraph Frontend["Frontend"]
        N["Next.js 16"] --> R["React 19"]
        N --> TS["TypeScript 5"]
        N --> TW["TailwindCSS 4"]
        N --> FM["Framer Motion"]
        N --> LR2["Lucide React"]
        N --> SC["Shadcn UI"]
    end

    subgraph Backend_["Backend"]
        FA["FastAPI"] --> PY["Python 3.11"]
        FA --> PD["Pydantic"]
        FA --> UV["Uvicorn"]
        FA --> GG["Google Generative AI"]
    end

    subgraph Infra["Infrastructure"]
        CR["Cloud Run"] --> DC["Docker"]
        CR --> GCP2["Google Cloud"]
    end

    style Frontend fill:#000,stroke:#D4AF37,color:#D4AF37
    style Backend_ fill:#000,stroke:#009688,color:#009688
    style Infra fill:#000,stroke:#4285F4,color:#4285F4
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.9.0
- **Python** >= 3.11
- **Docker** (optional, for containerized deployment)

### Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/DhruvGarg436/imperial.git
cd imperial
```

#### 2. Start the Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # On Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

---

## 🐳 Docker Deployment

### Backend

```bash
cd backend
docker build -t imperials-backend .
docker run -p 8080:8080 -e GEMINI_API_KEY=your_key imperials-backend
```

### Frontend

```bash
cd frontend
docker build -t imperials-frontend .
docker run -p 3000:8080 imperials-frontend
```

---

## ☁️ Cloud Run Deployment

Both services are currently deployed on Google Cloud Run:

| Service | Region | URL |
|---------|--------|-----|
| `imperials-backend` | us-central1 | [Backend API](https://imperials-backend-4hwdib62gq-uc.a.run.app) |
| `imperials-frontend` | us-central1 | [Live Frontend](https://imperials-frontend-4hwdib62gq-uc.a.run.app) |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Retrieve the luxury product catalog |
| `POST` | `/process-payment` | Process a simulated payment transaction |
| `POST` | `/contact-submit` | Submit a concierge inquiry |
| `POST` | `/chat` | Interact with the AI Concierge |

> 📘 **Interactive API documentation** available at [`/docs`](https://imperials-backend-4hwdib62gq-uc.a.run.app/docs)

---

## 🔑 Environment Variables

| Variable | Service | Description |
|----------|---------|-------------|
| `GEMINI_API_KEY` | Backend | Google Gemini API key for AI Concierge |
| `NEXT_PUBLIC_API_URL` | Frontend | Backend API URL (defaults to `http://localhost:8000`) |

---

## 📄 License

This project is built for the **Google Build with AI** hackathon.

---

<p align="center">
  <strong>✦ IMPERIALS ✦</strong><br/>
  <em>Where Elegance Meets Innovation</em>
</p>

# Cloud Incident Copilot

> AI-powered incident response platform - zero cost, event-driven, portfolio-quality.

A two-person CS collaboration project that ingests application logs and deployment events, detects incidents automatically, and generates AI-assisted root-cause reports through a web dashboard.

---

## Architecture

```
Demo App / Log Generator
        │
        ▼
Render Backend API (Fastify + TypeScript)
        │
        ▼
AWS SQS Queue  ◄── ElasticMQ locally
        │
        ▼
AWS Lambda Worker
        │
        ▼
AWS DynamoDB  ◄── DynamoDB Local locally
        │
        ▼
Vercel Frontend Dashboard (Next.js)
        │
        ▼
AI Incident Report (Mock or Local Ollama)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS, Vercel Hobby |
| Backend API | Fastify, TypeScript, Render Free |
| Queue | AWS SQS (ElasticMQ locally) |
| Worker | AWS Lambda |
| Database | AWS DynamoDB (DynamoDB Local) |
| AI | Mock report generator / optional Ollama |
| Local dev | Docker Compose |

---

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm 9+ - install with `npm install -g pnpm`
- Docker Desktop

### Steps

```bash
# 1. Clone the repo
git clone <repo-url>
cd cloud-incident-copilot

# 2. Copy environment variables
cp .env.example .env

# 3. Install all dependencies
pnpm install

# 4. Start local infrastructure (DynamoDB + ElasticMQ)
docker compose up -d

# 5. Start the backend
pnpm dev:backend

# 6. Start the frontend (new terminal)
pnpm dev:frontend
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Backend health: http://localhost:3001/health
- DynamoDB Local: http://localhost:8000
- ElasticMQ UI: http://localhost:9325

---

## Project Structure

```
cloud-incident-copilot/
├── apps/
│   ├── backend/          # Fastify API - Student A
│   │   └── src/
│   │       ├── routes/   # HTTP endpoints
│   │       ├── middleware/  # Auth, validation hooks
│   │       └── lib/      # Queue + DynamoDB clients
│   └── frontend/         # Next.js dashboard - Student B
│       └── src/
│           ├── app/      # Next.js App Router pages
│           ├── components/  # Shared UI components
│           └── lib/      # API client
├── packages/
│   └── types/            # Shared TypeScript types (both)
├── infra/
│   ├── lambda/           # SQS worker - Student A
│   └── elasticmq.conf    # Local queue config
├── docs/                 # Architecture docs, API contracts
├── docker-compose.yml
└── .env.example
```

---

## Phase Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| 0 | Scope & planning | ✅ Done |
| 1 | Repo & foundation | 🔄 In progress |
| 2 | Event ingestion API | ⏳ Upcoming |
| 3 | Queue, worker, persistence | ⏳ Upcoming |
| 4 | Incident detection | ⏳ Upcoming |
| 5 | Dashboard & UI | ⏳ Upcoming |
| 6 | AI incident reports | ⏳ Upcoming |
| 7 | Timeline & alerts | ⏳ Upcoming |
| 8 | Free-tier deployment | ⏳ Upcoming |
| 9 | Testing & portfolio polish | ⏳ Upcoming |

---

## Collaboration

| Area | Owner |
|------|-------|
| Backend API, SQS, Lambda, DynamoDB, Incident Detection | Student A |
| Frontend Dashboard, AI Reports, Docs, Demo Scenarios | Student B |

All work happens on feature branches. No direct pushes to `main`. Every PR is reviewed by the other person before merging.

---

## Constraints

- **Zero cost** - no paid services, no paid APIs
- **Local-first** - full system runs locally via Docker Compose
- **Free deployment only** - Vercel Hobby, Render Free, AWS Free Tier
- **AI fallback** - mock AI reports always work; Ollama is optional

---

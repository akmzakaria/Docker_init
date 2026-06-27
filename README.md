# Docker Init — Express + Redis + PostgreSQL

A Node.js/TypeScript REST API using Express, Redis, and PostgreSQL, fully containerized with Docker and deployed via a GitHub Actions CI/CD pipeline to Render.

## Tech Stack

- **Runtime**: Node.js 24, TypeScript
- **Framework**: Express 5
- **Cache**: Redis
- **Database**: PostgreSQL 18
- **Package Manager**: pnpm
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions → Docker Hub → Render

## Project Structure

```
├── src/
│   └── server.ts        # Express app entry point
├── Dockerfile
├── docker-compose.yml   # App + PostgreSQL + pgAdmin
├── .github/
│   └── workflows/
│       ├── ci.yml       # Type-check on push/PR
│       └── cd.yml       # Build & push Docker image, deploy to Render
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/installation)

### Local Development

1. Clone the repo and install dependencies:
   ```bash
   pnpm install
   ```

2. Create a `.env` file:
   ```env
   REDIS_URL=redis://<user>:<password>@<host>:<port>
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db>
   ```

3. Start the server:
   ```bash
   pnpm dev
   ```

### Run with Docker Compose

```bash
docker compose up --build
```

This starts:
| Service     | URL                        |
|-------------|----------------------------|
| App         | http://localhost:3000       |
| PostgreSQL  | localhost:5433              |
| pgAdmin     | http://localhost:5050       |

## API

| Method | Route | Description        |
|--------|-------|--------------------|
| GET    | `/`   | Health check       |

## CI/CD Pipeline

| Workflow | Trigger              | Action                                      |
|----------|----------------------|---------------------------------------------|
| CI       | Push / PR → `main`   | Install deps, type-check (`tsc --noEmit`)   |
| CD       | Push → `main`        | Build & push Docker image, trigger Render deploy hook |

### Required GitHub Secrets

| Secret                  | Description                        |
|-------------------------|------------------------------------|
| `DOCKERHUB_USERNAME`    | Docker Hub username                |
| `DOCKERHUB_TOKEN`       | Docker Hub access token            |
| `RENDER_DEPLOY_HOOK_URL`| Render deploy hook URL             |

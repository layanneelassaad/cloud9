# Cloud9 — Course Management Service (Monorepo)

A Columbia-specific, microservices-based event & course engagement platform. Back end services are built with **FastAPI**, the UI with **React**, and the data tier uses **AWS RDS**. Services are deployed to **AWS EC2** using Docker. The **Composite Service** aggregates cross-service data for richer views.

## Background

Cloud9 is a course and campus engagement platform. Students discover events, RSVP, and interact with organizations; organizers manage profiles and publish events. The system is intentionally split into small, focused services that can scale independently and evolve without blocking each other.

This monorepo brings together previously separate repositories:
- **event-service** (FastAPI + MySQL)
- **organization-service** (FastAPI + SQLAlchemy + MySQL)
- **rsvp-service** (FastAPI + SQLAlchemy + MySQL)
- **composite-service** (FastAPI + GraphQL; federates the others)
- **frontend** (React)


**Services**
- **event-service**: CRUD events  
- **organization-service**: org profiles  
- **rsvp-service**: RSVPs per event  
- **composite-service**: joins data across services; adds GraphQL  
- **frontend**: React app (Create React App)

**Default ports**: Events `8001`, Orgs `8002`, RSVP `8003`, Composite `8004`, Frontend `3000`.

## Setup:
> **Prereqs**: Docker + Docker Compose, Node 18+, Python 3.10+ (only if running services natively).

1) **Create env files**
    ```bash
   services/event-service/.env`
    DB_USER=appDB_PASSWORD=app
    DB_HOST=db
    DB_PORT=3306
    DB_NAME=events_db
    
    `services/organization-service/.env`
    DB_USER=app
    DB_PASSWORD=app
    DB_HOST=db
    DB_PORT=3306
    DB_NAME=organization_db

    `services/rsvp-service/.env`
    DB_USER=app
    DB_PASSWORD=app
    DB_HOST=db
    DB_PORT=3306
    DB_NAME=rsvp_management

    `services/composite-service/.env`
    EVENT_SERVICE_URL=http://event-service:8000
    ORG_SERVICE_URL=http://organization-service:8000
    RSVP_SERVICE_URL=http://rsvp-service:8000

    `frontend/.env.local`
    REACT_APP_EVENTS_URL=http://localhost:8001
    REACT_APP_ORGS_URL=http://localhost:8002
    REACT_APP_RSVP_URL=http://localhost:8003
    REACT_APP_COMPOSITE_URL=http://localhost:8004
   ```


2) Run:
    ```bash
   cd infra/docker
    docker compose up --build
    # UI: http://localhost:3000
    # APIs: http://localhost:8001|8002|8003|8004/docs
    # GraphQL: POST http://localhost:8004/graphql
   ```

## API:
Minimal API Cheatsheet

- Events:
GET /events · POST /events · GET /events/{id} · PUT /events/{id} · DELETE /events/{id}

- Organizations: GET /organizations · POST /organizations/ · GET /organizations/{id} · PUT /organizations/{id} · DELETE /organizations/{id}

- RSVP: POST /events/{event_id}/rsvps/ · GET /events/{event_id}/rsvps/ · GET/PUT/DELETE /rsvps/{rsvp_id}

- Composite:
  1) GET /event/{event_id}/rsvps (event + filtered RSVPs)
  2) GET /organization/event/{organization_id} (org + events)
  3) GraphQL POST /graphql (query events(limit:), rsvps(limit:))
   ```bash
   uery {
  events(limit: 5) { id name date rsvpCount }
  rsvps(limit: 5) { id name status }
   }
   ```
  5) q

## Tech Stack

- **Backend**: Python 3.10+, FastAPI, Uvicorn, SQLAlchemy, PyMySQL/MySQL Connector
- **DB**: MySQL 8 (AWS RDS in prod; Dockerized in dev)
- **GraphQL**: `graphql-core` (server in composite-service)
- **Frontend**: React (Create React App)
- **Infra**: Docker Compose (local), AWS EC2 + RDS (prod), optional k8s/Terraform



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

## Tech Stack

- **Backend**: Python 3.10+, FastAPI, Uvicorn, SQLAlchemy, PyMySQL/MySQL Connector
- **DB**: MySQL 8 (AWS RDS in prod; Dockerized in dev)
- **GraphQL**: `graphql-core` (server in composite-service)
- **Frontend**: React (Create React App)
- **Infra**: Docker Compose (local), AWS EC2 + RDS (prod), optional k8s/Terraform


## Architecture (high level)
- **Microservices**: FastAPI services on EC2 (Dockerized)
- **API Gateway / Routing**: Nginx or ALB → per-service containers
- **DB**: AWS RDS (e.g., PostgreSQL)
- **Front End**: React (served by Node/NGINX or S3+CloudFront)
- **CI/CD**: GitHub Actions (build, test, Docker image push), optional GHCR/ECR
- **Infra**: Docker Compose for local; EC2 for prod (optionally ECS/EKS later)


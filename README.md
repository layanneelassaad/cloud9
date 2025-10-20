# Cloud9 — Course Management Service (Monorepo)

A Columbia-specific, microservices-based event & course engagement platform. Back end services are built with **FastAPI**, the UI with **React**, and the data tier uses **AWS RDS**. Services are deployed to **AWS EC2** using Docker. The **Composite Service** aggregates cross-service data for richer views.

## Highlights
- **User & RSVP**: Registration, auth, profiles, RSVP tracking
- **Organization**: Organization profiles and event creation
- **Event Management**: Event CRUD, RSVP aggregation, updates
- **Composite**: Cross-service aggregation (e.g., combined event + RSVP views)
- **Frontend**: React.js + Material UI; responsive, CI-ready

## Architecture (high level)
- **Microservices**: FastAPI services on EC2 (Dockerized)
- **API Gateway / Routing**: Nginx or ALB → per-service containers
- **DB**: AWS RDS (e.g., PostgreSQL)
- **Front End**: React (served by Node/NGINX or S3+CloudFront)
- **CI/CD**: GitHub Actions (build, test, Docker image push), optional GHCR/ECR
- **Infra**: Docker Compose for local; EC2 for prod (optionally ECS/EKS later)


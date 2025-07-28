# OpenInnovation Task

## Overview

This project is a mono repo that uses Docker Compose in dev environment 

- Dashboard - React with Vite
- API - Node.js Server with Express
- Database - Postgresql

---

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Getting Started

### 1. Copy the example env files

```bash
cp .env.example .env
cp api/.env.example api/.env
```

### 2. Run dev environment using Docker Compose

```bash
docker compose up -d
```

### 3. Once all of the containers are up and running, you should be able to access the dashboard at http://localhost:5173
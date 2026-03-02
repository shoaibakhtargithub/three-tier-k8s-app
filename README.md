#  Kubernetes 3-Tier ToDo Application

This project demonstrates a complete **3-tier containerized ToDo application** deployed on Kubernetes using:

-  Frontend (React + Nginx)
-  Backend (Node.js + Express)
-  Database (MySQL)
-  Kubernetes (Deployments, Services, Secrets, ConfigMaps)
-  Docker
-  Minikube (Local Kubernetes Cluster)
---
##  Architecture

Browser
↓
Frontend (NodePort Service)
↓
Backend (ClusterIP Service)
↓
MySQL (ClusterIP Service)
---
##  Tech Stack

- React (Frontend)
- Node.js + Express (Backend)
- MySQL 8.0
- Docker
- Kubernetes
- Minikube
---
##  Docker Images
Images are available on Docker Hub:

- Frontend → `shoaibakhtar003/frontend-todo-app`
- Backend → `shoaibakhtar003/backend-todo-app`
---
##  Kubernetes Configuration

###  Secret (Sensitive Data)

Stores:
- DB_USER
- DB_PASSWORD
- MYSQL_ROOT_PASSWORD

###  ConfigMap (Non-Sensitive Data)

Stores:
- DB_NAME
- DB_HOST
- DB_PORT
---
##  Key Learnings
- Inter-pod communication using ClusterIP
- Secret management in Kubernetes
- ConfigMap usage
- Port-forward vs NodePort
- Docker multi-stage builds
- Handling startup order issues (Backend ↔ Database)


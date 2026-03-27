## Overview

A production-grade Azure Kubernetes Service (AKS) cluster fully provisioned and managed through Terraform. This project demonstrates how to build enterprise-ready Kubernetes infrastructure from scratch.

## Planned Architecture

The cluster will include:

- **Networking**: Custom VNet with separate subnets for nodes, pods, and services
- **Node Pools**: System and user node pools with autoscaling
- **RBAC**: Azure AD integration for role-based access control
- **Monitoring**: Prometheus + Grafana stack deployed via Helm
- **Ingress**: NGINX Ingress Controller with cert-manager for TLS

## Goals

1. Fully reproducible infrastructure — destroy and recreate in minutes
2. Security-first design with network policies and pod security standards
3. Observability built in from day one, not bolted on later
4. Cost optimization through autoscaling and spot instances for non-critical workloads

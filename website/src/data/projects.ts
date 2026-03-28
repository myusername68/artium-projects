export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  status: "completed" | "in-progress" | "planned";
  repoUrl?: string;
  docsPath?: string;
  thumbnail?: string;
  content?: string; // Fallback — prefer devops/docs/{id}.md
}

export const projects: Project[] = [
  {
    id: "portfolio-site",
    title: "Portfolio Website on GCP Cloud Run",
    description:
      "This website itself — a React app containerized with Docker, deployed to GCP Cloud Run via Terraform, with a GitHub Actions CI/CD pipeline.",
    tools: ["GCP Cloud Run", "Docker", "Terraform", "GitHub Actions", "gcp bucket"],
    status: "completed",
    repoUrl: "https://github.com/myusername68/artium-projects",
    docsPath: "devops/docs/portfolio-site.md",
  },
  {
    id: "aks-terraform",
    title: "AKS Infrastructure with Terraform",
    description:
      "Production-ready Azure Kubernetes Service cluster provisioned with Terraform. Includes networking, RBAC, monitoring, and Helm chart deployments.",
    tools: [                                                                                                        
        "Azure",                                                                                                      
        "AKS",                                                                                                            "Kubernetes",
        "Terraform",                                                                                                  
        "Helm",
        "ArgoCD",
        "ACR",
        "Prometheus",
        "Grafana",
        "GitHub Actions",
        "OIDC",
        "Azure AD",
        "GCP",
        "Azure CNI",
      ],
    repoUrl: "https://github.com/myusername68/azure-aks.git",
    status: "completed",
    docsPath: "devops/docs/aks-terraform.md",

  },
];

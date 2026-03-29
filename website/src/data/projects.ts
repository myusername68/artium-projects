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
  remoteDocsUrl?: string; // Raw GitHub URL for docs in other repos
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
    remoteDocsUrl: "https://raw.githubusercontent.com/myusername68/azure-aks/main/README.md",

  },
  {
    id: "ai-cli",
    title: "AI CLI Helper — Command Syntax Assistant",
    description:
      "A zero-dependency CLI assistant that answers straight from your terminal. Supports **Google Gemini** and **Ollama** (local models), with smart agents that fetch context only when needed.",
    tools: [                                                                                                        
        "cli",   
        "python",
        "powershell",
        "bash",                                                                                                                                                                                            
      ],
    repoUrl: "",
    status: "completed",
    remoteDocsUrl: "https://raw.githubusercontent.com/myusername68/ak-cli/main/README.md",

  },
  {
    id: "GCP-cloud-explained",
    title: "GCP Cloud Explained",
    description:
      "This project documents my learning path in GCP.",
    tools: ["GCP"],
    status: "planned",
  },

];

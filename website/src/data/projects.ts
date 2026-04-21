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
    repoUrl: "https://github.com/myusername68/ak-cli.git",
    status: "completed",
    remoteDocsUrl: "https://raw.githubusercontent.com/myusername68/ak-cli/main/README.md",

  },
  {
    id: "ai-skills-template",
    title: "AI Skills Template",
    description:
      "Portable AI skills, prompts, and MCP server configs that work across multiple tools. Includes an install script for quick setup on new machines.",
    tools: ["Bash", "Claude Code", "Gemini CLI", "GitHub Copilot"],
    status: "completed",
    repoUrl: "https://github.com/myusername68/AI-skills-template",
    remoteDocsUrl: "https://raw.githubusercontent.com/myusername68/AI-skills-template/main/README.md",
  },
  {
    id: "GCP-n8n",
    title: "GCP n8n",
    description:
        "Production-ready, zero-password n8n deployment on GCP. Modular Terraform, IAM-only auth, Workload Identity Federation, and one-variable scaling from $64/mo serverless to high-availability VMs.",    
    tools: ["GCP", "Terraform", "Docker", "GitHub Actions", "Go", "PostgreSQL", "Redis", "Bash", "PowerShell", "OpenTelemetry"],    
    status: "completed",
    remoteDocsUrl: "https://raw.githubusercontent.com/myusername68/n8n-gcp/main/README.md",
    repoUrl: "https://github.com/myusername68/n8n-gcp",
  },
  {                                                                                                      
      id: "ollama-rdna1",
      title: "ollama-rdna1",                                                                             
      description:                                                                                       
          "Drop-in Ollama replacement for AMD RDNA 1 GPUs (RX 5500/5600/5700) using llama.cpp + Vulkan. No ROCm needed. Supports text, vision, and audio models with Ollama-compatible and OpenAI-compatible APIs.",  
      tools: ["Bash", "Python", "llama.cpp", "Vulkan", "Linux"],                                         
      status: "completed",                                                                               
      remoteDocsUrl: "https://raw.githubusercontent.com/myusername68/ollama-rdna1/main/README.md",
      repoUrl: "https://github.com/myusername68/ollama-rdna1",                                           
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

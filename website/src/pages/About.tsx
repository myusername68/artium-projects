export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Me</h1>
      <div className="space-y-4 text-gray-600 dark:text-gray-400">
        <p>
          5 years of DevOps experience. Azure specialist. Kubernetes enthusiast.
          I bridge the gap between legacy financial systems and modern cloud architecture, having spent years navigating the unique challenges of air-gapped environments.
          Whether I’m migrating a full system to Azure or building managed K8s from the ground up, I am obsessed with one thing: automating away the friction.
        </p>
        <p>
          This site serves as both my portfolio and a living document of my work. Each project
          is built, documented, and shared — the infrastructure behind this website included.
        </p>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-12 mb-4">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          "Azure",
          "GCP",
          "Kubernetes",
          "Terraform",
          "Docker",
          "GitHub Actions",
          "Azure Devops",
          "CI/CD",
          "Linux",
          "AI Automation",
        ].map((skill) => (
          <div
            key={skill}
            className="text-sm px-4 py-2 border border-gray-200 dark:border-gray-800 rounded text-center text-gray-700 dark:text-gray-300"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

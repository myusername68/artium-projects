import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          DevOps Engineer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Building reliable infrastructure with Azure, Kubernetes, and Terraform.
          Documenting the journey along the way.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Projects
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            About Me
          </Link>
        </div>
      </section>

      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cloud Infrastructure</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Azure, GCP — designing and deploying scalable cloud architectures.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Containers & Orchestration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Docker and Kubernetes for consistent, portable deployments.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Infrastructure as Code</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Terraform for reproducible, version-controlled infrastructure.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

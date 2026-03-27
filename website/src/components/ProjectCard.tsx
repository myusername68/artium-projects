import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  planned: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="block border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded"
          >
            {tool}
          </span>
        ))}
      </div>
    </Link>
  );
}

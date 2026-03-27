import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { projects } from "../data/projects";
import { projectDocs } from "../data/docs";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h1>
        <Link to="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/projects" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
        &larr; Back to projects
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
            project.status === "completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : project.status === "in-progress"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          }`}>
            {project.status}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="text-sm px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded"
          >
            {tool}
          </span>
        ))}
      </div>

      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm mb-10"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          View Repository
        </a>
      )}

      {(projectDocs[project.id] || project.content) && (
        <article className="prose prose-gray dark:prose-invert max-w-none
          prose-headings:text-gray-900 dark:prose-headings:text-white
          prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4
          prose-li:text-gray-600 dark:prose-li:text-gray-400
          prose-strong:text-gray-900 dark:prose-strong:text-white
          prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-ol:list-decimal prose-ul:list-disc
          prose-img:rounded-lg prose-img:my-6
          border-t border-gray-200 dark:border-gray-800 pt-8
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {projectDocs[project.id] || project.content || ""}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
}

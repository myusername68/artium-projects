export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Profile photo & name */}
        <div className="flex flex-col items-center md:items-start shrink-0">
          <img
            src="/profile.jpg"
            alt="Artium"
            className="w-40 h-40 rounded-full object-cover bg-gray-200 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Artium</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">DevOps Engineer</p>
        </div>

        {/* Bio & links */}
        <div className="flex-1">
          <div className="space-y-4 text-gray-600 dark:text-gray-400 mb-8">
            <p>
              I'm a DevOps engineer with experience across Azure, and GCP. I specialize in
              building scalable infrastructure using Kubernetes, Terraform, and modern CI/CD practices.
            </p>
            <p>
              I built this site as both my portfolio and a living document of my work — the
              infrastructure behind it is one of the projects showcased here.
            </p>
          </div>

          <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Get in touch
          </h2>
          <div className="space-y-3">
            <a
              href="https://github.com/myusername68"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <div>
                <div className="text-sm font-medium">GitHub</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">myusername68</div>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/artium-krichevsky-899406219"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <div>
                <div className="text-sm font-medium">LinkedIn</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">Artium Krichevsky</div>
              </div>
            </a>
            <a
              href="mailto:artiym68@gmail.com"
              className="flex items-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <div>
                <div className="text-sm font-medium">Email</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">artiym68@gmail.com</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

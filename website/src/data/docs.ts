const markdownFiles = import.meta.glob("../../../devops/docs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Map file paths to project IDs
// e.g. "../../../devops/docs/portfolio-site.md" → "portfolio-site"
export const projectDocs: Record<string, string> = {};
for (const [path, content] of Object.entries(markdownFiles)) {
  const id = path.split("/").pop()?.replace(".md", "") ?? "";
  projectDocs[id] = content;
}

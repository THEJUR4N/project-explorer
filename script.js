
"use strict";

/*
 * THEJUR4N | Project Explorer
 * Project data and interactive search.
 */

const projects = [
  {
    name: "Project Explorer",
    category: "web",
    description:
      "An interactive developer portfolio with live search, technology filters, responsive design and a curated project collection.",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/THEJUR4N/project-explorer",
    featured: true,
    icon: "</>"
  },
  {
    name: "THEJUR4N Profile",
    category: "tools",
    description:
      "A bilingual GitHub profile featuring a custom terminal visual and a developer-focused presentation.",
    technologies: ["Markdown", "SVG", "GitHub"],
    url: "https://github.com/THEJUR4N/THEJUR4N",
    featured: true,
    icon: "~$"
  },
  {
    name: "roepard-login",
    category: "web",
    description:
      "A forked repository based on roepard-homelab. Reviewing its code and personal contributions before presenting it as a portfolio project.",
    technologies: ["JavaScript", "PHP", "MySQL"],
    url: "https://github.com/THEJUR4N/roepard-login",
    featured: false,
    icon: "{ }"
  },
  {
    name: "AI & Data Explorer",
    category: "data",
    description:
      "A planned demonstration project exploring natural-language data queries and interactive visualizations. Development and implementation details will be documented as the project evolves.",
    technologies: ["Python", "SQL", "AI"],
    url: "https://github.com/THEJUR4N",
    featured: false,
    icon: "AI"
  },
  {
    name: "Inventory Manager",
    category: "data",
    description:
      "A planned CRUD application for managing inventory records, with a focus on database operations, validation and reliable data handling.",
    technologies: ["PHP", "MySQL", "SQL"],
    url: "https://github.com/THEJUR4N",
    featured: false,
    icon: "DB"
  }
];

const categoryLabels = {
  web: "Web development",
  data: "Data & AI",
  tools: "Tools & experiments"
};

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const sortFilter = document.querySelector("#sort-filter");
const projectGrid = document.querySelector("#project-grid");
const projectCount = document.querySelector("#project-count");
const emptyState = document.querySelector("#empty-state");
const clearFiltersButton = document.querySelector("#clear-filters");

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const top = document.createElement("div");
  top.className = "card-top";

  const icon = document.createElement("span");
  icon.className = "card-icon";
  icon.textContent = project.icon;
  icon.setAttribute("aria-hidden", "true");

  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = categoryLabels[project.category];

  top.append(icon, category);

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "tag-list";
  tags.setAttribute("aria-label", "Technologies");

  project.technologies.forEach((technology) => {
    const tag = document.createElement("span");
    tag.className = "tech-tag";
    tag.textContent = technology;
    tags.appendChild(tag);
  });

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View project ↗";

  article.append(top, title, description, tags, link);

  if (project.featured) {
    article.dataset.featured = "true";
  }

  return article;
}

function getFilteredProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const sort = sortFilter.value;

  const filtered = projects.filter((project) => {
    const matchesCategory =
      category === "all" || project.category === category;

    const searchableText = [
      project.name,
      project.description,
      project.category,
      ...project.technologies
    ].join(" ").toLowerCase();

    const matchesQuery = searchableText.includes(query);

    return matchesCategory && matchesQuery;
  });

  filtered.sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }

    return Number(b.featured) - Number(a.featured)
      || a.name.localeCompare(b.name);
  });

  return filtered;
}

function renderProjects() {
  const filteredProjects = getFilteredProjects();
  const fragment = document.createDocumentFragment();

  filteredProjects.forEach((project) => {
    fragment.appendChild(createProjectCard(project));
  });

  projectGrid.replaceChildren(fragment);

  const count = filteredProjects.length;
  projectCount.textContent =
    `${count} ${count === 1 ? "project" : "projects"}`;

  emptyState.hidden = count !== 0;
  projectGrid.hidden = count === 0;
}

function clearFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  sortFilter.value = "featured";
  renderProjects();
  searchInput.focus();
}

searchInput.addEventListener("input", renderProjects);
categoryFilter.addEventListener("change", renderProjects);
sortFilter.addEventListener("change", renderProjects);
clearFiltersButton.addEventListener("click", clearFilters);

document.addEventListener("keydown", (event) => {
  const isSearchShortcut =
    event.key === "/" &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey;

  const activeElement = document.activeElement;
  const isTyping =
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement instanceof HTMLSelectElement ||
    activeElement?.isContentEditable;

  if (isSearchShortcut && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && activeElement === searchInput) {
    searchInput.value = "";
    renderProjects();
  }
});

renderProjects();

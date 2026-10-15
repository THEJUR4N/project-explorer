
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const clearButton = document.querySelector("#clear-search");
const resultsSection = document.querySelector("#results-section");
const resultsHeading = document.querySelector("#results-heading");
const resultTitle = document.querySelector("#result-title");
const resultDescription = document.querySelector("#result-description");

const portfolioUrl =
  "https://thejur4n.github.io/project-explorer/";

const githubUrl = "https://github.com/THEJUR4N";

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function searchPortfolio(query) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    searchInput.focus();
    return;
  }

  const isMyName =
    /\b(thejur4n|th3jur4n|juan esteban echeverry sanchez|juan esteban echeverry|juan echeverry)\b/i
      .test(normalizedQuery);

  resultsSection.hidden = false;

  if (isMyName) {
    resultsHeading.textContent = "Se encontró el perfil solicitado.";
    resultTitle.textContent = "TH3JUR4N — Portafolio de desarrollador";
    resultDescription.textContent =
      "Explora mi perfil, proyectos y habilidades en desarrollo de software, datos e inteligencia artificial.";
  } else {
    resultsHeading.replaceChildren();

    const prefix = document.createTextNode("Se muestran resultados de ");

    const profileLink = document.createElement("a");
    profileLink.href = githubUrl;
    profileLink.target = "_blank";
    profileLink.rel = "noopener noreferrer";
    profileLink.textContent = "TH3JUR4N";
    profileLink.className = "profile-inline-link";

    resultsHeading.append(prefix, profileLink, document.createTextNode("."));

    resultTitle.textContent = "TH3JUR4N — Portafolio de desarrollador";
    resultDescription.textContent =
      `Buscaste "${query}". Descubre mi perfil, proyectos y tecnologías en desarrollo de software, datos e inteligencia artificial.`;
  }

  resultTitle.href = portfolioUrl;

  clearButton.hidden = searchInput.value.length === 0;

  resultsSection.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchPortfolio(searchInput.value);
});

searchInput.addEventListener("input", function () {
  clearButton.hidden = searchInput.value.length === 0;
});

clearButton.addEventListener("click", function () {
  searchInput.value = "";
  clearButton.hidden = true;
  resultsSection.hidden = true;
  searchInput.focus();
});

document.querySelectorAll("[data-query]").forEach(function (button) {
  button.addEventListener("click", function () {
    const query = button.dataset.query;
    searchInput.value = query;
    searchPortfolio(query);
  });
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "/" &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape") {
    searchInput.value = "";
    clearButton.hidden = true;
    resultsSection.hidden = true;
  }
});

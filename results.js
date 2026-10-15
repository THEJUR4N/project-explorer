
const params = new URLSearchParams(window.location.search);
const query = (params.get("q") || "").trim();

const searchInput = document.querySelector("#results-search-input");
const resultsSummary = document.querySelector("#results-summary");

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isMyName(text) {
  const normalized = normalizeText(text);

  return /\b(thejur4n|th3jur4n|juan esteban echeverry sanchez|juan esteban echeverry|juan echeverry)\b/i
    .test(normalized);
}

if (searchInput) {
  searchInput.value = query;
}

if (resultsSummary) {
  if (!query) {
    resultsSummary.textContent = "Escribe algo en el buscador para ver resultados.";
  } else if (isMyName(query)) {
    resultsSummary.textContent = "Resultado para tu búsqueda.";
  } else {
    resultsSummary.replaceChildren();

    resultsSummary.append(
      document.createTextNode("Se muestran resultados de ")
    );

    const profileLink = document.createElement("a");
    profileLink.href = "https://github.com/THEJUR4N";
    profileLink.textContent = "TH3JUR4N";
    profileLink.className = "profile-inline-link";
    profileLink.target = "_blank";
    profileLink.rel = "noopener noreferrer";

    resultsSummary.append(
      profileLink,
      document.createTextNode(".")
    );
  }
}

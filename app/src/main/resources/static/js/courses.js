async function loadCourses(searchText) {
  const url = searchText && searchText.trim()
    ? `/api/courses?search=${encodeURIComponent(searchText.trim())}`
    : `/api/courses`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Nepodařilo se načíst kurzy.");
  return await res.json();
}

function renderCourses(items) {
  const container = document.getElementById("courses");

  if (!items || items.length === 0) {
    container.innerHTML = `<p class="error">Nenalezen žádný kurz.</p>`;
    return;
  }

  container.innerHTML = items.map(c => `
    <div class="card">
      <h2>${c.title}</h2>
      <p>${c.description}</p>
      <p class="small">Lektor: ${c.lecturer}</p>
      <a href="course.html?id=${encodeURIComponent(c.id)}">Otevřít detail</a>
    </div>
  `).join("");
}

async function refresh() {
  const search = document.getElementById("search").value;
  const items = await loadCourses(search);
  renderCourses(items);
}

document.getElementById("search").addEventListener("input", () => {
  clearTimeout(window.__t);
  window.__t = setTimeout(() => refresh().catch(console.error), 200);
});

refresh().catch(console.error);

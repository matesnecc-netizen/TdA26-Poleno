function renderCourses(filterText) {
    const container = document.getElementById("courses");
    const text = (filterText || "").toLowerCase();

    const items = window.TDA.courses.filter(c =>
        c.title.toLowerCase().includes(text)
    );

    if (items.length === 0) {
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

document.getElementById("search").addEventListener("input", (e) => {
    renderCourses(e.target.value);
});

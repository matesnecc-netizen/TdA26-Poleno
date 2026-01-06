function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function renderCourse(course) {
    document.getElementById("title").textContent = course.title;
    document.getElementById("desc").textContent = course.description;
    document.getElementById("lecturer").textContent = `Lektor: ${course.lecturer}`;

    // Seřadit od nejnovějších (createdAt desc)
    const mats = [...course.materials].sort((a, b) => {
        return (b.createdAt || "").localeCompare(a.createdAt || "");
    });

    const container = document.getElementById("materials");

    if (mats.length === 0) {
        container.innerHTML = `<p class="small">Zatím žádné podklady.</p>`;
        return;
    }

    container.innerHTML = mats.map(m => {
        if (m.type === "link") {
            return `
                <div class="card">
                    <strong>${m.title}</strong>
                    <div class="small">Typ: odkaz • ${m.createdAt || ""}</div>
                    <div><a href="${m.url}" target="_blank" rel="noopener">Otevřít</a></div>
                </div>
            `;
        }

        return `
            <div class="card">
                <strong>${m.title}</strong>
                <div class="small">Typ: soubor • ${m.createdAt || ""}</div>
                <div class="small">(Offline verze – soubor bude později z backendu)</div>
            </div>
        `;
    }).join("");
}

const id = getCourseIdFromUrl();
const course = window.TDA.courses.find(c => c.id === id);

if (!course) {
    document.getElementById("title").textContent = "Kurz nenalezen";
    document.getElementById("desc").textContent = "Zkontrolujte odkaz a zkuste to znovu.";
    document.getElementById("materials").innerHTML = `<p class="error">Neplatné ID kurzu.</p>`;
} else {
    renderCourse(course);
}

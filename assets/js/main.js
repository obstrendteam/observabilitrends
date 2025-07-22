
document.addEventListener("DOMContentLoaded", () => {
    fetch("content/articles/articles.json")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("articles");
            data.articles.forEach(article => {
                const div = document.createElement("div");
                div.className = "article";
                div.innerHTML = `<h3>${article.title}</h3><p>${article.description}</p><a href="${article.url}">Leer más</a>`;
                container.appendChild(div);
            });
        });
});

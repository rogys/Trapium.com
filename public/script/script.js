const DocumentElements = {
    gridNews: document.querySelector('.news_grid'), // Add the selector for the grid
};
fetch('/api/index')
.then(response => response.json())
.then(data => {
    data.forEach(dataContent => {
        DocumentElements.gridNews.innerHTML += `
                <a href="/news/${dataContent.id}" class="news_link">
                    <article class="news_content">
                            <div class="news_image">
                            </div>
                            <h2>${dataContent.title}</h2>
                            <p>${dataContent.content}</p>
                            <span class="news_date">${dataContent.created_at}</span>
                    </article>
                </a>
        `;
    });
});

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
                                <img src="/uploads/${dataContent.image}" alt="${dataContent.title}" class="news_img">
                            </div>
                            <div class="news_info">
                                <div class="news_holder">
                                    <h2 class="news_title">${dataContent.title}</h2>
                                    <p class="news_content">${dataContent.content}</p>
                                </div>
                                <span class="news_date">${dataContent.created_at}</span>
                            </div>
                    </article>
                </a>
        `;
    });
});

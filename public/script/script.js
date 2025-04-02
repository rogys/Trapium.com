const DocumentElements = {
    newsSection: document.querySelector('.news_section'), // Add the selector for the news section
    gridNews: document.querySelector('.news_grid'), // Add the selector for the grid
};
const urlPath = window.location.pathname;
const newsId = urlPath.split('/').pop();
if (DocumentElements.gridNews) {
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
                                        <p class="news_content_description">${dataContent.content}</p>
                                        </div>
                                        <span class="news_date">${dataContent.created_at}</span>
                                </div>
                        </article>
                    </a>
            `;
        });
    });
} else {
    fetch(`/api/news/${newsId}`)
    .then(response => response.json()).then(data => {
        const newsContent = data[0];
        DocumentElements.newsSection.innerHTML = `
            <article class="news_article">
                <div class="news_image">
                    <img src="/uploads/${newsContent.main_image}" alt="${newsContent.main_title}" class="article_news_img">
                </div>
                <div class="news_info">
                    <div class="news_holder">
                        <h2 class="news_article_title">${newsContent.main_title}</h2>
                        <p class="news_content_info">${newsContent.main_content}</p>
                    </div>
                    <div class="slide_show">
                        
                    </div>
                    <span class="news_date">${newsContent.created_at}</span>
                </div>
            </article>
        `;
    });
};
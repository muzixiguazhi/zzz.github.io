document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const messageList = document.getElementById("message-list");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;
        const date = new Date().toLocaleString();

        const messageItem = document.createElement("div");
        messageItem.classList.add("message-item");
        messageItem.innerHTML = `
            <p><strong>姓名:</strong> ${name}</p>
            <p><strong>留言:</strong> ${message}</p>
            <p><strong>时间:</strong> ${date}</p>
        `;

        messageList.appendChild(messageItem);
        form.reset();
        successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    });
});

function closeAd(adId) {
    const ad = document.getElementById(adId);
    ad.style.display = 'none';
}

function showSuggestions(value, type) {
    const suggestions = document.getElementById("suggestions");
    const suggestionsMedia = document.getElementById("suggestions-media");
    const suggestionList = type === "article" ? suggestions : suggestionsMedia;
    suggestionList.innerHTML = "";
    if (!value) return;

    const items = type === "article" ? articles : media;
    const filteredItems = items.filter(item => item.title.includes(value) || item.date.includes(value));
    filteredItems.forEach(item => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.innerText = `${item.title} (${item.date})`;
        suggestionItem.addEventListener("click", () => {
            const input = type === "article" ? document.getElementById("search-query") : document.getElementById("search-query-media");
            input.value = item.title;
            suggestionList.innerHTML = "";
        });
        suggestionList.appendChild(suggestionItem);
    });
}

function searchArticles() {
    const query = document.getElementById("search-query").value;
    const results = articles.filter(article => article.title.includes(query) || article.date.includes(query));
    displaySearchResults(results, "article");
}

function searchMedia() {
    const query = document.getElementById("search-query-media").value;
    const results = media.filter(item => item.title.includes(query) || item.date.includes(query));
    displaySearchResults(results, "media");
}

function displaySearchResults(results, type) {
    const resultsContainer = type === "article" ? document.getElementById("search-results-list") : document.getElementById("search-results-list-media");
    const noResults = type === "article" ? document.getElementById("no-results") : document.getElementById("no-results-media");
    const originalContainer = type === "article" ? document.getElementById("article-list") : document.getElementById("media-list");

    // 清空原始内容
    originalContainer.innerHTML = "";
    resultsContainer.innerHTML = "";
    noResults.style.display = "none";

    if (results.length === 0) {
        noResults.style.display = "block";
        return;
    }

    results.forEach((result, index) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add(type === "article" ? "article-cover" : "media-item");
        resultItem.innerHTML = `
            <p><span>${index + 1}.</span> <strong class="${type}-title">${result.title}</strong></p>
            <a href="${result.url}" target="_blank">
                <img src="${result.image}" alt="${result.title}">
            </a>
            <p>${result.date}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });

    document.getElementById(type === "article" ? "search-results" : "search-results-media").style.display = "block";
}

const articles = [
    {
        title: "python自动化有多神奇？",
        date: "2024-05-20",
        url: "https://www.zhihu.com/question/447051874/answer/3508098309",
        image: "images/文章1封面.png"
    },
    {
        title: "我与数模",
        date: "2024-05-25",
        url: "https://zhuanlan.zhihu.com/p/681992309",
        image: "images/文章2封面.png"
    }
];

const media = [
    {
        title: "小猫们",
        date: "2024-02-12",
        url: "#",
        image: "images/小猫们.jpg"
    },
    {
        title: "游玩宁波",
        date: "2024-05-02",
        url: "#",
        image: "images/宁波大学.jpg"
    },
    {
        title: "牛",
        date: "2024-02-16",
        url: "https://www.pexels.com/zh-cn/video/15921892/",
        image: "images/牛.png"
    },
    {
        title: "食物",
        date: "2024-05-12",
        url: "https://www.pexels.com/zh-cn/video/6060027/",
        image: "images/食物.png"
    }
];

// Данные админа (в реальном проекте используй бэкенд!)
const ADMIN_CREDENTIALS = { login: "admin", password: "admin" };

// "База данных" для хранения ссылок и треков
const TRACKING_DB = {
    links: {},
    sessions: {}
};

// DOM-элементы
const authForm = document.getElementById("authForm");
const adminPanel = document.getElementById("adminPanel");
const linksTable = document.querySelector("#linksTable tbody");

// Проверка авторизации
function checkAuth() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
        authForm.classList.add("hidden");
        adminPanel.classList.remove("hidden");
        loadLinks();
    } else {
        document.getElementById("authError").textContent = "Неверный логин или пароль!";
    }
}

// Генерация уникальной ссылки
function generateLink() {
    const linkId = "track_" + Math.random().toString(36).substring(2, 9);
    const trackingUrl = `${window.location.origin}/track.html?id=${linkId}`;

    TRACKING_DB.links[linkId] = {
        id: linkId,
        url: trackingUrl,
        isActive: true
    };

    updateLinksTable();
    console.log("Новая ссылка:", trackingUrl);
    alert(`Ссылка создана: ${trackingUrl}`);
}

// Обновление таблицы ссылок
function updateLinksTable() {
    linksTable.innerHTML = "";
    Object.values(TRACKING_DB.links).forEach(link => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${link.id}</td>
      <td><a href="${link.url}" target="_blank">${link.url}</a></td>
      <td>${link.isActive ? "Активна" : "Неактивна"}</td>
    `;
        linksTable.appendChild(row);
    });
}

// Загрузка списка ссылок
function loadLinks() {
    // Здесь можно добавить загрузку из localStorage или бэкенда
    updateLinksTable();
}
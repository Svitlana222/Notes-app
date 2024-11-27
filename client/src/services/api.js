import axios from "axios";

// Налаштування базового URL для запитів
const API = axios.create({
    baseURL: "http://localhost:5000/api", // Замініть URL, якщо ваш сервер працює на іншій адресі
});

// Функція для тестового запиту до сервера
export const testConnection = async () => {
    try {
        const response = await API.get("/test"); // Тестовий GET-запит
        console.log("Test connection response:", response.data); // Лог відповіді
    } catch (error) {
        console.error("Test connection error:", error.message); // Лог помилки
    }
};

// Додаємо токен до заголовків кожного запиту
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token"); // Беремо токен із Local Storage
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;

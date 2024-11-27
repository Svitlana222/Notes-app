import API from "./api";

const login = async (credentials) => {
    const { data } = await API.post("/auth/login", credentials);
    localStorage.setItem("token", data.token);
    return data;
};

const register = async (credentials) => {
    try {
        const { data } = await API.post("/auth/register", credentials);
        return data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem("token");
};

export default { login, register, logout };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Хук для навігації

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login({ username, password });
            setError("");
            onLogin(data); // Виклик функції для входу після успіху
            navigate("/"); // Перекидання на головну сторінку (нотатки)
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">
                Login
            </button>
        </form>
    );
};

export default LoginForm;

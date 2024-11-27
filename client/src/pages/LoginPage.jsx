import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
    const { login } = useContext(AuthContext);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "24rem" }}>
                <h1 className="text-center">Login</h1>
                <LoginForm onLogin={login} />
            </div>
        </div>
    );
};

export default LoginPage;

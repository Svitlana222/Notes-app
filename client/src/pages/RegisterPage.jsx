import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "24rem" }}>
                <h1 className="text-center">Register</h1>
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;

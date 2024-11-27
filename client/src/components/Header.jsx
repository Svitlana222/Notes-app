import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
            <h1 className="m-0">Нотатник</h1>
            <nav>
                <ul className="nav">
                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">
                                Мої нотатки
                            </Link>
                        </li>
                    )}
                    {!isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">
                                    Авторизація
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/register">
                                    Реєстрація
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <button className="btn btn-light" onClick={handleLogout}>
                                Вийти
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

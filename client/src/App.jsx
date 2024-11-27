import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import EditNotePage from "./pages/EditNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/global.css";
import { testConnection } from "./services/api";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    useEffect(() => {
        const checkServerConnection = async () => {
            try {
                await testConnection();
            } catch (error) {
                console.error("Не вдалося підключитися до сервера:", error.message);
            }
        };
        checkServerConnection();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <NotesPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/notes/:id/edit"
                            element={
                                <PrivateRoute>
                                    <EditNotePage />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;

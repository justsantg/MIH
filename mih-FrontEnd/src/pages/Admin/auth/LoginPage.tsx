import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/email/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await res.json();

      // Guardamos el token y refreshToken en localStorage
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      // 🔒 Verificar que el usuario sea admin (opcional, si tu API devuelve rol)
      // if (data.user?.role?.name !== "Admin") {
      //   throw new Error("No tienes permisos de administrador");
      // }

      // Redirigir al dashboard de administrador
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Panel de Administración</h2>
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

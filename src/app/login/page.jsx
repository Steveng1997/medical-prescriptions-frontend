import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import useUserStore from "../../store/useUserStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.accessToken || data.token);
      setUser(data.user);

      if (data.user.role === "doctor") {
        navigate("/doctor/prescriptions");
      } else if (data.user.role === "patient") {
        navigate("/patient/prescriptions");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Credenciales incorrectas o error de conexión");
    }
  };

  const styles = {
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#F1F5F9",
      fontFamily: "'Inter', sans-serif",
    },
    card: {
      padding: "48px",
      backgroundColor: "#FFFFFF",
      borderRadius: "24px",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    title: {
      fontSize: "30px",
      fontWeight: "800",
      color: "#1E293B",
      marginBottom: "8px",
      letterSpacing: "-0.025em",
    },
    subtitle: {
      fontSize: "15px",
      color: "#64748B",
      marginBottom: "32px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "24px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      border: "1px solid #E2E8F0",
      borderRadius: "12px",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.2s",
      boxSizing: "border-box",
      color: "#334155",
    },
    button: {
      width: "100%",
      backgroundColor: "#4F46E5",
      color: "#FFFFFF",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bienvenido</h1>
        <p style={styles.subtitle}>Ingresa a tu portal médico</p>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Correo electrónico"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4338CA")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4F46E5")}
          >
            Iniciar sesión
          </button>
        </form>

        <p style={{ marginTop: "24px", fontSize: "13px", color: "#94A3B8" }}>
          ¿Olvidaste tu contraseña? Contacta a soporte
        </p>
      </div>
    </div>
  );
}

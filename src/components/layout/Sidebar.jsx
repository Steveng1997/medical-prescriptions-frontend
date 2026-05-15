import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Activity,
} from "lucide-react";
import useUserStore from "../../store/useUserStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, logout } = useUserStore();

  const menu =
    role === "admin"
      ? [
          {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: <LayoutDashboard size={20} />,
          },
          {
            label: "Usuarios",
            path: "/admin/users",
            icon: <Users size={20} />,
          },
        ]
      : [
          {
            label: "Prescripciones",
            path: `/${role}/prescriptions`,
            icon: <FileText size={20} />,
          },
        ];

  const styles = {
    aside: {
      width: "280px",
      backgroundColor: "#1E293B",
      color: "white",
      padding: "32px 20px",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "fixed",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "48px",
      paddingLeft: "12px",
    },
    navItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      marginBottom: "8px",
      transition: "0.2s",
      backgroundColor: active ? "#4F46E5" : "transparent",
    }),
    logout: {
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      color: "#94A3B8",
      cursor: "pointer",
    },
  };

  return (
    <aside style={styles.aside}>
      <div style={styles.logo}>
        <div
          style={{
            backgroundColor: "#4F46E5",
            padding: "8px",
            borderRadius: "10px",
          }}
        >
          <Activity size={24} />
        </div>
        <span style={{ fontWeight: "800", fontSize: "20px" }}>MedRX</span>
      </div>
      <nav>
        {menu.map((item, i) => (
          <div
            key={i}
            style={styles.navItem(location.pathname === item.path)}
            onClick={() => navigate(item.path)}
          >
            {item.icon} <span style={{ fontWeight: "600" }}>{item.label}</span>
          </div>
        ))}
      </nav>
      <div
        style={styles.logout}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <LogOut size={20} />{" "}
        <span style={{ fontWeight: "600" }}>Cerrar Sesión</span>
      </div>
    </aside>
  );
}

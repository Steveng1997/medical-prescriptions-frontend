import { useState, useEffect } from "react";
import api from "../../../lib/api";
import {
  Users,
  Stethoscope,
  FileText,
  Activity,
  CheckCircle,
  Clock,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/prescriptions/admin/metrics")
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    wrapper: {
      padding: "40px",
      backgroundColor: "#F8FAFC",
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif",
    },
    header: {
      marginBottom: "32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "24px",
      marginBottom: "32px",
    },
    card: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "20px",
      border: "1px solid #E2E8F0",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    },
    statusGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "32px",
    },
    statusCard: (borderColor) => ({
      backgroundColor: "white",
      padding: "20px 24px",
      borderRadius: "16px",
      border: "1px solid #E2E8F0",
      borderLeft: `4px solid ${borderColor}`,
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }),
    iconBox: (color) => ({
      width: "56px",
      height: "56px",
      borderRadius: "16px",
      backgroundColor: `${color}10`,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    chartArea: {
      backgroundColor: "white",
      padding: "32px",
      borderRadius: "24px",
      border: "1px solid #E2E8F0",
      width: "100%",
    },
    btnAction: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      borderRadius: "12px",
      border: "1px solid #E2E8F0",
      backgroundColor: "white",
      cursor: "pointer",
      fontWeight: "600",
      color: "#475569",
    },
  };

  if (loading) return <div style={styles.wrapper}>Cargando métricas...</div>;

  const chartData = metrics?.byDay.map((day) => ({
    name: new Date(day.date).toLocaleDateString("es", { weekday: "short" }),
    cantidad: day.count,
  }));

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "800",
              color: "#1E293B",
              margin: 0,
            }}
          >
            Panel de Administración
          </h1>
          <p style={{ color: "#64748B", marginTop: "4px" }}>
            Visualización de métricas y estados del sistema.
          </p>
        </div>
        <button
          style={styles.btnAction}
          onClick={() => navigate("/admin/users")}
        >
          <UserPlus size={18} /> Gestionar Usuarios
        </button>
      </header>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.iconBox("#4F46E5")}>
            <Stethoscope size={28} />
          </div>
          <div>
            <p
              style={{
                color: "#64748B",
                fontSize: "14px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Médicos
            </p>
            <h3 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>
              {metrics?.totals.doctors}
            </h3>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.iconBox("#06B6D4")}>
            <Users size={28} />
          </div>
          <div>
            <p
              style={{
                color: "#64748B",
                fontSize: "14px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Pacientes
            </p>
            <h3 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>
              {metrics?.totals.patients}
            </h3>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.iconBox("#8B5CF6")}>
            <FileText size={28} />
          </div>
          <div>
            <p
              style={{
                color: "#64748B",
                fontSize: "14px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Prescripciones
            </p>
            <h3 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>
              {metrics?.totals.prescriptions}
            </h3>
          </div>
        </div>
      </div>

      <div style={styles.statusGrid}>
        <div style={styles.statusCard("#10B981")}>
          <CheckCircle color="#10B981" size={20} />
          <span style={{ fontSize: "15px", color: "#334155" }}>
            <strong style={{ fontSize: "18px" }}>
              {metrics?.byStatus.consumed}
            </strong>{" "}
            Consumidas
          </span>
        </div>
        <div style={styles.statusCard("#F59E0B")}>
          <Clock color="#F59E0B" size={20} />
          <span style={{ fontSize: "15px", color: "#334155" }}>
            <strong style={{ fontSize: "18px" }}>
              {metrics?.byStatus.pending}
            </strong>{" "}
            Pendientes
          </span>
        </div>
      </div>

      <div style={styles.chartArea}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "32px",
          }}
        >
          <Activity color="#4F46E5" size={20} />
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#1E293B",
              margin: 0,
            }}
          >
            Actividad de Prescripciones (Últimos 7 días)
          </h2>
        </div>
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "#F8FAFC" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="cantidad" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#4F46E5"
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { Plus, Eye, FileText, CheckCircle, Clock, Search } from "lucide-react";
import EmptyState from "../../../components/ui/EmptyState";

export default function DoctorPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPrescriptions = async () => {
      try {
        const { data } = await api.get("/prescriptions/my-prescriptions");
        setPrescriptions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPrescriptions();
  }, []);

  const handleDownloadPdf = async (id, code) => {
    try {
      const response = await api.get(`/prescriptions/${id}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `RX-${code}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Error al generar PDF", err);
    }
  };

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.patient?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const styles = {
    container: {
      padding: "40px",
      backgroundColor: "#F8FAFC",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "40px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "20px",
      border: "1px solid #E2E8F0",
      overflow: "hidden",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    },
    table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
    th: {
      padding: "18px 24px",
      fontSize: "12px",
      fontWeight: "700",
      color: "#94A3B8",
      textTransform: "uppercase",
      borderBottom: "1px solid #F1F5F9",
      backgroundColor: "#FBFDFF",
    },
    td: {
      padding: "20px 24px",
      fontSize: "14px",
      color: "#475569",
      borderBottom: "1px solid #F1F5F9",
    },
    badge: (status) => ({
      padding: "6px 12px",
      borderRadius: "99px",
      fontSize: "12px",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: status === "consumed" ? "#ECFDF5" : "#FFFBEB",
      color: status === "consumed" ? "#059669" : "#D97706",
    }),
    searchInput: {
      width: "100%",
      padding: "12px 12px 12px 40px",
      borderRadius: "12px",
      border: "1px solid #E2E8F0",
      outline: "none",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#1E293B",
              margin: 0,
            }}
          >
            Mis Prescripciones
          </h1>
          <p style={{ color: "#64748B", marginTop: "4px" }}>
            Historial de órdenes médicas emitidas.
          </p>
        </div>
        <button
          onClick={() => navigate("/doctor/prescriptions/new")}
          style={{
            backgroundColor: "#4F46E5",
            color: "white",
            padding: "14px 24px",
            borderRadius: "12px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Plus size={20} /> Nueva Prescripción
        </button>
      </div>
      <div style={{ position: "relative", maxWidth: "400px" }}>
        <Search
          style={{
            position: "absolute",
            left: "12px",
            top: "12px",
            color: "#94A3B8",
          }}
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar por paciente o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.card}>
        {loading ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#64748B" }}
          >
            Cargando...
          </div>
        ) : filteredPrescriptions.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Código</th>
                <th style={styles.th}>Paciente</th>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Estado</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrescriptions.map((p) => (
                <tr key={p.id}>
                  <td
                    style={{
                      ...styles.td,
                      fontWeight: "700",
                      color: "#4F46E5",
                    }}
                  >
                    {p.code}
                  </td>
                  <td style={styles.td}>
                    {p.patient?.user?.name || "Paciente"}
                  </td>
                  <td style={styles.td}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge(p.status)}>
                      {p.status === "consumed" ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      {p.status === "consumed" ? "Consumida" : "Pendiente"}
                    </span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <button
                      onClick={() => navigate(`/doctor/prescriptions/${p.id}`)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#64748B",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDownloadPdf(p.id, p.code)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#64748B",
                        cursor: "pointer",
                      }}
                    >
                      <FileText size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState message="No se encontraron prescripciones." />
        )}
      </div>
    </div>
  );
}

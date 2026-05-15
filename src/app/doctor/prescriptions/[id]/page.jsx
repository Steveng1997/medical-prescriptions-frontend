import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import { ChevronLeft, Hash, FileText, Download } from "lucide-react";

export default function DoctorPrescriptionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/prescriptions/${id}`);
        setData(res.data);
      } catch (err) {
        navigate("/doctor/prescriptions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const downloadPDF = async () => {
    try {
      const response = await api.get(`/prescriptions/${id}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `RX-${data.code}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Error al descargar", err);
    }
  };

  const styles = {
    wrapper: {
      padding: "40px 20px",
      backgroundColor: "#F8FAFC",
      minHeight: "100vh",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "24px",
      border: "1px solid #E2E8F0",
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #F1F5F9",
      paddingBottom: "30px",
      marginBottom: "30px",
    },
    itemBox: {
      padding: "20px",
      backgroundColor: "#FBFDFF",
      border: "1px solid #E2E8F0",
      borderRadius: "16px",
      marginBottom: "16px",
    },
  };

  if (loading) return <div style={styles.wrapper}>Cargando...</div>;

  return (
    <div style={styles.wrapper}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "none",
            background: "none",
            color: "#64748B",
            cursor: "pointer",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600",
          }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <div style={styles.card}>
          <div style={styles.header}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>
                  Orden Médica
                </h1>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "99px",
                    fontSize: "12px",
                    fontWeight: "700",
                    backgroundColor:
                      data.status === "consumed" ? "#ECFDF5" : "#FFFBEB",
                    color: data.status === "consumed" ? "#059669" : "#D97706",
                  }}
                >
                  {data.status === "consumed" ? "Consumida" : "Pendiente"}
                </span>
              </div>
              <p
                style={{
                  color: "#64748B",
                  margin: 0,
                  fontFamily: "monospace",
                  fontWeight: "700",
                }}
              >
                <Hash size={16} /> {data.code}
              </p>
            </div>
            <button
              onClick={downloadPDF}
              style={{
                backgroundColor: "#4F46E5",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "12px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Download size={18} /> PDF
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "40px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Paciente
              </p>
              <p style={{ margin: 0, fontWeight: "700", color: "#1E293B" }}>
                {data.patient?.user?.name}
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>
                Email: {data.patient?.user?.email}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Médico
              </p>
              <p style={{ margin: 0, fontWeight: "700", color: "#1E293B" }}>
                Dr. {data.author?.user?.name}
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>
                Especialidad: {data.author?.specialty || "General"}
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: "11px",
              fontWeight: "800",
              color: "#94A3B8",
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            Medicamentos Prescritos
          </p>
          {data.items.map((item, i) => (
            <div key={i} style={styles.itemBox}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <span style={{ fontWeight: "800", color: "#4F46E5" }}>
                  {item.name}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#94A3B8",
                  }}
                >
                  CANT: {item.quantity}
                </span>
              </div>
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "14px",
                  color: "#64748B",
                }}
              >
                {item.dosage}
              </p>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px dashed #E2E8F0",
                  fontSize: "13px",
                  color: "#475569",
                }}
              >
                <FileText
                  size={14}
                  style={{ display: "inline", marginRight: "5px" }}
                />{" "}
                {item.instructions}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

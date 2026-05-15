import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { FileText, Search, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../../components/ui/EmptyState";

export default function PatientListPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const { data } = await api.get("/prescriptions/my-prescriptions");
        setPrescriptions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.author?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <header style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "800",
            color: "#1E293B",
            margin: 0,
          }}
        >
          Mi Historial Médico
        </h1>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#64748B",
            marginTop: "4px",
          }}
        >
          Consulta y descarga tus prescripciones activas.
        </h2>
      </header>

      <div
        style={{
          position: "relative",
          maxWidth: "400px",
          marginBottom: "30px",
        }}
      >
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
          placeholder="Buscar por médico o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 12px 12px 40px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            outline: "none",
          }}
        />
      </div>

      {loading ? (
        <p style={{ color: "#64748B" }}>Cargando tus recetas...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/patient/prescriptions/${p.id}`)}
                style={{
                  backgroundColor: "white",
                  padding: "24px",
                  borderRadius: "20px",
                  border: "1px solid #E2E8F0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: "#EEF2FF",
                      color: "#4F46E5",
                      borderRadius: "12px",
                    }}
                  >
                    <FileText size={24} />
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#94A3B8",
                      fontWeight: "600",
                    }}
                  >
                    #{p.code}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1E293B",
                    margin: "0 0 8px 0",
                  }}
                >
                  Dr. {p.author?.user?.name}
                </h3>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#64748B",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Clock size={14} />
                  {new Date(p.createdAt).toLocaleDateString()}
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid #F1F5F9",
                    color: "#4F46E5",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Ver detalle <Search size={16} />
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No se encontraron prescripciones registradas." />
          )}
        </div>
      )}
    </div>
  );
}

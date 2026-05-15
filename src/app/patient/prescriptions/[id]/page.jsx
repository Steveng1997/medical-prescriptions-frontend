import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../lib/api";
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Stethoscope,
  Calendar,
  Hash,
  FileText,
  AlertCircle,
} from "lucide-react";
import Badge from "../../../../components/ui/Badge";
import { toast } from "sonner";

export default function PatientPrescriptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConsuming, setIsConsuming] = useState(false);

  const fetchDetail = useCallback(async () => {
    try {
      const { data } = await api.get(`/prescriptions/${id}`);
      setPrescription(data);
    } catch (err) {
      toast.error("No se pudo cargar el detalle", err);
      navigate("/patient/prescriptions");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (isMounted) await fetchDetail();
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [fetchDetail]);

  const handleDownloadPdf = async () => {
    const toastId = toast.loading("Generando PDF...");
    try {
      const response = await api.get(`/prescriptions/${id}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `RX-${prescription.code}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Descarga iniciada", { id: toastId });
    } catch (err) {
      toast.error("Error al descargar el PDF", { id: toastId }, err);
    }
  };

  const handleMarkAsConsumed = async () => {
    if (!window.confirm("¿Confirmas que ya has recibido estos medicamentos?"))
      return;
    setIsConsuming(true);
    const toastId = toast.loading("Actualizando estado...");
    try {
      await api.patch(`/prescriptions/${id}/consume`);
      await fetchDetail();
      toast.success("Medicamentos marcados como consumidos", { id: toastId });
    } catch (err) {
      toast.error("Error al actualizar el estado", { id: toastId }, err);
    } finally {
      setIsConsuming(false);
    }
  };

  const styles = {
    wrapper: {
      backgroundColor: "#F1F5F9",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Inter', sans-serif",
    },
    container: { maxWidth: "700px", margin: "0 auto" },
    backBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "none",
      border: "none",
      color: "#64748B",
      cursor: "pointer",
      fontWeight: "600",
      marginBottom: "24px",
    },
    receipt: {
      backgroundColor: "#FFF",
      borderRadius: "24px",
      padding: "40px",
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
      border: "1px solid #E2E8F0",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "20px",
    },
    title: { fontSize: "24px", fontWeight: "800", color: "#1E293B", margin: 0 },
    metaHeader: { display: "flex", gap: "15px", marginTop: "8px" },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: "#94A3B8",
      fontSize: "13px",
      fontWeight: "500",
    },
    divider: {
      border: "none",
      borderTop: "2px dashed #E2E8F0",
      margin: "30px 0",
    },
    section: { marginBottom: "32px" },
    sectionTitle: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "12px",
      fontWeight: "700",
      color: "#64748B",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: "16px",
    },
    infoBox: {
      padding: "16px",
      backgroundColor: "#F8FAFC",
      borderRadius: "12px",
      border: "1px solid #F1F5F9",
    },
    doctorName: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#1E293B",
      margin: 0,
    },
    doctorSpecialty: {
      fontSize: "14px",
      color: "#64748B",
      margin: "4px 0 0 0",
    },
    notesBox: {
      fontSize: "15px",
      color: "#475569",
      fontStyle: "italic",
      lineHeight: "1.6",
      backgroundColor: "#F1F5F9",
      padding: "15px",
      borderRadius: "12px",
    },
    itemsList: { display: "flex", flexDirection: "column", gap: "12px" },
    itemRow: {
      padding: "16px",
      backgroundColor: "#FFF",
      borderRadius: "12px",
      border: "1px solid #F1F5F9",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemName: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#1E293B",
      margin: 0,
    },
    itemInstructions: {
      fontSize: "13px",
      color: "#64748B",
      margin: "4px 0 0 0",
    },
    itemDetails: {
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    itemDosage: { fontSize: "14px", fontWeight: "600", color: "#4F46E5" },
    itemQuantity: { fontSize: "12px", color: "#94A3B8" },
    footer: {
      textAlign: "center",
      marginTop: "40px",
      paddingTop: "20px",
      borderTop: "1px solid #F1F5F9",
      color: "#94A3B8",
      fontSize: "12px",
    },
    actions: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginTop: "24px",
    },
    btnPrimary: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      backgroundColor: "#10B981",
      color: "white",
      padding: "16px",
      borderRadius: "14px",
      border: "none",
      fontWeight: "700",
      cursor: "pointer",
    },
    btnSecondary: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      backgroundColor: "#1E293B",
      color: "white",
      padding: "16px",
      borderRadius: "14px",
      border: "none",
      fontWeight: "700",
      cursor: "pointer",
    },
  };

  if (loading)
    return (
      <div className="p-20 text-center font-medium text-slate-500">
        Cargando orden médica...
      </div>
    );
  if (!prescription) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button
          onClick={() => navigate("/patient/prescriptions")}
          style={styles.backBtn}
        >
          <ArrowLeft size={18} /> Volver al historial
        </button>

        <div style={styles.receipt}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Orden Médica Digital</h1>
              <div style={styles.metaHeader}>
                <span style={styles.metaItem}>
                  <Hash size={14} /> {prescription.code}
                </span>
                <span style={styles.metaItem}>
                  <Calendar size={14} />{" "}
                  {new Date(prescription.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Badge type={prescription.status}>
              {prescription.status === "consumed" ? "Consumida" : "Pendiente"}
            </Badge>
          </div>

          <hr style={styles.divider} />

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <Stethoscope size={18} color="#4F46E5" />
              <span>Profesional a cargo</span>
            </div>
            <div style={styles.infoBox}>
              <p style={styles.doctorName}>
                Dr.{" "}
                {prescription.author?.user?.name || prescription.doctor?.name}
              </p>
              <p style={styles.doctorSpecialty}>
                {prescription.author?.specialty || "Especialista"}
              </p>
            </div>
          </div>

          {prescription.description && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>
                <AlertCircle size={18} color="#64748B" />
                <span>Indicaciones del Médico</span>
              </div>
              <div style={styles.notesBox}>"{prescription.description}"</div>
            </div>
          )}

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <FileText size={18} color="#4F46E5" />
              <span>Medicamentos</span>
            </div>
            <div style={styles.itemsList}>
              {prescription.items?.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <div>
                    <p style={styles.itemName}>{item.name}</p>
                    <p style={styles.itemInstructions}>{item.instructions}</p>
                  </div>
                  <div style={styles.itemDetails}>
                    <span style={styles.itemDosage}>{item.dosage}</span>
                    <span style={styles.itemQuantity}>
                      Cant: {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footer}>
            <p>
              Documento digital legal válido para la adquisición de
              medicamentos.
            </p>
          </div>
        </div>

        <div style={styles.actions}>
          <button onClick={handleDownloadPdf} style={styles.btnSecondary}>
            <Download size={20} /> Descargar PDF
          </button>

          {prescription.status === "pending" && (
            <button
              onClick={handleMarkAsConsumed}
              disabled={isConsuming}
              style={styles.btnPrimary}
            >
              <CheckCircle2 size={20} />
              {isConsuming ? "Procesando..." : "Marcar como Consumida"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

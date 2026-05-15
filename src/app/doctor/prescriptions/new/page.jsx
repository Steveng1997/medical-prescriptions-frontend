import { useState, useEffect } from "react";
import api from "../../../../lib/api";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ClipboardList, Send, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function NewPrescriptionPage() {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientId: "",
    notes: "",
    items: [{ name: "", dosage: "", quantity: 1, instructions: "" }],
  });

  useEffect(() => {
    api
      .get("/users?role=patient")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setPatients(data);
      })
      .catch(() => setPatients([]))
      .finally(() => setLoadingPatients(false));
  }, []);

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        { name: "", dosage: "", quantity: 1, instructions: "" },
      ],
    });
  };

  const handleRemoveItem = (index) => {
    if (form.items.length > 1) {
      setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] =
      field === "quantity" ? parseInt(value) || 0 : value;
    setForm({ ...form, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientId) return toast.error("Seleccione un paciente");

    setIsSubmitting(true);
    const payload = {
      ...form,
      description: form.notes || "Prescripción Médica",
    };

    try {
      await api.post("/prescriptions", payload);
      toast.success("Prescripción emitida correctamente");
      navigate("/doctor/prescriptions");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al guardar la prescripción",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      backgroundColor: "#F8FAFC",
      padding: "40px 20px",
      fontFamily: "Inter, sans-serif",
    },
    container: { maxWidth: "800px", margin: "0 auto" },
    card: {
      backgroundColor: "#FFF",
      borderRadius: "24px",
      padding: "40px",
      border: "1px solid #E2E8F0",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #E2E8F0",
      borderRadius: "10px",
      outline: "none",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    label: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#64748B",
      textTransform: "uppercase",
      display: "block",
      marginBottom: "8px",
    },
    itemRow: {
      display: "grid",
      gridTemplateColumns: "2.5fr 1fr 80px 40px",
      gap: "12px",
      marginBottom: "12px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button
          onClick={() => navigate("/doctor/prescriptions")}
          style={{
            background: "none",
            border: "none",
            color: "#64748B",
            cursor: "pointer",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontWeight: "600",
          }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <div style={styles.card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                backgroundColor: "#EEF2FF",
                padding: "12px",
                borderRadius: "12px",
                color: "#4F46E5",
              }}
            >
              <ClipboardList size={24} />
            </div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#1E293B",
                margin: 0,
              }}
            >
              Nueva Prescripción
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <label style={styles.label}>Paciente</label>
              <select
                style={styles.input}
                value={form.patientId}
                onChange={(e) =>
                  setForm({ ...form, patientId: e.target.value })
                }
                required
              >
                <option value="">
                  {loadingPatients ? "Cargando..." : "Seleccione un paciente"}
                </option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.email})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={styles.label}>Notas del Médico</label>
              <textarea
                style={{ ...styles.input, minHeight: "80px", resize: "none" }}
                placeholder="Observaciones adicionales..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={styles.label}>Medicamentos</label>
              {form.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    padding: "15px",
                    backgroundColor: "#FBFDFF",
                    borderRadius: "12px",
                    border: "1px solid #F1F5F9",
                  }}
                >
                  <div style={styles.itemRow}>
                    <input
                      style={styles.input}
                      placeholder="Medicamento"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <input
                      style={styles.input}
                      placeholder="Dosis"
                      value={item.dosage}
                      onChange={(e) =>
                        handleItemChange(index, "dosage", e.target.value)
                      }
                      required
                    />
                    <input
                      style={styles.input}
                      type="number"
                      min="1"
                      placeholder="Cant."
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      style={{
                        border: "none",
                        background: "none",
                        color: "#EF4444",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <input
                    style={{ ...styles.input, marginTop: "10px" }}
                    placeholder="Instrucciones de uso..."
                    value={item.instructions}
                    onChange={(e) =>
                      handleItemChange(index, "instructions", e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "#4F46E5",
                  fontWeight: "700",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                }}
              >
                <Plus size={18} /> Añadir medicamento
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                backgroundColor: "#4F46E5",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "background-color 0.2s",
              }}
            >
              {isSubmitting ? "Emitiendo..." : "Emitir Prescripción"}{" "}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

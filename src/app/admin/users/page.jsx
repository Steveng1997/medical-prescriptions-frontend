import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { UserPlus, ArrowLeft } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const { data } = await api.get("/users?role=all");
        if (isMounted) {
          setUsers(Array.isArray(data) ? data : data.data || []);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const refreshUsers = async () => {
    try {
      const { data } = await api.get("/users?role=all");
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", form);
      setShowModal(false);
      setForm({ name: "", email: "", password: "", role: "patient" });
      refreshUsers();
    } catch (err) {
      alert("Error al crear usuario", err);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => navigate("/admin/dashboard")}
            style={{
              backgroundColor: "white",
              border: "1px solid #E2E8F0",
              padding: "8px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "#64748B",
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "800",
              color: "#1E293B",
              margin: 0,
            }}
          >
            Gestión de Usuarios
          </h1>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          icon={<UserPlus size={18} />}
        >
          Crear Usuario
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#FBFDFF",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <th
                style={{
                  padding: "18px 24px",
                  color: "#94A3B8",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                USUARIO
              </th>
              <th
                style={{
                  padding: "18px 24px",
                  color: "#94A3B8",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                ROL
              </th>
              <th
                style={{
                  padding: "18px 24px",
                  color: "#94A3B8",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                EMAIL
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td
                  style={{
                    padding: "20px 24px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  {u.name}
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <Badge type={u.role}>{u.role}</Badge>
                </td>
                <td
                  style={{
                    padding: "20px 24px",
                    color: "#64748B",
                    fontSize: "14px",
                  }}
                >
                  {u.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Nuevo Usuario"
      >
        <form onSubmit={handleCreateUser}>
          <Input
            label="Nombre Completo"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            required
          />
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "700",
                color: "#64748B",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Rol
            </label>
            <select
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
                outline: "none",
              }}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="patient">Paciente</option>
              <option value="doctor">Médico</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <Button type="submit" fullWidth>
            Guardar Usuario
          </Button>
        </form>
      </Modal>
    </div>
  );
}

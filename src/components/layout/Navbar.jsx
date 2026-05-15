import useUserStore from "../../store/useUserStore";
import { User, Bell } from "lucide-react";

export default function Navbar() {
  const { user } = useUserStore();

  return (
    <header
      style={{
        height: "80px",
        backgroundColor: "white",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 40px",
        marginLeft: "280px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Bell size={20} color="#94A3B8" />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: "700", fontSize: "14px" }}>
              {user?.name}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#94A3B8" }}>
              {user?.role}
            </p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#F1F5F9",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={20} color="#64748B" />
          </div>
        </div>
      </div>
    </header>
  );
}

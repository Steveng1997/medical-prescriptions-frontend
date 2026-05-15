import { FileSearch } from "lucide-react";

export default function EmptyState({ message }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        backgroundColor: "white",
        borderRadius: "24px",
        border: "2px dashed #E2E8F0",
        textAlign: "center",
        gridColumn: "1/-1",
      }}
    >
      <div
        style={{
          backgroundColor: "#F8FAFC",
          padding: "20px",
          borderRadius: "50%",
          color: "#94A3B8",
          marginBottom: "16px",
        }}
      >
        <FileSearch size={40} />
      </div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#64748B",
          margin: 0,
        }}
      >
        {message || "No se encontraron registros"}
      </p>
    </div>
  );
}

import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "450px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94A3B8",
          }}
        >
          <X size={20} />
        </button>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "24px",
            color: "#1E293B",
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

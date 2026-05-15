export default function Badge({ children, type }) {
  const getColors = () => {
    switch (type?.toLowerCase()) {
      case "doctor":
        return { bg: "#EEF2FF", text: "#4F46E5" }; // Indigo
      case "patient":
      case "paciente":
        return { bg: "#F0F9FF", text: "#0891B2" }; // Cyan/Blue
      case "consumed":
      case "consumida":
        return { bg: "#ECFDF5", text: "#059669" }; // Green
      case "pending":
      case "pendiente":
        return { bg: "#FFFBEB", text: "#D97706" }; // Amber
      case "admin":
        return { bg: "#F8FAFC", text: "#475569" }; // Slate
      default:
        return { bg: "#F1F5F9", text: "#64748B" }; // Gray
    }
  };

  const colors = getColors();

  return (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: "99px",
        fontSize: "11px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        backgroundColor: colors.bg,
        color: colors.text,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        border: `1px solid ${colors.text}15`,
      }}
    >
      {children}
    </span>
  );
}

export default function Button({
  children,
  onClick,
  icon,
  type = "button",
  variant = "primary",
  fullWidth = false,
}) {
  const style = {
    backgroundColor: variant === "primary" ? "#4F46E5" : "transparent",
    color: variant === "primary" ? "white" : "#64748B",
    border: variant === "primary" ? "none" : "1px solid #E2E8F0",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: fullWidth ? "100%" : "auto",
    transition: "0.2s",
  };
  return (
    <button type={type} onClick={onClick} style={style}>
      {icon}
      {children}
    </button>
  );
}

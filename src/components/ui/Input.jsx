export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
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
          {label}
        </label>
      )}
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          outline: "none",
          fontSize: "15px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

import CircleIcon from "@mui/icons-material/Circle";
import DoneIcon from "@mui/icons-material/Done";

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (password.match(/\d|[\W_]/)) strength += 1;
  if (password.match(/[a-z]/)) strength += 1;
  if (password.match(/[A-Z]/)) strength += 1;
  return strength; // This will be a value between 0 and 4
};

const PasswordStrengthBar = ({ password }) => {
  const strength = getPasswordStrength(password);
  const strengthBarColor = (strength) => {
    switch (strength) {
      case 1:
        return "#CD0000"; // Color for weak password
      case 2:
      case 3:
        return "#f1c40f"; // Color for average password
      case 4:
        return "#2ecc71"; // Color for strong password
      default:
        return "#dddddd"; // Color for no password or very weak password
    }
  };

  const strengthLabel = (strength) => {
    switch (strength) {
      case 1:
        return "Weak";
      case 2:
      case 3:
        return "Average";
      case 4:
        return "Strong";
      default:
        return ""; // No label for no password
    }
  };
  const hasMinLength = password.length >= 8;
  const hasNumberOrSymbol = /\d|[\W_]/.test(password);
  const hasLowerAndUpperCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  return (
    <div
      style={{
        width: "70%",
        padding: "5px",
        borderRadius: "5px",
        textAlign: "left",
      }}
    >
      <div style={{ paddingBottom: "5px", color: strengthBarColor(strength) }}>
        {strengthLabel(strength)}
      </div>
      <div
        style={{ width: "100%", backgroundColor: "#ddd", borderRadius: "5px" }}
      >
        <div
          style={{
            width: `${strength * 25}%`,
            backgroundColor: strengthBarColor(strength),
            height: "6px",
            borderRadius: "5px",
            transition: "width 0.3s",
          }}
        ></div>
      </div>
      <div style={{ fontSize: "0.8rem" }}>
        <div style={{ color: hasMinLength ? "green" : "gray" }}>
          {hasMinLength ? (
            <DoneIcon style={{ width: "15px" }} />
          ) : (
            <CircleIcon style={{ width: "10px" }} />
          )}{" "}
          At least 8 characters
        </div>
        <div style={{ color: hasNumberOrSymbol ? "green" : "gray" }}>
          {hasNumberOrSymbol ? (
            <DoneIcon style={{ width: "15px" }} />
          ) : (
            <CircleIcon style={{ width: "10px" }} />
          )}{" "}
          At least one number (0-9) or symbol
        </div>
        <div style={{ color: hasLowerAndUpperCase ? "green" : "gray" }}>
          {hasLowerAndUpperCase ? (
            <DoneIcon style={{ width: "15px" }} />
          ) : (
            <CircleIcon style={{ width: "10px" }} />
          )}{" "}
          Lowercase (a-z) and uppercase (A-Z)
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthBar;

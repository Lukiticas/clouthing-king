import "./Button.styles.scss";

const Button = ({ children, colors, hasOutline = false, ...buttonProps }) => {
  return (
    <button
      className={`button-component ${hasOutline ? "outline" : ""}`}
      style={{
        "--primary": colors.primary,
        "--secundary": colors.secundary,
      }}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;

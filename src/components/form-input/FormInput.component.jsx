import "./FormInput.styles.scss";
import { nanoid } from "nanoid";

const FormInput = ({ isOnError, errorMessage, label, ...props }) => {
  const id = nanoid();

  const onErrorStyle = {
    color: "red",
    borderColor: "red",
    outlineColor: "red",
  };

  return (
    <div className="form-input">
      <input
        style={isOnError ? onErrorStyle : {}}
        id={id}
        className="form-input__input"
        {...props}
      />
      {label && (
        <label
          style={isOnError ? onErrorStyle : {}}
          htmlFor={id}
          className="form-input__label"
        >
          {label}
        </label>
      )}
      {isOnError && <span className="form-input__error">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;

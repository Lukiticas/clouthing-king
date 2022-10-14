import "./FormInput.styles.scss";
import { nanoid } from "nanoid";

const FormInput = ({ label, ...props }) => {
  const id = nanoid();
  return (
    <div className="form-input">
      <input id={id} className="form-input__input" {...props} />
      {label && (
        <label htmlFor={id} className="form-input__label">
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

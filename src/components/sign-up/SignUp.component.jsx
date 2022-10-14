import { useEffect, useState } from "react";
import { createAuthWithEmailAndPassword } from "../../utils/firebase/auth.firebase.utils";
import ButtonComponent from "../button-component/button.component";
import FormInput from "../form-input/FormInput.component";
import "./SignUp.styles.scss";

const signDataValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [signData, setSignData] = useState(signDataValues);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState({
    email: false,
    displayName: false,
    password: false,
    confirmPassword: false,
  });
  const { displayName, email, password, confirmPassword } = signData;

  useEffect(() => {
    const removeUserCreatedMessage = setTimeout(() => {
      setUserCreated(false);
    }, 2000);

    return () => clearTimeout(removeUserCreatedMessage);
  }, [userCreated]);

  const handleChange = (target) => {
    const { value, name } = target;
    setSignData((el) => ({
      ...el,
      [name]: value.trim(),
    }));
    handleError(name, true);
  };

  const handleError = (value, reset = false) => {
    setError((prev) => ({ ...prev, [value]: reset ? false : true }));
  };

  const resetForm = () => {
    setSignData(signDataValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordInputs = [...event.target.elements].filter((el) =>
      ["password", "confirmPassword"].includes(el.name)
    );

    if (password !== confirmPassword) {
      ["password", "confirmPassword"].forEach((el) => handleError(el));
      passwordInputs.forEach((el) => {
        el.setCustomValidity("Password must be the same!");
      });
      return;
    }

    try {
      await createAuthWithEmailAndPassword(displayName, email, password);
      setUserCreated(true);
      resetForm();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError((prevErr) => ({ ...prevErr, email: true }));
      }
      console.log("error signing up user: ", err);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="sign-up__title">Don't have an account?</h2>
      <span className="sign-up__span">
        Sign Up With your email and password
      </span>
      <form className="sign-up__input-group" onSubmit={handleSubmit}>
        <FormInput
          isOnError={error.displayName}
          label={"Display Name"}
          value={displayName}
          onChange={({ target }) => handleChange(target)}
          type="text"
          name="displayName"
          placeholder="Display Name"
          required
        />

        <FormInput
          isOnError={error.email}
          errorMessage="email already in use!"
          label={"Email"}
          value={email}
          onChange={({ target }) => handleChange(target)}
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <FormInput
          label={"Password"}
          isOnError={error.password}
          errorMessage="password do not match"
          value={password}
          minLength={8}
          onChange={({ target }) => handleChange(target)}
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <FormInput
          label={"Confirm Password"}
          isOnError={error.confirmPassword}
          errorMessage="password do not match"
          value={confirmPassword}
          minLength={8}
          onChange={({ target }) => handleChange(target)}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />

        <ButtonComponent
          colors={{ primary: "black", secundary: "white" }}
          type="submit"
          hasOutline={true}
        >
          Sign Up!
        </ButtonComponent>
        {userCreated && (
          <span className="sign-up__success">User Created successfully</span>
        )}
      </form>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import { createAuthWithEmailAndPassword } from "../../utils/firebase/auth.firebase.utils";
import ButtonComponent from "../button-component/button.component";
import Button from "../button-component/button.component";
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
  const { displayName, email, password, confirmPassword } = signData;

  const handleChange = (target) => {
    const { value, name } = target;
    setSignData((el) => ({ ...el, [name]: value.trim() }));
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
      passwordInputs.forEach((el) =>
        el.setCustomValidity("Password must be the same!")
      );
      return;
    }

    try {
      await createAuthWithEmailAndPassword(displayName, email, password);
      console.log(`signed up user: "${displayName}"!!`);

      resetForm();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
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
          label={"Display Name"}
          value={displayName}
          onChange={({ target }) => handleChange(target)}
          type="text"
          name="displayName"
          placeholder="Display Name"
          required
        />

        <FormInput
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
      </form>
    </div>
  );
};

export default SignUp;

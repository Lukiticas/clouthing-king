import "./SignIn.styles.scss";

import { useState } from "react";

import {
  SignInUserWithEmailAndPassword,
  logGoogleUser,
} from "../../utils/firebase/auth.firebase.utils";

import ButtonComponent from "../../components/button-component/Button.component";
import FormInput from "../../components/form-input/FormInput.component";
import FormHeader from "../form-header/FormHeader.component";

const signInValues = {
  email: "",
  password: "",
};

const errorValues = {
  password: false,
  email: false,
};

const SignIn = () => {
  const [signInData, setSignInData] = useState(signInValues);
  const [error, setError] = useState(errorValues);

  const { email, password } = signInData;

  const handleChange = ({ value, name }) => {
    setSignInData((el) => ({ ...el, [name]: value }));
    setError(name, true);
  };

  const handleError = (value, reset = false) => {
    setError((prevEl) => ({ ...prevEl, [value]: reset ? false : true }));
  };

  const handleLoginWithGoogle = async () => {
    await logGoogleUser();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await SignInUserWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          handleError("email");
          console.log("erro no email");
          break;
        case "auth/wrong-password":
          handleError("password");
          break;
        case "auth/invalid-email":
          handleError("email");
          break;
        default:
          console.log(`unsuspected error: ${error}`);
      }
    }
  };

  const inputs = [
    {
      label: "Email",
      value: email,
      type: "text",
      name: "email",
      placeholder: "Email",
      required: true,
      onChange: ({ target }) => handleChange(target),
      isOnError: error.email,
      errorMessage: "User not found",
    },
    {
      label: "Password",
      value: password,
      type: "password",
      name: "password",
      placeholder: "Password",
      required: true,
      onChange: ({ target }) => handleChange(target),
      isOnError: error.password || error.email,
      errorMessage: error.password ? "wrong password" : "",
    },
  ];

  return (
    <div className="sign-in">
      <FormHeader
        title={"I already have an account"}
        subtitle="Sign in with your email and password"
      />

      <form className="sign-in__inputs" onSubmit={handleLogin}>
        {inputs.map((el, idx) => (
          <FormInput key={idx + el.name} {...el} />
        ))}

        <div className="sign-in__inputs__buttons">
          <ButtonComponent
            colors={{ primary: "black", secundary: "white" }}
            hasOutline={true}
            type="submit"
          >
            Sign In
          </ButtonComponent>
          <ButtonComponent
            colors={{ primary: "#4285f4", secundary: "white" }}
            hasOutline={true}
            type="button"
            onClick={handleLoginWithGoogle}
          >
            Sign in with Google
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

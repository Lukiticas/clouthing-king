import "./SignIn.styles.scss";
import { useState } from "react";
import { auth, signInGPopUp } from "../../utils/firebase/auth.firebase.utils";
import ButtonComponent from "../../components/button-component/Button.component";
import FormInput from "../../components/form-input/FormInput.component";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormHeader from "../form-header/FormHeader.component";
import { CreateUserDocumentFromAuth } from "../../utils/firebase/firestore.firebase.utils";

const logGoogleUser = async () => {
  const { user } = await signInGPopUp();
  const userDocRef = await CreateUserDocumentFromAuth(user);
  return userDocRef;
};

const logWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signInValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [signInData, setSignInData] = useState(signInValues);
  const { email, password } = signInData;

  const [error, setError] = useState({ password: false, email: false });

  const handleChange = ({ value, name }) => {
    setSignInData((el) => ({ ...el, [name]: value }));
    setError(name, true);
  };

  const handleError = (value, reset = false) => {
    setError((prevEl) => ({ ...prevEl, [value]: reset ? false : true }));
  };

  const handleLoginWithGoogle = (event) => {
    event.preventDefault();
    logGoogleUser().then((data) => console.log(data));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    logWithEmail(email, password)
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.code == "auth/user-not-found") {
          handleError("user");
        }

        if (error.code == "auth/wrong-password") {
          handleError("password");
        }

        console.log(`unsuspected error: ${error}`);
      });
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

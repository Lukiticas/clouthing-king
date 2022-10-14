import "./SignIn.styles.scss";
import { useState } from "react";
import { auth, signInGPopUp } from "../../utils/firebase/auth.firebase.utils";
import ButtonComponent from "../../components/button-component/Button.component";
import FormInput from "../../components/form-input/FormInput.component";
import { signInWithEmailAndPassword } from "firebase/auth";

const logGoogleUser = async () => {
  const { user } = await signInGPopUp();
  const userDocRef = await CreateUserDocumentFromAuth(user);
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
  const [error, setError] = useState({ password: false, user: false });
  const { email, password } = signInData;

  const handleChange = (target) => {
    const { value, name } = target;
    setSignInData((el) => ({ ...el, [name]: value }));
    setError({ user: false, password: false });
  };

  const handleError = (payload) => {
    setError((prevEl) => ({ ...prevEl, [payload]: true }));
    console.log(error);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    logWithEmail(email, password).catch((error) => {
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
          handleError("user");
          break;
        case "auth/wrong-password":
          handleError("password");
          break;
        default:
          console.log({ error });
          break;
      }
      return;
    });
  };

  return (
    <div className="sign-in">
      <h2 className="sign-in__title">I already have an account</h2>
      <span className="sign-in__span">
        Sign in with your email and password
      </span>

      <form className="sign-in__inputs" onSubmit={handleLogin}>
        <FormInput
          isOnError={error.user}
          errorMessage="User not found"
          value={email}
          onChange={({ target }) => handleChange(target)}
          name="email"
          label="email"
          placeholder="email"
          type="email"
          required
        />
        <FormInput
          isOnError={error.password || error.user}
          errorMessage={error.password ? "wrong password" : ""}
          value={password}
          onChange={({ target }) => handleChange(target)}
          name="password"
          label="password"
          placeholder="password"
          type="password"
          required
        />

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
            onClick={handleLogin}
          >
            Sign in with Google
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

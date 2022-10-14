import "./SignIn.styles.scss";
import { signInGPopUp } from "../../utils/firebase/auth.firebase.utils";
import { CreateUserDocumentFromAuth } from "../../utils/firebase/firestore.firebase.utils";
import SignUp from "../../components/sign-up/SignUp.component";
import ButtonComponent from "../../components/button-component/Button.component";

const logGoogleUser = async () => {
  const { user } = await signInGPopUp();
  const userDocRef = await CreateUserDocumentFromAuth(user);
};

const SignIn = () => {
  return (
    <div>
      <h2>Sign In Page</h2>
      <ButtonComponent
        colors={{ primary: "#4285f4", secundary: "white" }}
        onClick={logGoogleUser}
      >
        Sign in with Google Popup
      </ButtonComponent>
      <SignUp />
    </div>
  );
};

export default SignIn;

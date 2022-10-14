import "./SignPage.styles.scss";
import SignUp from "../../components/sign-up/SignUp.component";
import SignIn from "../../components/sign-in/SignIn.component";

const SignPage = () => {
  return (
    <div className="sign-page">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignPage;

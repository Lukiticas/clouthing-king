import { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/user.context";

import { createAuthWithEmailAndPassword } from "../../utils/firebase/auth.firebase.utils";

import ButtonComponent from "../button-component/button.component";
import FormHeader from "../form-header/FormHeader.component";
import FormInput from "../form-input/FormInput.component";

import "./SignUp.styles.scss";

const signDataValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const errorValues = {
  email: false,
  displayName: false,
  password: false,
  confirmPassword: false,
};

const SignUp = () => {
  const [signData, setSignData] = useState(signDataValues);
  const [userCreated, setUserCreated] = useState(false);

  const [error, setError] = useState(errorValues);

  const { setCurrentUser } = useContext(userContext);

  const { displayName, email, password, confirmPassword } = signData;

  const inputs = [
    {
      label: "Display Name",
      value: displayName,
      type: "text",
      name: "displayName",
      placeholder: "Display Name",
      required: true,
      onChange: ({ target }) => handleChange(target),
      isOnError: error.displayName,
    },
    {
      label: "Email",
      value: email,
      type: "email",
      name: "email",
      placeholder: "Email",
      required: true,
      onChange: ({ target }) => handleChange(target),
      isOnError: error.email,
      errorMessage: "email already in use!",
    },
    {
      label: "Password",
      value: password,
      type: "password",
      name: "password",
      placeholder: "Password",
      required: true,
      onChange: ({ target }) => handleChange(target),
      isOnError: error.password,
      errorMessage: "password do not match",
    },
    {
      label: "Confirm Password",
      value: confirmPassword,
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      required: true,
      onChange: ({ target }) => handleChange(target),
      isOnError: error.confirmPassword,
      errorMessage: "password do not match",
    },
  ];

  const handleChange = ({ value, name }) => {
    setSignData((el) => ({
      ...el,
      [name]: value.trim(),
    }));

    if (error[name]) {
      handleError(name, true);
      return;
    }
  };

  const handleError = (value, reset = false) => {
    setError((prev) => ({ ...prev, [value]: reset ? false : true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      handleError("password");
      handleError("confirmPassword");
      return;
    }

    try {
      await createAuthWithEmailAndPassword(displayName, email, password);

      setUserCreated(true);
      setSignData(signDataValues);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        handleError("email");
      }
      console.log(`error signing up user: ${error} `);
    }
  };

  useEffect(() => {
    const removeUserCreatedMessage = setTimeout(() => {
      setUserCreated(false);
    }, 2000);

    return () => clearTimeout(removeUserCreatedMessage);
  }, [userCreated]);

  return (
    <div className="sign-up">
      <FormHeader
        title={"Don't have an account?"}
        subtitle={"Sign Up With your email and password"}
      />
      <form className="sign-up__input-group" onSubmit={handleSubmit}>
        {inputs.map((el, idx) => (
          <FormInput key={el.name + idx} {...el} />
        ))}

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

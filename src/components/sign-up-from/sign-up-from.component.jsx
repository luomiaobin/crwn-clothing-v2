import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDorumentFromAuth,
  // signInWithGooglePopup
} from "../utils/firebase/firebase.util";

import FormInput from "../form-input/form-input.component";
import "./sign-up-from.style.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpFrom = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDorumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("email already in use");
      }
    }
  };
  // const loginGoogleUserWithPopup = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   console.log(user);
  //   createUserDorumentFromAuth(user);
  // };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Dispaly Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="ConfirmPassword"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <div className="buttons-container">
          <Button type="submit" buttontype={"inverted"}>
            Sign Up
          </Button>
          {/* <Button type="button" buttontype={"google"} onClick={loginGoogleUserWithPopup} >
            Google Sign Up
          </Button> */}
        </div>
      </form>
    </div>
  );
};
export default SignUpFrom;

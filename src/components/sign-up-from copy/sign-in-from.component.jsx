import { useState, useEffect } from "react";
import {
  auth,
  SignInUserWithEmailAndPassword,
  signInWithGoogleRedirect,
  createUserDorumentFromAuth,
} from "../utils/firebase/firebase.util";
import { getRedirectResult } from "firebase/auth";

import FormInput from "../form-input/form-input.component";
import "./sign-in-from.style.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInFrom = () => {
  useEffect(() => {
    async function fetchInfo() {
      const redirectResult = await getRedirectResult(auth);
      if (redirectResult != null) {
        const { user } = redirectResult;
        createUserDorumentFromAuth(user);
        console.log(user);
      }
    }
    fetchInfo();
  }, []);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await SignInUserWithEmailAndPassword(email, password);
      console.log(user);
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit" buttontype={"inverted"}>
            Sign In
          </Button>
          <Button
            type="button"
            buttontype={"google"}
            onClick={signInWithGoogleRedirect}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInFrom;

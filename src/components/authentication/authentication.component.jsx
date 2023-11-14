
import SignUpFrom from "../sign-up-from/sign-up-from.component";
import SignInFrom from "../sign-up-from copy/sign-in-from.component";
import "./authentication.style.scss";
const Authentication = () => {


  return (
    <div className="authentication-container">
      <SignInFrom />
      <SignUpFrom />
    </div>
  );
};
export default Authentication;

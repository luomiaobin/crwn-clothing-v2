import { Fragment } from "react/cjs/react.development";
import "./button.style.scss";

const BUTTON_TYPE_CLASS = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttontype, ...otherProps }) => {
  return (
    <Fragment>
      <button
        className={`button-container ${BUTTON_TYPE_CLASS[buttontype]}`}
        {...otherProps}
      >
        {children}
      </button>
    </Fragment>
  );
};

export default Button;

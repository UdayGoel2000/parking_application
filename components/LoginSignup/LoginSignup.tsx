import { typeProp } from "../../utils/type";
import styles from "./LoginSignup.module.css";
import NavBar from "../NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { setLocalAttributes } from "../../utils/commonFunction";
import { isAuthenticated } from "../../_Auth/AuthService";
import { useMyContext } from "../../context/DataProvider";

const LoginSignup = ({ type }: typeProp) => {
  const { state, handleState } = useMyContext();
  const navigate = useNavigate();
  const handleChange = ({ key, value }: { key: string; value: string }) => {
    handleState({ [key]: value });
  };
  const handleSecondaryActionClick = () => {
    handleState({ userName: "", password: "" });
  };
  const handleButtonClick = () => {
    if (state.userName.length >= 4 && state.password.length >= 4) {
      if (type === "login") {
        if (isAuthenticated(state.userName, state.password)) {
          handleState({ isAuth: true });
          handleState({ userName: "", password: "" });
          navigate("/dashboard");
        } else {
          alert("Please Sign Up to Login");
          handleState({ isAuth: false });
        }
      } else {
        setLocalAttributes("userName", state.userName);
        setLocalAttributes("password", state.password);
        handleState({ userName: "", password: "" });
        navigate("/login");
      }
    } else {
      alert("Give correct Credentials");
    }
  };

  return (
    <div className={styles.mainDiv}>
      <NavBar />
      <div className={styles.containerDiv}>
        <button id={styles.crossButton} onClick={() => navigate("/")}>
          X
        </button>
        <h3>{type === "login" ? "Log In" : "Sign Up"}</h3>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            value={state.userName}
            onChange={(e) =>
              // handleState({ userName: e.currentTarget.value })
              handleChange({ key: "userName", value: e.currentTarget.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={(e) =>
              handleChange({ key: "password", value: e.currentTarget.value })
            }
          />
        </div>
        <button className={styles.button} onClick={handleButtonClick}>
          {type === "login" ? "Login" : "SignUp"}
        </button>

        {type === "login" ? (
          <p>
            Don’t have an account?{" "}
            <Link
              className={styles.secondaryAction}
              to="/signup"
              onClick={handleSecondaryActionClick}
            >
              Sign Up Now
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              className={styles.secondaryAction}
              to="/login"
              onClick={handleSecondaryActionClick}
            >
              Log In Here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
export default LoginSignup;

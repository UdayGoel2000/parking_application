import style from "./HomePage.module.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <div className={style.mainDiv}>
      <NavBar />
      <div className={style.containerDiv}>
        <button
          className={style.button}
          id={style.LoginButton}
          onClick={() => handleClick("login")}
        >
          Log In
        </button>
        <button
          data-testid="sign-up-button"
          className={style.button}
          id={style.SignUpButton}
          onClick={() => handleClick("signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default Homepage;

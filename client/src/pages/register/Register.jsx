import { useRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password doesn't matched!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstance.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Captiona</h3>
          <span className="loginDesc">
            Connect with everybody on Captiona.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Enter a Username"
              required
              ref={username}
              type="text"
              className="loginInput"
            />
            <input
              placeholder="Enter your Email-Id"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Enter a new Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm your Password"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

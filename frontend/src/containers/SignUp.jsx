import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../reducks/users/operations";

const SignUp = ({ trigger, setTrigger, setsignin }) => {
  const dispatch = useDispatch();

  const [user_name, setUserName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputUserName = (event) => {
    setUserName(event.target.value);
  };

  const inputEmail = (event) => {
    setEmail(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const signUpButton = () => {
    dispatch(signUp(user_name, email, password));
    setUserName("");
    setEmail("");
    setPassword("");
    const key = localStorage.getItem("CYBERSHOP_LOGIN_USER_KEY");
    if (!key) {
      console.log(key);
      setTrigger(false);
    }
  };

  return trigger ? (
    <>
      <section className="popup">
        <div className="popup-inner">
          <div className="popup-preview">
            <div className="popup-inner">
              <h4>
                <span className="cyber">Cyber</span>
                <span className="shop">shop</span>
              </h4>
              <h5>
                <b>SIGN UP</b>
              </h5>

              <div className="input">
                <input
                  type="text"
                  value={user_name}
                  onChange={inputUserName}
                  required
                  placeholder="User Name"
                />{" "}
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={inputEmail}
                  required
                  placeholder="Email address"
                />{" "}
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={inputPassword}
                  required
                  placeholder="Password"
                />
              </div>

              <button className="button" onClick={signUpButton}>
                SIGN UP
              </button>
              <p>
                Already a Member?{" "}
                <u
                  onClick={() => {
                    setsignin(true);
                    setTrigger(false);
                  }}
                >
                  Sign In.
                </u>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    ""
  );
};

export default SignUp;

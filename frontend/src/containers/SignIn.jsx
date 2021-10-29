import { push } from "connected-react-router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../reducks/users/operations";
const SignIn = ({ trigger, setTrigger, setsignup }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const inputEmail = (event) => {
    setEmail(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };
  const submitButton = (event) => {
    event.preventDefault();
    dispatch(signIn(email, password));
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
                <b>SIGN IN</b>
              </h5>

              <div className="input">
                <input
                  type="email"
                  onChange={inputEmail}
                  value={email}
                  required
                  placeholder="Email address"
                />
                <br />
                <input
                  type="password"
                  onChange={inputPassword}
                  value={password}
                  required
                  placeholder="Password"
                />
              </div>

              <button className="button" onClick={submitButton}>
                JOIN US
              </button>
              <p>
                Not a Member?
                <u
                  onClick={() => {
                    setsignup(true);
                    setTrigger(false);
                  }}
                >
                  Join Us.
                </u>
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

export default SignIn;

import React, { useState, useEffect } from "react";
import ImageDribbleLightPreview from "../../assets/img/Dribbble-Light-Preview.png";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import SignUp from "../../containers/SignUp";
import SignIn from "../../containers/SignIn";

const Header = () => {
  const [popupSignin, setPopupSignin] = useState(false);
  const [popupSignup, setPopupSignup] = useState(false);
  useEffect(() => {
    const key = localStorage.getItem("CYBERSHOP_LOGIN_USER_KEY");
    if (!key) {
      console.log(key);
      setPopupSignin(true);
    }
  }, []);
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <section className="header-box">
          <div
            className="header"
            onClick={() => {
              dispatch(push("/"));
            }}
          >
            <span className="cyber">Cyber</span>
            <span className="shop">shop</span>
          </div>
          <div className="row">
            <div
              className="sign-in"
              onClick={() => {
                setPopupSignin(true);
              }}
            >
              Sign In
            </div>
            <div
              className="sign-in"
              onClick={() => {
                setPopupSignup(true);
              }}
            >
              Sign Up
            </div>
            <img
              className="cart-icon"
              src={ImageDribbleLightPreview}
              onClick={() => {
                dispatch(push("cart"));
              }}
            />
          </div>
        </section>
      </header>
      <SignIn
        trigger={popupSignin}
        setTrigger={setPopupSignin}
        setsignup={setPopupSignup}
      />
      <SignUp
        trigger={popupSignup}
        setTrigger={setPopupSignup}
        setsignin={setPopupSignin}
      />
    </>
  );
};

export default Header;

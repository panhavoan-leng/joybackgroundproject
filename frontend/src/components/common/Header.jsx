import React, { useState, useEffect } from "react";
import ImageDribbleLightPreview from "../../assets/img/Dribbble-Light-Preview.png";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import SignUp from "../../containers/SignUp";
import SignIn from "../../containers/SignIn";
import { signOut } from "../../reducks/users/operations";

const Header = () => {
  const [popupSignin, setPopupSignin] = useState(false);
  const [popupSignup, setPopupSignup] = useState(false);
  const [loginbutton, setloginbutton] = useState(false);
  useEffect(() => {
    const key = localStorage.getItem("CYBERSHOP_LOGIN_USER_KEY");
    if (key) {
      setPopupSignin(false);
    }
  }, []);

  const dispatch = useDispatch();
  const signOutButton = () => {
    dispatch(signOut());
    setPopupSignin(true);
  };
  const key = localStorage.getItem("CYBERSHOP_LOGIN_USER_KEY");
  if (!key) {
  }
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
            <span className="sign-in" onClick={signOutButton}>
              Logout
            </span>
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

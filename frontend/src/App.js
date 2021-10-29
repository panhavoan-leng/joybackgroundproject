import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./reducks/users/selectors";
import { fetchUserFromLocalStorage } from "./reducks/users/operations";
import { getSubtotal } from "./reducks/cart/selectors";
import Router from "./Router";
import "./assets/style.css";
import Footer from "./components/common/Footer";

let pageUrl = window.location.toString();

function App() {
  const [showFooter, setShowFooter] = useState(true);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUser(selector);
  const subtotal = getSubtotal(selector);

  useEffect(() => {
    if (
      pageUrl.includes("checkout") ||
      pageUrl.includes("order-confirmation")
    ) {
      setShowFooter(false);
    }
    dispatch(fetchUserFromLocalStorage());
  }, []);
  return (
    <>
      <Router />
      {showFooter && <Footer price={subtotal} />}
    </>
  );
}

export default App;

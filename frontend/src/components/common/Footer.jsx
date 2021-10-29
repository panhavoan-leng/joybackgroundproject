import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
const Footer = ({ price }) => {
  const dispatch = useDispatch();
  return (
    <footer>
      <div className="subtotal">
        <span className="subtotal-test">Subtotal:</span>
        <span className="subtotal-price">${price}</span>
      </div>

      <button
        onClick={() => {
          dispatch(push("/shipping"));
        }}
      >
        Check Out
      </button>
    </footer>
  );
};

export default Footer;

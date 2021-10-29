import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
const ThankYou = () => {
  const dispatch = useDispatch();
  return (
    <>
      <center>
        <div className="box">
          <p>- Thank you for your ordering - </p>
        </div>
      </center>
      <center>
        <div className="message">
          <p>Thank you for your ordering. We received your request.</p>
          <p>Our stuff will be contacting with you to tell next steps.</p>
        </div>
      </center>
      <center>
        <div className="backhome">
          <button
            onClick={() => {
              dispatch(push("/"));
            }}
          >
            Back to Home
          </button>
        </div>
      </center>
    </>
  );
};

export default ThankYou;

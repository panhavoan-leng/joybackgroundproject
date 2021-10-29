import React from "react";
import { Route, Switch } from "react-router";
import Index from "./containers/Index";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import Cart from "./containers/Cart";
import Shipping from "./containers/Shipping";
import ThankYou from "./containers/ThankYou";

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={Index} />
        <Route exact path={"/cart"} component={Cart} />
        <Route exact path={"/shipping"} component={Shipping} />
        <Route exact path={"/thankyou"} component={ThankYou} />
      </Switch>
    </>
  );
};
export default Router;

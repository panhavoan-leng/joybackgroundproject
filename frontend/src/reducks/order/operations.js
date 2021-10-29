import API from "../../API";
import { addOrderAction } from "./actions";

const api = new API();

export const addOrder = (params) => {
  return async (dispatch) => {
    console.log("params", params);
    return api
      .orderAdd(
        // params.total_price,
        // params.full_name,
        // params.address_line1,
        // params.address_line2,
        // params.city,
        // params.state,
        // params.postal_code,
        // params.country,
        // params.telephone
        params
      )
      .then((order) => {
        dispatch(addOrderAction(order));
      })
      .catch((error) => {
        alert("Failed to connect API to add cart");
        console.log(error);
      });
  };
};

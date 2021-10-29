import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../API";
import { getCarts, getSubtotal } from "../reducks/cart/selectors";
import { fetchCarts } from "../reducks/cart/operations";
import { addOrder } from "../reducks/order/operations";
import { push } from "connected-react-router";
const api = new API();

const Shipping = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const subtotal = getSubtotal(selector);
  const carts = getCarts(selector);

  const [full_name, setFullName] = useState(""),
    [phone, setPhone] = useState(""),
    [address, setAddress] = useState(""),
    [pincode, setPincode] = useState(""),
    [apt, setApt] = useState(""),
    [city, setCity] = useState(""),
    [state, setState] = useState(""),
    [totalitem, setTotalItem] = useState(0);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  useEffect(() => {
    let arr = [];
    if (carts != undefined && carts.length > 0) {
      for (let key in carts) {
        arr.push(carts[key].quantity);
      }
      let sum = arr.reduce(function (a, b) {
        return a + b;
      }, 0);
      setTotalItem(sum);
    }
  }, [carts]);

  const inputFullname = (e) => {
    setFullName(e.target.value);
  };

  const inputPhoneNumber = (e) => {
    setPhone(e.target.value);
  };

  const inputAddress = (e) => {
    setAddress(e.target.value);
  };

  const inputPin = (e) => {
    setPincode(e.target.value);
  };

  const inputApt = (e) => {
    setApt(e.target.value);
  };

  const inputCity = (e) => {
    setCity(e.target.value);
  };

  const inputState = (e) => {
    setState(e.target.value);
  };

  const orderButton = (e) => {
    let params = {
      total_price: subtotal,
      full_name: full_name,
      address_line1: address,
      address_line2: apt,
      city: city,
      state: state,
      postal_code: pincode,
      country: "US",
      telephone: phone,
    };
    dispatch(addOrder(params));
    e.preventDefault();
    dispatch(push("thankyou"));
  };
  return (
    <div>
      <div className="box">
        <p>- Order your items -</p>
      </div>

      <section className="details">
        <h3>Shipment Details</h3>
        <h4>Please check your items and confirm it</h4>
        <table>
          <tbody>
            {carts &&
              carts.map((cart) => (
                <tr>
                  <td>{cart.item_id.name}</td>
                  <td>{cart.quantity}</td>
                  <td>${cart.item_id.price}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr class="total">
              <td>Total</td>
              <td>{totalitem}</td>
              <td>${subtotal}</td>
            </tr>
          </tfoot>
        </table>
        <form action="/">
          <div className="form">
            <label for="name">Full name</label> <br />
            <input
              type="text"
              name="full_name"
              id="name"
              placeholder="Enter Recipients name"
              onChange={inputFullname}
              required
            />
            <br />
            <label for="number">Phone Number</label> <br />
            <input
              type="text"
              name="phone"
              id="name"
              placeholder="Enter Phone Number"
              onChange={inputPhoneNumber}
              required
            />{" "}
            <br />
            <label for="address">Street address or P.O. Box</label> <br />
            <input
              type="text"
              name="address"
              id="name"
              placeholder="Enter Street address or P.O. Box"
              onChange={inputAddress}
              required
            />{" "}
            <br />
            <label for="zip">PIN code</label> <br />
            <input
              type="text"
              name="pincode"
              id="name"
              placeholder="Enter PIN Code"
              onChange={inputPin}
              required
            />{" "}
            <br />
            <label for="house">
              Apt, suite, unit, building, floor, etc.
            </label>{" "}
            <br />
            <input
              type="text"
              name="apt"
              id="name"
              placeholder="Enter Apt, suit, unit, building, floor, etc"
              onChange={inputApt}
              required
            />{" "}
            <br />
            <label for="city">City</label> <br />
            <input
              type="text"
              name="city"
              id="name"
              placeholder="Enter City"
              onChange={inputCity}
              required
            />{" "}
            <br />
            <label for="state">State</label> <br />
            <input
              type="text"
              name="state"
              id="name"
              placeholder="Enter State"
              onChange={inputState}
              required
            />
          </div>

          <div className="submit">
            <input
              type="submit"
              name="submit"
              value="SUBMIT"
              className="submitbutton"
              onClick={orderButton}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Shipping;

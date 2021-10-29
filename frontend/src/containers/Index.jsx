import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ImgSony256 from "../assets/img/sony-256.png";
import ImgTvPicTop from "../assets/img/tv pic top.svg";
import Product from "../components/common/Product";
import { fetchCarts } from "../reducks/cart/operations";
import { getCarts } from "../reducks/cart/selectors";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Index = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const carts = getCarts(selector);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCarts());
  }, []);

  return (
    <>
      <Header />
      <div>
        <section className="main-visual">
          <img className="top" src={ImgTvPicTop} />
          <img id="sony" src={ImgSony256} />

          <div className="ad">
            <p className="one">A NEW TV EXPERIENCE AWAKENS</p>
            <p className="two">BRAVIA</p>
            <p className="three">OLED</p>
          </div>
        </section>

        <section className="content">
          <ul className="items">
            {products &&
              products.map((product) => (
                <Product key={product.id} carts={carts} product={product} />
              ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Index;

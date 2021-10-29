import axios from "axios";
var baseURL;
const LOGIN_USER_KEY = "CYBERSHOP_LOGIN_USER_KEY";
baseURL = "http://127.0.0.1:8000";
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    if (config.requireToken) {
      const user = localStorage.getItem(LOGIN_USER_KEY)
        ? JSON.parse(localStorage.getItem(LOGIN_USER_KEY))
        : null;
      config.headers.common["Authorization"] = user.token;
    }
    return config;
  },
  (err) => console.error(err)
);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(LOGIN_USER_KEY);
    }
    return Promise.reject(error);
  }
);
export default class API {
  signUp = async (username, email, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    const savedPost = await api
      .post("/user/signup/", formData)
      .then((response) => {
        console.log("hello world");
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return savedPost;
  };
  signIn = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const savedPost = await api
      .post("/user/signin/", formData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return savedPost;
  };
  /////////////////////////
  // Products
  /////////////////////////
  getProducts = async () => {
    let url = "/items/";
    const products = await api
      .get(url, { requireToken: true })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return products;
  };
  getProduct = async (id) => {
    const product = await api
      .get("/items/" + id + "/", { requireToken: true })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return product;
  };
  getCarts = async () => {
    const carts = await api
      .get("cart/", {
        requireToken: true,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return carts;
  };
  addCarts = async (item_id) => {
    const savedCart = await api
      .post(
        "/cart/add/",
        {
          item_id,
          quantity: 1,
        },
        { requireToken: true }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return savedCart;
  };
  updateCarts = async (cart_id, quantity) => {
    const savedCart = await api
      .put(
        "/cart/update/" + cart_id + "/",
        {
          quantity: quantity,
        },
        { requireToken: true }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return savedCart;
  };
  deleteCarts = async (cart_id) => {
    const response = await api
      .delete("/cart/delete/" + cart_id + "/", { requireToken: true })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  };
  orderAdd = async (orderBody) => {
    console.log("orderBbody", orderBody);
    const formData = new FormData();
    for (const key in orderBody) {
      formData.append(key, orderBody[key]);
    }
    const order = await api
      .post("/order/add/", formData, { requireToken: true })
      .then((response) => {
        console.log(formData);
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return order;
  };
}

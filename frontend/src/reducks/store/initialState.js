const initialState = {
  posts: {
    list: [],
  },
  products: {
    list: [],
  },
  carts: {
    list: [],
    subtotal: 0,
  },
  user: {
    username: "",
    email: "",
    token: "",
    token_expires_at: "",
  },
  order: {
    list: [],
    subtotal: 0,
  },
  signin: {
    email: "",
    password: "",
  },
};

export default initialState;

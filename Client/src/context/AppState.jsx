import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const Url = "http://localhost:3000/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filtereData, setFiltereData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${Url}/product/all`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });
        console.log(api.data.products);
        setProducts(api.data.products);
        setFiltereData(api.data.products);
        if (isAuthenticated) {
          userProfile();
        }
        userCart();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
    getAddress();
  }, [token, reload, isAuthenticated]);

  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (name, email, password) => {
    try {
      const api = await axios.post(
        `${Url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return api.data;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const api = await axios.post(
        `${Url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);
      return api.data;
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const userProfile = async () => {
    try {
      const api = await axios.get(`${Url}/user/profile`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      console.log("User profile:", api.data.user);
      setUser(api.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const addToCart = async (productId, title, price, qty, imgSrc) => {
    try {
      const api = await axios.post(
        `${Url}/cart/add`,
        { productId, title, price, qty, imgSrc },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const userCart = async () => {
    try {
      const api = await axios.get(`${Url}/cart/user`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      if (api.data.cart) {
        console.log("User cart:", api.data.cart);
        setCart(api.data.cart);
      } else {
        console.log("Cart not found, initializing a new cart.");
        setCart({ items: [] });
      }
    } catch (error) {
      console.error("Error retrieving user cart:", error);
    }
  };
  //--qty
  const decreaseQty = async (productId, qty) => {
    try {
      const api = await axios.post(
        `${Url}/cart/--qty`,
        { productId, qty },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {}
  };
  //remove items form cart

  const removeFromCart = async (productId) => {
    try {
      const api = await axios.delete(
        `${Url}/cart/remove/${productId}`,

        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {}
  };

  //clear cart

  const clearCart = async () => {
    try {
      const api = await axios.delete(
        `${Url}/cart/clear`,

        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {}
  };

  //Add address

  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    try {
      const api = await axios.post(
        `${Url}/address/add`,
        { fullName, address, city, state, country, pincode, phoneNumber },

        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return api.data;
    } catch (error) {}
  };

  //get user latest address

  const getAddress = async () => {
    const api = await axios.get(`${Url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("user Address",api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };

  const fetchOrders = async () => {
    try {
      const api = await axios.get(`${Url}/user/orders`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      setOrders(api.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };




  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        Url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filtereData,
        setFiltereData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
      }}
    >
      {props.children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default AppState;

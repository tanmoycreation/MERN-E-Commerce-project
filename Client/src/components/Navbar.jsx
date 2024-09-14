import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { setFiltereData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFiltereData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFiltereData(products.filter((data) => data.price >= price));
    
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${searchTerm.trim()}`);
    }
  };

  return (
    <div className="nav sticky-top">
      <div className="nav_bar">
        <Link
          to={"/"}
          className="left"
          style={{ textDecoration: "none", color: "white" }}
        >
          <h3>Home</h3>
        </Link>
        <form className="search_bar" onSubmit={submitHandler}>
          <span className="material-symbols-outlined">search</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search products..."
          />
        </form>
        <div className="right">
          {isAuthenticated && (
            <>
              <Link
                to={"/cart"}
                type="button"
                className="btn btn-primary position-relative mx-3"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {cart?.items?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </Link>
              <Link to={"/profile"} className="btn btn-info mx-3">
                Profile
              </Link>
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to={"/login"} className="btn btn-secondary mx-3">
                Login
              </Link>
              <Link to={"/register"} className="btn btn-info mx-3">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {location.pathname == "/" && (
        <div className="sub_bar">
          <div className="items" onClick={() => setFiltereData(products)}>
            No Filter
          </div>
          <div className="items" onClick={() => filterbyCategory("mobiles")}>
            Mobile
          </div>
          <div className="items" onClick={() => filterbyCategory("laptops")}>
            Laptop
          </div>
          <div className="items" onClick={() => filterbyCategory("cameras")}>
            Camera
          </div>
          <div className="items" onClick={() => filterbyCategory("headphones")}>
            Headphone
          </div>
          <div className="items" onClick={() => filterbyPrice(2500)}>
          2500
          </div>
          <div className="items" onClick={() => filterbyPrice(25999)}>
            25999
          </div>
          <div className="items" onClick={() => filterbyPrice(49999)}>
            49999
          </div>
          <div className="items" onClick={() => filterbyPrice(69999)}>
            69999
          </div>
          <div className="items" onClick={() => filterbyPrice(79999)}>
            79999
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber);

    if (result.success) {
      navigate("/checkout");
    }

    console.log("Address added", result);

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="container my-3 p-5" style={{ border: "2px solid yellow", borderRadius: "10px" }}>
      <h1 className="text-center">Shipping Address</h1>
      <form onSubmit={submitHandler} className="my-3">
        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="fullName" className="form-label">Name</label>
            <input
              name="fullName"
              value={fullName}
              onChange={onChangerHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="fullName"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="country" className="form-label">Country</label>
            <input
              name="country"
              value={country}
              onChange={onChangerHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="country"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="state" className="form-label">State</label>
            <input
              name="state"
              value={state}
              onChange={onChangerHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="state"
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="city" className="form-label">City</label>
            <input
              name="city"
              value={city}
              onChange={onChangerHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="city"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="pincode" className="form-label">PinCode</label>
            <input
              name="pincode"
              value={pincode}
              onChange={onChangerHandler}
              type="number"
              className="form-control bg-dark text-light"
              id="pincode"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChangerHandler}
              type="number"
              className="form-control bg-dark text-light"
              id="phoneNumber"
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address/Nearby</label>
            <textarea
              name="address"
              value={address}
              onChange={onChangerHandler}
              className="form-control bg-dark text-light"
              id="address"
            />
          </div>
        </div>
        <div className="d-grid col-6 mx-auto my-5">
          <button type="submit" className="btn btn-primary" style={{fontWeight:'bold'}}>Submit</button>
        </div>
      </form>
      {userAddress && (
        <div className="d-grid col-6 mx-auto my-5">
          <button className="btn btn-warning" onClick={()=>navigate("/checkout")} style={{fontWeight:'bold'}}>Use Old Address</button>
        </div>
      )}
    </div>
  );
};

export default Address;

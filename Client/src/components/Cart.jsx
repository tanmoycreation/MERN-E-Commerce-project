import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, decreaseQty, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        totalQty += cart.items[i].qty;
        totalPrice += cart.items[i].price
      }
    }
    setPrice(totalPrice);
    setQty(totalQty);
  }, [cart]);

  return (
    <>

    {cart?.items?.length ==0 ? (
<>
<div className="text-center" style={{display:'flex', justifyContent: 'center', marginTop: "100px"}}>
<button

          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          onClick={()=>navigate('/')}
        >
          Continue Shopping...
          
        </button>
        </div>
</>
    ): (
      <>
       <div className="my-5 text-center">
        <button
          className="btn btn-info mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Qty: {qty}
        </button>
        <button
          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Price: {price}
        </button>
      </div>
      </>  
    )}
      
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-dark my-5 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt={product.title}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
              <h2>{product.title}</h2>
              <h4>Price: {product.price}</h4>
              <h4>Qty: {product.qty}</h4>
            </div>
            <div className="cart_des"></div>
            <div className="cart_action">
              <button
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product.productId, 1)}
              >
                Qty--
              </button>
              <button
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() =>
                  addToCart(
                    product.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                Qty++
              </button>
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (confirm("are you sure,want remove from cart")) {
                    removeFromCart(product.productId);
                  }
                }}
              >
                Remove{" "}
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold" }}
            onClick={()=>navigate('/shipping')}
          >
            Check out
          </button>
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              if (confirm("are you sure,you want to clear cart...?")) {
                clearCart();
              }
            }}
          >
            Clear cart
          </button>
        </div>
      )}

      {/* <div className="container text-center">
        <button className="btn btn-warning mx-3" style={{ fontWeight: "bold" }}>
          Check out
        </button>
        <button
          className="btn btn-danger mx-3"
          style={{ fontWeight: "bold" }}
          onClick={clearCart}
        >
          Clear cart
        </button>
      </div> */}
    </>
  );
};

export default Cart;

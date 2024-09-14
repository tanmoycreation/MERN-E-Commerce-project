import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom"; // Import Link properly from react-router-dom

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (products && category) {
      setRelatedProduct(
        products.filter(
          (data) => data?.category?.toLowerCase() === category.toLowerCase()
        )
      );
    }
  }, [category, products]);

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Related Products</h1>
      <div className="row d-flex justify-content-center">
        {relatedProduct.length > 0 ? (
          relatedProduct.map((product) => (
            <div
              key={product._id}
              className="col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light text-center"
                style={{
                  width: "18rem",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderBottom: "2px solid yellow",
                    }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title mb-2">{product.title}</h5>
                  <div className="my-3">
                    <span className="btn btn-primary mx-3">
                      {product.price} {"₹"}
                    </span>
                    <button
                      className="btn btn-warning"
                      style={{ borderRadius: "20px" }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;

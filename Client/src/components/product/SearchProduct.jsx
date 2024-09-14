import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    console.log('Products:', products); // Check if products are available
    console.log('Search term:', term);  // Check the search term
    if (products && term) {
      setSearchProduct(
        products.filter(
          (data) => data?.title?.toLowerCase()?.includes(term.toLowerCase())
        )
      );
    }
  }, [term, products]);

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Search Results</h1>
      <div className="row d-flex justify-content-center">
        {searchProduct.length > 0 ? (
          searchProduct.map((product) => (
            <div
              key={product._id}
              className="col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            >
              <div className="card bg-dark text-light text-center" style={{ width: "18rem", borderRadius: "15px", overflow: "hidden" }}>
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
                  <div className="d-flex justify-content-center align-items-center my-3">
                    <span className="btn btn-primary fw-bold mx-3" style={{ marginRight: "10px" }}>
                      {product.price} {"₹"}
                    </span>
                    <button className="btn btn-warning" style={{ borderRadius: "20px" }}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;

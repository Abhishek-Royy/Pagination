import React, { useEffect, useState } from "react";
import "./pagination.css";

function Pagination() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(2);

  const fetchProduct = async () => {
    try {
      let res = await fetch(
        "https://dummyjson.com/products?limit=100&&select=title,price,images"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      let data = await res.json();
      setProduct(data.products);
      console.log(product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const selectPageHandeler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= product.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="main">
        {product.slice(page * 10 - 10, page * 10).map((item, index) => (
          <div key={index} className="box">
            <div className="image">
              <img src={item.images[0]} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
          </div>
        ))}
      </div>
      {product.length > 0 && (
        <div className="pagination-bar">
          <span
            onClick={() => selectPageHandeler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀️
          </span>
          {[...Array(product.length / 10)].map((_, pageNumber) => (
            <span
              className={page === pageNumber + 1 ? "page__selected" : ""}
              onClick={() => selectPageHandeler(pageNumber + 1)}
              key={pageNumber}
            >
              {pageNumber + 1}
            </span>
          ))}

          <span
            onClick={() => selectPageHandeler(page + 1)}
            className={page < product.length / 10 ? "" : "pagination__disable"}
          >
            ▶️
          </span>
        </div>
      )}
    </>
  );
}

export default Pagination;

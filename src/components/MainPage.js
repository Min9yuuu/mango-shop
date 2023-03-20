import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import "./MainPage.css";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let url = `${API_URL}products`;
    axios
      .get(url)
      .then((result) => {
        const products = result.data.products;
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div id='body'>
        <div id='banner'>
          <img src='images/banners/banner1.png' alt='' />
        </div>
        <h1>Products</h1>
        <div id='product-list'>
          {products.map((product, idx) => {
            return (
              <div className='product-card' key={idx}>
                <Link className='product-link' to={`/ProductPage/${product.id}`}>
                  <div>
                    <img className='product-img' src={`${API_URL}${product.imageUrl}`} alt={product.name} />
                  </div>
                  <div className='product-content'>
                    <span className='product-name'>{product.name}</span>
                    <span className='product-price'>{product.price}</span>
                    <div className='product-footer'>
                      <span className='product-seller'>
                        <img src='images/icons/avatar.png' alt='product-seller' className='product-avatar' />
                        <span>{product.seller}</span>
                      </span>
                      <span className='product-date'>{dayjs(product.createdAt).format("YYYY/MM/DD")}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    let url = `http://127.0.0.1:8080/products/${id}`;
    axios
      .get(url)
      .then((result) => {
        setProduct(result.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (product == null) {
    return <h1>상품정보를 받고있습니다...</h1>;
  }
  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        id='back-btn'
      >
        뒤로
      </button>
      <div id='image-box'>
        <img src={`/${product.imageUrl}`} alt='상품이미지' />
      </div>
      <div id='profile-box'>
        <img src='/images/icons/avatar.png' alt={product.seller} />
        <span className='product-seller'>{product.seller}</span>
      </div>
      <div className='content-box'>
        <div id='name'>{product.name}</div>
        <div id='price'>{product.price}원</div>
        <div id='createAt'>{product.createdAt}</div>
        <div id='description'>{product.description}</div>
      </div>
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    let url = `https://ef587965-572a-40c0-9a18-bf0691453835.mock.pstmn.io/products/${id}`;
    axios
      .get(url)
      .then((result) => {
        setProduct(result.data);
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
        <img src={`/${product.imageUrl}`} alt='' />
      </div>
      <div id='profile-box'>
        <img src='/images/icons/avatar.png' alt={product.seller} />
        <span className='product-seller'>{product.seller}</span>
      </div>
      <div className='content-box'>
        <div id='name'>{product.name}</div>
        <div id='price'>{product.price}원</div>
        <div id='createAt'>2023.03.10</div>
        <div id='description'>{product.desc}</div>
      </div>
    </div>
  );
};

export default ProductPage;

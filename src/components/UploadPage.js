import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, Divider, InputNumber, message } from "antd";
import { API_URL } from "../config/constants";
import "./UploadPage.css";
import axios from "axios";

const { TextArea } = Input;
const UploadPage = () => {
  const [imageUrl, setimageUrl] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Hello, Ant Design!");
  };
  const navigator = useNavigate();
  const onFinish = (val) => {
    axios
      .post(`${API_URL}products`, {
        name: val.name,
        description: val.description,
        price: val.price,
        seller: val.seller,
        imageUrl: imageUrl,
      })
      .then((result) => {
        navigator("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        message.error("에러가 발생했습니다.");
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setimageUrl(imageUrl);
    }
  };

  return (
    <div id='upload-container'>
      <Form name='uploadForm' onFinish={onFinish}>
        <Form.Item name='upload'>
          <Upload name='image' action={`${API_URL}image`} listType='picture' showUploadList={false} onChange={onChangeImage}>
            {imageUrl ? (
              <img id='upload-img' src={`${API_URL}${imageUrl}`} alt='' />
            ) : (
              <div id='upload-img-placeholder'>
                <img src='/images/icons/camera.png' alt='' />
                <span>이미지를 업로드 해주세요</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item label={<div className='upload-label'>판매자명</div>} name='seller' rules={[{ required: true, message: "판매자명은 필수 입력 사항입니다." }]}>
          <Input className='upload-name' size='large' placeholder='이름을 입력해주세요' />
        </Form.Item>
        <Divider />
        <Form.Item label={<div className='upload-label'>상품명</div>} name='name' rules={[{ required: true, message: "상품명은 필수 입력 사항입니다." }]}>
          <Input className='upload-name' size='large' placeholder='상품명을 입력해주세요' />
        </Form.Item>
        <Divider />
        <Form.Item label={<div className='upload-price'>판매가</div>} name='price' rules={[{ required: true, message: "판매가는 필수 입력 사항입니다." }]}>
          <InputNumber className='upload-price' size='large' min={0} defaultValue={0} />
        </Form.Item>
        <Divider />
        <Form.Item label={<div className='upload-label'>상품설명</div>} name='description' rules={[{ required: true, message: "상품설명은 필수 입력 사항입니다." }]}>
          <TextArea size='large' id='product-description' showCount maxLength={300} placeholder='상품설명을 작성해주세요' />
        </Form.Item>
        <Form.Item>
          {contextHolder}
          <Button id='submit-button' size='large' htmlType='submit' onClick={info}>
            상품등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadPage;

import { Form, Input, Button, Upload, Divider, InputNumber } from "antd";
// ConfigProvider import 하면 적용 가능.
import { API_URL } from "../config/constans";
import "./UploadPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const onFinish = (val) => {
    console.log(val);
    axios
      .post(`${API_URL}/products`, {
        name: val.name,
        description: val.description,
        price: val.price,
        seller: val.seller,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id='upload-container'>
      {/* <ConfigProvider theme={{token:{colorPrimary:"#ff0000"}}}> */}
      <Form name='uploadForm' onFinish={onFinish}>
        <Form.Item name='upload'>
          <Upload name='image' action={`${API_URL}/image`} listType='picture' showUploadList={false} onChange={onChangeImage}>
            {imageUrl ? (
              <img id='upload-img' src={`${API_URL}/${imageUrl}`} alt='' />
            ) : (
              <div id='upload-img-placeholder'>
                <img src='./images/icons/camera.png'></img>
                <span>이미지를 업로드 해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider></Divider>
        <Form.Item label={<span className='upload-label'>상품명</span>} name='name' rules={[{ required: true, message: "상품명은 필수 입력 사항입니다." }]}>
          <input className='upload-name' placeholder='상품명을 입력해주세요.' size='large' />
        </Form.Item>
        <Form.Item label={<span className='upload-label'>판매자</span>} name='seller' rules={[{ required: true, message: "판매자 이름은 필수 입력 사항입니다." }]}>
          <input className='upload-seller' placeholder='판매자 이름을 입력해주세요.' size='large' />
        </Form.Item>
        <Divider></Divider>
        <Form.Item label={<span className='upload-price'>판매가</span>} name='price' rules={[{ required: true, message: "판매가는 필수 입력 사항입니다." }]}>
          <InputNumber className='upload-price' min={0} defaultValue={1} size='large'></InputNumber>
        </Form.Item>
        <Divider></Divider>
        <Form.Item name='description' label={<div className='upload-label'>상품설명</div>} rules={[{ required: true, message: "상품설명을 입력해주세요" }]}>
          <Input.TextArea size='large' id='product-description' showCount maxLength={300} placeholder='상품설명을 작성해주세요' />
        </Form.Item>
        <Form.Item>
          <Button id='submit-button' size='large' htmlType='submit'>
            상품등록하기
          </Button>
        </Form.Item>
      </Form>
      {/* </ConfigProvider> */}
    </div>
  );
};

export default UploadPage;

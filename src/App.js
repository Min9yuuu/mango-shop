import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";
import UploadPage from "./components/UploadPage";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <div id='header'>
        <div id='header-area'>
          <img src='./images/icons/logo.png' alt='' />
        </div>
      </div>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/ProductPage/:id' element={<ProductPage />}></Route>
        <Route path='/UploadPage' element={<UploadPage />}></Route>
      </Routes>
      <div id='footer'>
        <a href='#'>회사소개</a>
        <a href='#'>이용약관</a>
        <a href='#'>통신판매업:123-1234</a>
        <a href='#'>사업자등록번호:456-56-78951</a>
        <a href='#'>고객센터:456-78951</a>
      </div>
    </div>
  );
}

export default App;

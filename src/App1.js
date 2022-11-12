import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
 const [data,setData] = useState("");
 const [product,setProduct] = useState([]);
 const [pName,setPname] = useState("");
 const [pPrice,setPprice] = useState(0);

 const getDashboardData = async () => {
  const dashData = await axios.get("http://localhost:3003/dashboard")
  setData(dashData.data.message)
 };

 const getServiceData = async () => {
  const serviceData = await axios.get("http://localhost:3003/service")
  setData(serviceData.data.message)
 };

const getProductData = async () => {
  const productData = await axios.get("http://localhost:3003/products")
  setProduct(productData.data)
}

const addProduct = async () => {
  const product = await axios.post("http://localhost:3003/create-product",{
    name : pName,
    price : pPrice
  })
  alert("Product Added")
}

 return (
  <div className='App'>
    <button onClick={getDashboardData}>Dashboard Data</button>
    <button onClick={getServiceData}>Service Data</button>
    <br/>
    {data}
    <br/>
    <input type={"text"} value={pName} onChange={(e) => setPname(e.target.value)}></input>
    <input type={"text"} value={pPrice} onChange={(e) => setPprice(e.target.value) }></input>
    <button onClick={addProduct}>Add Product</button>    
    <button onClick={getProductData}>Product Data</button>
    <br/>
    <ul>
      {
        product.map((item) => {
          return <li>Brand : {item.name} - Price : {item.price}</li>
        })
      }
    </ul>
  </div>
 );
}

export default App;

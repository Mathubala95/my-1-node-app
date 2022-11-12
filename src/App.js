import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {useFormik} from "formik"
import axios from 'axios';
import { useEffect, useState } from 'react';
import {config} from "./config"


function App() {

  const [pList,setPlist] = useState([])
  const [isEdit,setEdit] = useState(false)
  const [productId,setProductId] = useState(null)
  


 

  useEffect(() => {
    const fetchData = async () => {
try{
  const products = await axios.get (`${config.api}/products`)
  setPlist(products.data)
}catch(error) {
  alert("React not List Products")
}      
    };
    fetchData()
  },[])

  const formik = useFormik({
    initialValues : {
      name : "",
      price : "",
    },
    
    onSubmit : async (values) => {
      try{
       if (!isEdit){
        const product = await axios.post(`${config.api}/product`,values);
        setPlist([...pList,{...values, _id : product.data.id}])
        formik.resetForm()
       }
       else{
        await axios.put(`${config.api}/product/${productId}`,values);
        const pIndex = pList.findIndex(p => p._id == productId)
        pList[pIndex] = values
        setPlist([...pList])
        formik.resetForm()
        setEdit(false)
       }
      }
      catch (error){
        alert("React went wrong")
      }
    }

  });

  const deleteProduct = async (id) => {
    try{
      await axios.delete(`${config.api}/product/${id}`)
      const pIndex = pList.findIndex((p) => p.id == id)
      pList.splice(pIndex,1)
      setPlist([...pList])
    }catch (error){
      // alert(error.response.data.message)
      alert("React Not Deleting")
      // alert(error.response.data.message); went set the backend error message on front end

    }
  }

  const editProduct = async (id) => {
    try{
      const product = await axios.get(`${config.api}/product/${id}`)
      formik.setValues(product.data)
      setProductId(id)
      setEdit(true)
    }catch (error){
      alert("React Not Editing")
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6'>
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              <div className='col-lg-6'>
                <label>Name:</label>
                <input type={"text"} className="form-control" 
                name="name" 
                value={formik.values.name}
                onChange={formik.handleChange}/>
              </div>
              <div className='col-lg-6'>
                <label>Price:</label>
                <input type={"text"} className="form-control" 
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}/>
              </div>
            </div>
            <br/>
            <div className='row'>
              
                <input type={"submit"} value={isEdit ? 'Update' : 'Submit'} className='btn btn-primary'></input>
           
            </div>
          </form>

        </div>
        <div className='col-lg-6'>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>

                
              </tr>
            </thead>
            <tbody>
             
                {
                  pList.map((item,index) => {
                    return  <tr>
                    <th scope="row">{item._id}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => editProduct(item._id)} className='btn btn-primary btn-sm'>Edit</button>
                  <button onClick={() => deleteProduct(item._id)} className='btn btn-danger btn-sm '>Delete</button>
                 
                </td>

                </tr>   
                  })
                }
              
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default App;

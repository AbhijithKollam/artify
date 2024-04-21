import React, { useContext, useEffect } from 'react'
import Header from '../Components/Header'
import ArtCard from './ArtCard'
import { useState } from 'react';
import '../Styles/Cart.css'
import { Button, Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import { addArtCartAPI, addArtWishlistAPI } from '../Services/allAPI';
import { cartToHeaderResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';

function Cart({ head, item }) {

  
  // console.log(price);
  // console.log(artistName);

  

 

  // const schema = yup.object().shape({
  //   firstName: yup.string().required(),
  //   lastName: yup.string().required(),
  //   username: yup.string().required(),
  //   city: yup.string().required(),
  //   state: yup.string().required(),
  //   zip: yup.string().required(),
  //   file: yup.mixed().required(),
  //   terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
  // });

  const [token, setToken] = useState("")
  const { cartToHeader, setCartToHeader } = useContext(cartToHeaderResponseContext)




  const handleCart = async (e) => {
    e.preventDefault();
    const reqBody =  item ;
    console.log("reqBody Data ====", reqBody);

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await addArtCartAPI(reqBody, reqHeader)
    console.log("from backend", result);
    if(result.status == 200){

      Swal.fire({
        title: 'Done!',
        text: 'Added to cart successfully',
        icon: 'success',
        // confirmButtonText: 'Cool'
      })
      // alert("Added to cart Successfully")
      setCartToHeader(true)
    }
    else{
      Swal.fire({
        title: '',
        text: `${result.response.data}`,
        icon: 'error',
        // confirmButtonText: 'Cool'
      })
      // alert(result.response.data)
    }
  }


  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])


  return (

    <>

      <button className='btn btn-success w-30 shadow-md shadow-[#040c16] mt-3' onClick={handleCart} ><i class="fa-solid fa-cart-shopping"></i> Add Cart</button>
      {/* <input type="text" style={{ display: "none" }} /> */}

      






      


    </>
  )
}


export default Cart
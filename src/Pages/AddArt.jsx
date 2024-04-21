import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { addArtAPI } from '../Services/allAPI';
import { addArtResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';
function AddProject() {
  // useContext hook is used to access context-api
  const { addArtResponse, setAddArtResponse } = useContext(addArtResponseContext)


  const [preview, setPreview] = useState("")
  const [show, setShow] = useState(false);
  const [token, setToken] =useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("---Art details---");
    const { title, artistName, height, width, price, description, artImage } = artDetails;
    if (!title || !artistName || !height || !width || !price || !description || !artImage) {
      Swal.fire({
        title: 'Done!',
        text: 'Please ill the form completely',
        icon: 'info',
        // confirmButtonText: 'Cool'
      })
      // alert("Please fill the form completely")
    }
    else {
      const reqBody = new FormData();
      reqBody.append('title', title)
      reqBody.append('artistName', artistName)
      reqBody.append('height', height)
      reqBody.append('width', width)
      reqBody.append('price', price)
      reqBody.append('description', description)
      reqBody.append('artImage', artImage)

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }

      const result = await addArtAPI(reqBody, reqHeader)
      if(result.status===200){
        Swal.fire({
          title: 'Done!',
          text: 'Art Added Successfully',
          icon: 'success',
          // confirmButtonText: 'Cool'
        })
        // alert("Art added successfully")

        setAddArtResponse(result)
        handleCloseClear();
        handleClose();
      }
      else{
        alert(result.response.data)
        handleCloseClear();
        handleClose();
      }
    }
    console.log(artDetails);
  }
  const handleCloseClear = () => {
    setArtDetails({
      title: "",
      artistName: "",
      height: "",
      width: "",
      price: "",
      description: "",
      artImage: ""
    })
    setPreview("")
  }

  const [artDetails, setArtDetails] = useState({
    title: "",
    artistName: "",
    height: "",
    width: "",
    price: "",
    description: "",
    artImage: ""
  })

  useEffect(() => {
    if (artDetails.artImage) {
      // defauly code to preview of image thatwe take from inputbox with type file
      setPreview(URL.createObjectURL(artDetails.artImage))
    }
  }, [artDetails.artImage])
  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
  },[])


  return (
    <>
      <button className='btn btn-success' onClick={handleShow}>Add</button>

      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header closeButton >
          <Modal.Title className='grid grid-cols-2  w-100 justify-between'>
            <p> Add your Art Work </p>
            <button className='text-end text-sm '> <i class="fa-solid fa-x ms-52 md:ms-96"></i></button>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="projectImageupload" className='m-5'>
                <input
                  onChange={(e) => { setArtDetails({ ...artDetails, artImage: e.target.files[0] }) }}
                  type="file" style={{ display: "none" }} id='projectImageupload' />
                <img src={preview ? preview : 'https://i.pngimg.me/thumb/f/720/comvecteezy644801.jpg'}
                  height={"200px"} alt="" />
              </label>

            </div>
            <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
              <div className='w-100 mt-3 mb-3'>
                <input
                  value={artDetails.title} onChange={(e) => { setArtDetails({ ...artDetails, title: e.target.value }) }}
                  type="text" className='form-control border border-success' placeholder='Title' />
              </div>

              <div className='w-100 mt-3'>
                <input
                  value={artDetails.artistName} onChange={(e) => { setArtDetails({ ...artDetails, artistName: e.target.value }) }}
                  type="text" className='form-control border border-success' placeholder='Artist Name' />
              </div>

              <div className='w-100 mt-3 d-flex gap-1'>
                <input
                  value={artDetails.height} onChange={(e) => { setArtDetails({ ...artDetails, height: e.target.value }) }}
                  type="number" className='form-control border border-success' placeholder='Height of Art' />
                <input
                  value={artDetails.width} onChange={(e) => { setArtDetails({ ...artDetails, width: e.target.value }) }}
                  type="number" className='form-control border border-success' placeholder='Width of Art' />

              </div>

              <div className='w-100 mt-3'>
                <input
                  value={artDetails.price} onChange={(e) => { setArtDetails({ ...artDetails, price: e.target.value }) }}
                  type="number" className='form-control border border-success' placeholder='Selling Price' />
              </div>

              <div className='w-100 mt-3'>
                <textarea
                  value={artDetails.description} onChange={(e) => { setArtDetails({ ...artDetails, description: e.target.value }) }}
                  className='form-control border border-success' placeholder='Description'></textarea>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary ' onClick={handleCloseClear}>
            Clear
          </button>
          <button className='btn btn-primary' onClick={handleAdd}>
            Add
          </button>
        </Modal.Footer>
      </Modal>



    </>
  )
}

export default AddProject
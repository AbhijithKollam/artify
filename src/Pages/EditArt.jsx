import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../Services/baseurl';
import { deleteArtApi, editUserArtApi } from '../Services/allAPI';
import {  deleteArtResponseContext, editArtResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';


function EditProject({ project, item }) {

    const { editArtResponse, setEditArtResponse } = useContext(editArtResponseContext)
    const { deleteArtResponse, setDeleteArtResponse } = useContext(deleteArtResponseContext)


    const [preview, setPreview] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [artDetails, setArtDetails] = useState({
        id: item._id,
        title: item.title,
        artistName: item.artistName,
        height: item.height,
        width: item.width,
        price: item.price,
        description: item.description,
        artImage: ""
    })
    useEffect(() => {
        if (artDetails.artImage) {
            setPreview(URL.createObjectURL(artDetails.artImage))
        }
    }, [artDetails.artImage])

    const handleReset = () => {
        setArtDetails({

            title: item.title,
            artistName: item.artistName,
            height: item.height,
            width: item.width,
            price: item.price,
            description: item.description,
            artImage: ""
        })
        setPreview("")
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const { title, artistName, height, width, price, description, artImage, id } = artDetails;
        if (!title || !artistName || !height || !width || !price || !description || !id) {
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
            reqBody.append("title", title);
            reqBody.append("artistName", artistName);
            reqBody.append("height", height);
            reqBody.append("width", width);
            reqBody.append("price", price);
            reqBody.append("description", description);
            preview ? reqBody.append("artImage", artImage) :
                reqBody.append("artImage", item.artImage);
            const token = sessionStorage.getItem("token");
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserArtApi(id, reqBody, reqHeader);
                console.log(result);
                if (result.status === 200) {
                    Swal.fire({
                        title: 'Done!',
                        text: 'Updated Successfully',
                        icon: 'success',
                        // confirmButtonText: 'Cool'
                      })
                    // alert("Project updated successfully")
                    setEditArtResponse(result)
                    handleClose();
                    // window.location.reload();
                    

                }
                else {
                    alert(result.response.data)
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserArtApi(id, reqBody, reqHeader);
                console.log(result);
                if (result.status === 200) {
                    Swal.fire({
                        title: 'Done!',
                        text: 'Updated Successfully',
                        icon: 'success',
                        // confirmButtonText: 'Cool'
                      })
                    // alert("Project updated successfully")
                    setEditArtResponse(result)
                    handleClose();
                    // window.location.reload();


                }
                else {
                    alert(result.response.data)
                }
            }
        }
    }

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteArtApi(id, reqHeader);
        console.log(result);
        if (result.status === 200) {
            Swal.fire({
                title: 'Done!',
                text: 'Deleted Successfully',
                icon: 'success',
                // confirmButtonText: 'Cool'
              })
            // alert("Project deleted successfully")
            setDeleteArtResponse(true)
            // getUserArt();
        }
        else {

        }
    }


    return (
        <>
            <div></div>
            <button className='btn'><i class="fa-solid fa-pen-to-square text-info" onClick={handleShow}></i></button>
            <button className='btn' ><i class="fa-solid fa-trash text-danger" onClick={() => handleDelete(item._id)}></i></button>


            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='grid grid-cols-2  w-100 justify-between'>
                        <p> Edit Details </p>
                        <button onClick={handleReset} className='text-end text-sm '> <i class="fa-solid fa-x ms-52 md:ms-96"></i></button>
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="projectImageupload" className='m-5'>
                                <input
                                    onChange={(e) => setArtDetails({ ...artDetails, artImage: e.target.files[0] })}
                                    type="file" style={{ display: "none" }} id='projectImageupload' />
                                <img src={preview ? preview : `${BASE_URL}/uploads/${item.artImage}`}
                                    height={"200px"} alt="" />
                            </label>

                        </div>
                        <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
                            <div className='w-100 mt-3 mb-3'>
                                <input
                                    value={artDetails.title}
                                    onChange={(e) => setArtDetails({ ...artDetails, title: e.target.value })}
                                    type="text" className='form-control border border-success' placeholder='Title' />
                            </div>

                            <div className='w-100 mt-3'>
                                <input
                                    value={artDetails.artistName}
                                    onChange={(e) => setArtDetails({ ...artDetails, artistName: e.target.value })}
                                    type="text" className='form-control border border-success' placeholder='Artist Name' />
                            </div>

                            <div className='w-100 mt-3 d-flex gap-1'>
                                <input
                                    value={artDetails.height}
                                    onChange={(e) => setArtDetails({ ...artDetails, height: e.target.value })}
                                    type="number" className='form-control border border-success' placeholder='Height' />
                                <input
                                    value={artDetails.width}
                                    onChange={(e) => setArtDetails({ ...artDetails, width: e.target.value })}
                                    type="number" className='form-control border border-success' placeholder='Width' />
                            </div>

                            <div className='w-100 mt-3'>
                                <input
                                    value={artDetails.price}
                                    onChange={(e) => setArtDetails({ ...artDetails, price: e.target.value })}
                                    type="number" className='form-control border border-success' placeholder='Selling Price' />
                            </div>

                            <div className='w-100 mt-3'>
                                <textarea
                                    value={artDetails.description}
                                    onChange={(e) => setArtDetails({ ...artDetails, description: e.target.value })}
                                    className='form-control border border-success' placeholder='Description'></textarea>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleReset} className="btn btn-secondary"  >
                        Reset
                    </button>
                    <button onClick={handleUpdate} className='btn btn-primary' >
                        Update
                    </button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default EditProject

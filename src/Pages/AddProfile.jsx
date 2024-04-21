import React, { useContext, useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { addProfileApi } from '../Services/allAPI';
import EditProfile from './EditProfile';
import { addProfileResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';

function AddProfile() {
    const { addProfileResponse, setAddProfileResponse } = useContext(addProfileResponseContext)
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShows = () => setShow(true);
    const [profileDetails, setProfileDetails] = useState({
        artistName: "",
        email: "",
        phone: "",
        address: "",
        numUpload: "",
        profileImage: ""
    })

    const handleCloseClear = () => {
        setProfileDetails({
            artistName: "",
            email: "",
            phone: "",
            address: "",
            numUpload: "",
            profileImage: ""
        })
        setPreview("")
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        console.log(profileDetails);
        const { artistName, email, phone, address, numUpload, profileImage } = profileDetails;
        if (!artistName || !email || !phone || !address || !numUpload || !profileImage) {
            Swal.fire({
                title: 'Done!',
                text: 'Please ill the form completely',
                icon: 'info',
                // confirmButtonText: 'Cool'
              })
            // alert("Please Fill the form completely")
        }
        else {
            const reqBody = new FormData();
            reqBody.append('artistName', artistName)
            reqBody.append('email', email)
            reqBody.append('phone', phone)
            reqBody.append('address', address)
            reqBody.append('numUpload', numUpload)
            reqBody.append('profileImage', profileImage)

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }

            const result = await addProfileApi(reqBody, reqHeader)
            console.log("result========", result);
            if (result.status === 200) {
                Swal.fire({
                    title: 'Done!',
                    text: 'Profile Added Successfully',
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                  })
                // alert("Profile added successfully")
                setAddProfileResponse(result)
                handleCloseClear();
                handleClose();
            }
            else {
                alert(result.response.data)
                handleCloseClear();
                handleClose();
            }
        }
        console.log(profileDetails);
    }
    useEffect(() => {
        if (profileDetails.profileImage) {
            // defauly code to preview of image thatwe take from inputbox with type file
            setPreview(URL.createObjectURL(profileDetails.profileImage))
        }
    }, [profileDetails.profileImage])

    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
    }, [])
    return (
        <>

            {/* <button className='btn' onClick={handleShow}>
                <i class="fa-solid fa-pen-to-square fs-2xl mx-auto"></i>
                Update
            </button> */}
            <button className='btn btn-warning d-flex text-center mx-auto m-3 items-center justify-center' onClick={handleShows}>Update</button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='grid grid-cols-2  w-100 justify-between'>

                        <p> Update Profile </p>
                        <button className='text-end text-sm '> <i class="fa-solid fa-x ms-52 md:ms-96"></i></button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} lg={6}>
                            <label htmlFor="projectImageupload" className='m-5'>
                                <input
                                    onChange={(e) => { setProfileDetails({ ...profileDetails, profileImage: e.target.files[0] }) }}
                                    type="file" id='projectImageupload' name='projectImageupload' />
                                <img src={preview ? preview : 'https://i.pngimg.me/thumb/f/720/comvecteezy644801.jpg'}
                                    height={"200px"} alt="" className='p-3' />
                            </label>
                        </Col>
                        <Col md={6} lg={6} className='text-xl grid gap-1'>
                            <input
                                value={profileDetails.artistName} onChange={(e) => { setProfileDetails({ ...profileDetails, artistName: e.target.value }) }}
                                type="text" placeholder='Enter your Name' />
                            <input
                                value={profileDetails.email} onChange={(e) => { setProfileDetails({ ...profileDetails, email: e.target.value }) }}
                                type="text" placeholder='Enter your Email Id' />
                            <input
                                value={profileDetails.phone} onChange={(e) => { setProfileDetails({ ...profileDetails, phone: e.target.value }) }}
                                type="text" placeholder='Enter your Phone Number' />
                            <input
                                value={profileDetails.address} onChange={(e) => { setProfileDetails({ ...profileDetails, address: e.target.value }) }}
                                type="text" placeholder='Enter your Address' />
                            <input
                                value={profileDetails.numUpload} onChange={(e) => { setProfileDetails({ ...profileDetails, numUpload: e.target.value }) }}
                                type="text" placeholder='Enter your No. of Uploads' />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-success' onClick={handleClose} >
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={handleAdd}>
                        Add
                    </button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default AddProfile
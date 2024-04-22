import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { editProfileApi } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseurl';
import { editProfileResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';

function EditProfile({ profile }) {


    const { editProfileResponse, setEditProfileResponse } = useContext(editProfileResponseContext)

    const [preview, setPreview] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [profileDetails, setProfileDetails] = useState({
        id: profile._id,
        artistName: profile.artistName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        numUpload: profile.numUpload,
        profileImage: ""
    })
    useEffect(() => {
        if (profileDetails.profileImage) {
            setPreview(URL.createObjectURL(profileDetails.profileImage))
        }
    }, [profileDetails.profileImage])
    const handleReset = () => {
        setProfileDetails({

            artistName: profile.artistName,
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
            numUpload: profile.numUpload,
            profileImage: ""
        })
        setPreview("");
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const { artistName, email, phone, address, numUpload, profileImage, id } = profileDetails;
        if (!artistName || !email || !phone || !address || !numUpload || !id) {
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
            reqBody.append("artistName", artistName);
            reqBody.append("email", email)
            reqBody.append("phone", phone)
            reqBody.append("address", address)
            reqBody.append("numUpload", numUpload)
            preview ? reqBody.append("profileImage", profileImage) :
                reqBody.append("profileImage", profile.profileImage)
            const token = sessionStorage.getItem("token");
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editProfileApi(id, reqBody, reqHeader);
                console.log("Edit profile API result=====");
                console.log(result);
                if (result.status === 200) {
                    // setProfileDetails(result);
                    Swal.fire({
                        title: 'Done!',
                        text: 'Profile Uploaded Successfully',
                        icon: 'success',
                        // confirmButtonText: 'Cool'
                    })
                    // alert("Profile uploaded successfully")
                    setEditProfileResponse(result)
                    handleClose();
                    console.log("edit response", editProfileResponse);

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
                const result = await editProfileApi(id, reqBody, reqHeader);
                console.log("Edit profile API result=====");
                console.log("result==", result);
                if (result.status === 200) {
                    // setProfileDetails(result);
                    Swal.fire({
                        title: 'Done!',
                        text: 'Profile Uploaded Successfully',
                        icon: 'success',
                        // confirmButtonText: 'Cool'
                    })
                    // alert("Profile uploaded successfully")
                    setEditProfileResponse(result)
                    handleClose();
                    console.log("edit response", editProfileResponse);


                }
                else {
                    alert(result.response.data)
                }
            }

        }
    }
    return (
        <>


            <button onClick={handleShow} className='btn' ><i class="fa-solid fa-pen-to-square text-xl mx-auto" ></i></button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='grid grid-cols-2  w-100 justify-between'>

                        <p> Edit </p>
                        <button className='text-end text-sm '> <i class="fa-solid fa-x ms-52 md:ms-96"></i></button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {/* <Col md={6} lg={6}>
                            <label htmlFor="projectImageuploads" className='m-5'>
                                <input
                                    onChange={(e) => { setProfileDetails({ ...profileDetails, profileImage: e.target.files[0] }) }}
                                    type="file" style={{ display: "none" }} id='projectImageuploads' />
                                <img src={preview ? preview : `${BASE_URL}/uploads/${profile.profileImage}`}
                                    height={"200px"} alt="" className='p-3' />
                            </label>
                        </Col> */}
                        <Col md={6} lg={6}>
                            <label htmlFor="projectImageUploads" className='m-5'>
                                <input
                                    onChange={(e) => { setProfileDetails({ ...profileDetails, profileImage: e.target.files[0] }) }}
                                    type="file" id='projectImageUploads' />
                                {preview ? <img src={preview} height={"200px"} alt="" className='p-3' /> :
                                    <img src={`${BASE_URL}/uploads/${profile.profileImage}`} height={"200px"} alt="" className='p-3' />}
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
                                type="text" placeholder='Enter your year of Experience' />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-success' onClick={handleReset} >
                        Reset
                    </button>
                    <button className='btn btn-primary' onClick={handleUpdate}>
                        Update
                    </button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default EditProfile
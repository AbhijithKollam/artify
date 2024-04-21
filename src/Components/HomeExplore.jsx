import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { BASE_URL } from '../Services/baseurl';
import { getProfileAPI } from '../Services/allAPI';

function HomeExplore({ item }) {

    const [profileDetails, setProfileDetails] = useState()
    // const {item2} = item;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showArtistModal, setShowArtistModal] = useState(false);
    const handleCloseArtistModal = () => setShowArtistModal(false);
    const handleShowArtistModal = () => setShowArtistModal(true);

    const getProfile = async (artistName) => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getProfileAPI(artistName, reqHeader);
            console.log("REsult fot profiles------");
            console.log(result.data);
            setProfileDetails(result.data)
           
        }

    }
    useEffect(() => {
        getProfile()
    }, [])

    return (

        <>

            <div className=' d-flex justify-content-evenly align-items-center gap-3 mt-3'>
                <button className='btn btn-success  shadow-md shadow-[#040c16]' onClick={handleShow}>Details</button>

            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='grid grid-cols-2  w-100 justify-between'>

                        <p> {item?.title}</p>
                        <button className='text-end text-sm '> <i className="fa-solid fa-x ms-52 md:ms-96"></i></button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} lg={6} className='d-flex text-center justify-center items-center'>
                            <img src={`${BASE_URL}/uploads/${item?.artImage}`} alt="" width={'100%'} height={'200px'} className='d-flex text-center justify-center items-center' />
                        </Col>
                        <Col md={6} lg={6} className=' p-5 text-xl'>
                            <p className='p-3'>Title : <span className='text-fuchsia-800'>{item?.title}</span></p>
                            <p className='p-3'>Artist Name: <span><a onClick={() => { handleShowArtistModal(profileDetails); getProfile(item?.artistName); }} style={{ textDecoration: "underline", cursor:"pointer" }}>{item?.artistName}</a></span></p>

                            <p className='p-3'>Description : <span className='text-fuchsia-800'>{item?.description}</span></p>
                            <p className='p-3'>Height x Width : <span className='text-fuchsia-800'>{item?.height}x{item?.width}</span></p>
                            <p className='p-3'>Price : <span className='text-fuchsia-800'>{item?.price}</span></p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            {/* Artist Modal */}
            <Modal show={showArtistModal} onHide={handleCloseArtistModal}>
                <div >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="profileModalLabel">{profileDetails?.artistName}</h5>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-3">
                                <img
                                    src={`${BASE_URL}/uploads/${profileDetails?.profileImage}`}
                                    // src={preview ? preview : 'https://i.pinimg.com/originals/6a/5b/31/6a5b3185c490202f2b693763a1f98abf.jpg'}
                                    height={"200px"} alt="" className="w-56 h-56 rounded-full shadow-2xl mx-auto" />                            </div>
                            <div class="form-group">
                                <label for="Phone Number">Phone Number:</label>
                                <input disabled type="text" class="form-control" id="firstName" value={`${profileDetails?.phone}`} />
                            </div>

                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input disabled type="email" class="form-control" id="email" value={`${profileDetails?.email}`} />
                            </div>
                            <div class="form-group">
                                <label for="Address">Address:</label>
                                <input disabled type="tel" class="form-control" id="phone" value={`${profileDetails?.address}`} />
                            </div>

                            <div class="form-group">
                                <label for="No. uploads"> Number of Years Experience:</label>
                                <input disabled type="text" class="form-control" id="lastName" value={`${profileDetails?.numUpload}`} />
                            </div>
                        </div>

                    </div>
                </div>

            </Modal>




        </>
    )
}

export default HomeExplore
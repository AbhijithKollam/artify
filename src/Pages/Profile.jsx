import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import ListGroup from 'react-bootstrap/ListGroup';
import EditProfile from './EditProfile';
import AddProfile from './AddProfile';
import { getProfileApi } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseurl';
import { addProfileResponseContext, editProfileResponseContext } from '../context/ContextShare';

function Profile({ head }) {

  const { addProfileResponse, setAddProfileResponse } = useContext(addProfileResponseContext)
  const { editProfileResponse, setEditProfileResponse } = useContext(editProfileResponseContext)



  const [userProfile, setUserProfile] = useState("")
  const [preview, setPreview] = useState("")

  const getUserProfile = async (e) => {

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getProfileApi(reqHeader);
      console.log("Inside get profile =====");
      console.log(result.data[0]);
      setUserProfile(result.data)
      console.log(editProfileResponse);


    }
  }
  useEffect(() => {
    if (userProfile.profileImage) {
      // default code to preview of image that we take from inputbox with type file
      setPreview(URL.createObjectURL(userProfile.profileImage))
    }
  }, [userProfile.profileImage])

  useEffect(() => {
    getUserProfile();
  }, [addProfileResponse, editProfileResponse])




  return (
    <>

      <Header head={head} />
      {
        userProfile.length > 0 ?
          userProfile.map((item) => (

            <div className='pt-32 bg-gray-200  rounded-lg shadow-md min-h-screen'>
              <div className="bg-gray-200 rounded-lg">
                <div className='text-center'>
                  <label htmlFor="projectImageupload" className=' ms-auto ' >
                    <input disabled
                      type="file" style={{ display: "none" }} id='projectImageupload' />
                    <img
                      src={`${BASE_URL}/uploads/${item?.profileImage}`}
                      // src={preview ? preview : 'https://i.pinimg.com/originals/6a/5b/31/6a5b3185c490202f2b693763a1f98abf.jpg'}
                      height={"200px"} alt="" className="w-56 h-56 rounded-full shadow-2xl mx-auto" />
                  </label>
                </div>
                <div className='bg-gray-200'>
                  <ListGroup className='shadow-md w-50 mx-auto' >
                    <ListGroup.Item >
                      <div className='d-flex justify-between text-center '>
                        <h4 className='text-center md:text-2xl text-warning'>
                          <input value={item.artistName}
                            type="text" disabled placeholder="Your Name" /></h4>


                        <EditProfile profile={item} />


                      </div>
                    </ListGroup.Item>

                    <ListGroup.Item className='text-warning'>Email ID : <span className='text-black'>
                      <input value={item.email}
                        type="text" disabled placeholder='Email' /></span> </ListGroup.Item>

                    <ListGroup.Item className='text-warning'>Phone Number :<span className='text-black'>
                      <input value={item.phone}
                        type="text" disabled placeholder='Phone Number' /></span></ListGroup.Item>

                    <ListGroup.Item className='text-warning'>Address :<span className='text-black'>
                      <input value={item.address}
                        type="text" disabled placeholder='Adrress' /></span></ListGroup.Item>

                    <ListGroup.Item className='text-warning'>Year of Experience :<span className='text-black'>
                      <input value={item.numUpload}
                        type="text" disabled placeholder='No. of Year Experience' /></span></ListGroup.Item>
                  </ListGroup>

                  {/* <AddProfile /> */}
                </div>
              </div>
            </div>

          )) :
          <div className='pt-32 bg-gray-200  rounded-lg shadow-md min-h-screen'>
            <div className="bg-gray-200 rounded-lg">
              <div className='text-center'>
                <label htmlFor="projectImageupload" className=' ms-auto ' >
                  <input disabled
                    type="file" style={{ display: "none" }} id='projectImageupload' />
                  <img
                    src={preview ? preview : 'https://i.pinimg.com/originals/6a/5b/31/6a5b3185c490202f2b693763a1f98abf.jpg'}
                    height={"200px"} alt="" className="w-56 h-56 rounded-full shadow-2xl mx-auto" />
                </label>
              </div>
              <div className='bg-gray-200'>
                <ListGroup className='shadow-md w-50 mx-auto' >
                  <ListGroup.Item >
                    <div className='d-flex justify-between text-center '>
                      <h4 className='text-center md:text-2xl text-warning'>
                        <input
                          type="text" disabled placeholder="Your Name" /></h4>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className='text-warning'>Email ID : <span className='text-black'>
                    <input
                      type="text" disabled placeholder='Email' /></span> </ListGroup.Item>

                  <ListGroup.Item className='text-warning'>Phone Number :<span className='text-black'>
                    <input
                      type="text" disabled placeholder='Phone Number' /></span></ListGroup.Item>

                  <ListGroup.Item className='text-warning'>Address :<span className='text-black'>
                    <input
                      type="text" disabled placeholder='Adrress' /></span></ListGroup.Item>

                  <ListGroup.Item className='text-warning'> No. of uploads :<span className='text-black'>
                    <input
                      type="text" disabled placeholder='Year of Experience' /></span></ListGroup.Item>
                </ListGroup>

                <AddProfile />
              </div>
            </div>
          </div>
        // <div className='pt-32'>
        //             <AddProfile />
        // </div>

      }


      {/* <div className='pt-32 bg-gray-200  rounded-lg shadow-md min-h-screen'>
        <div className="bg-gray-200 rounded-lg">
          <div className="mb-4">
            <img src={imageUrl} alt="Profile" className="w-56 h-56 rounded-full shadow-2xl mx-auto mb-4" />
          </div>

          <div>
            <div className='text-center'>
              <label htmlFor="projectImageupload" className=' ms-auto ' >
                <img src={preview ? preview : 'https://i.pinimg.com/originals/6a/5b/31/6a5b3185c490202f2b693763a1f98abf.jpg'}
                  height={"200px"} alt="" className="w-56 h-56 rounded-full shadow-2xl mx-auto" />
              </label>
            </div>


            <div className='bg-gray-200'>
              <ListGroup className='shadow-md w-50 mx-auto' >
                <ListGroup.Item >
                  <div className='d-flex justify-between text-center '>
                    <h4 className='text-center md:text-2xl text-warning'>
                      <input
                        type="text" disabled placeholder='Enter your Name' /></h4>
                    <EditProfile />
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className='text-warning'>Email ID : <span className='text-black'>
                  <p>{userProfile.email}</p></span> </ListGroup.Item>

                <ListGroup.Item className='text-warning'>Phone Number :<span className='text-black'>
                  <input
                    type="text" disabled placeholder='Enter your Phone Number' /></span></ListGroup.Item>

                <ListGroup.Item className='text-warning'>Address :<span className='text-black'>
                  <input
                    type="text" disabled placeholder='Enter your Adrress' /></span></ListGroup.Item>

                <ListGroup.Item className='text-warning'> No. of uploads :<span className='text-black'>
                  <input
                    type="number" disabled placeholder='Enter Your No. of Uploads' /></span></ListGroup.Item>
              </ListGroup>

              <AddProfile />

            </div>


          </div>
        </div>
      </div> */}


    </>
  )
}

export default Profile
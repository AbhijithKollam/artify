import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import MyArts from '../Pages/MyArts'
import { userArtAPI } from '../Services/allAPI'
import AddArt from '../Pages/AddArt'
import { addArtResponseContext, deleteArtResponseContext, editArtResponseContext } from '../context/ContextShare'


function Dashboard() {

    const { addArtResponse, setAddArtResponse } = useContext(addArtResponseContext)
    const { editArtResponse, setEditArtResponse } = useContext(editArtResponseContext)
    const { deleteArtResponse, setDeleteArtResponse } = useContext(deleteArtResponseContext)


    const [userName, setUserName] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const existingUserData = JSON.parse(sessionStorage.getItem("existingUser"))
            // console.log(existingUserData);
            setUserName(existingUserData.username)
        }
    }, [])

    const [userArt, setUserArt] = useState([])


    const getUserArt = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            console.log(token);
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await userArtAPI(reqHeader);
            console.log("Result fot user arts------");
            console.log(result);
            setUserArt(result.data);
        }

    }
    useEffect(() => {
        getUserArt();
    }, [addArtResponse,editArtResponse,deleteArtResponse])

    return (
        <>
            <div className='pt-32'>
                <Header dashboard={"dashboard"} />
                <i className='text-5xl mt-5 ms-3 px-10'>User : <span style={{ color: "orange" }}>{userName}</span></i>


                <div className=" d-flex pt-8 px-28">
                    <h3 className='text-success text-2xl ms-3 font-bold font-'>My Uploads</h3>
                    <div className="ms-auto">
                        <AddArt />
                    </div>
                </div>

                <Row style={{'--bs-gutter-x': '-1rem'}}>
                    <Col className='pt-5' >
                        <table className=' grid w-100 border-collapse border-none text-center items-center justify-center animate__animated animate__fadeInLeft '>
                            
                            <thead  className='p-3 border border-gray-600'>
                                <tr className='grid grid-cols-4 justify-center items-center text-md'> 
                                    <th>Image</th>
                                    <th >Title</th>
                                    <th className='d-none d-sm-table-cell d-md-table-cell'>Price</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            
                                {
                                    userArt.length > 0 ?
                                        userArt.map((item) => (
                                            <MyArts item={item} />
                                        )) :
                                        <p>No items to display</p>
                                }
                            
                        </table>

                    </Col>

                </Row>
            </div>
        </>
    )
}

export default Dashboard
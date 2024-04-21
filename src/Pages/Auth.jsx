import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from '../Assets/Artify-removebg-preview.png'
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../Services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';
import Swal from 'sweetalert2';


function Auth({ register }) {

    const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
    const registerForm = register ? true : false;
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log(userData);
        const { username, email, password } = userData;
        if (!username || !email || !password) {

            Swal.fire({
                title: 'Done!',
                text: 'Please ill the form completely',
                icon: 'info',
                // confirmButtonText: 'Cool'
              })
            // alert("Please fill the form completely")
        }
        else {
            const result = await registerAPI(userData)
            console.log(result);
            if (result.status === 200) {

                Swal.fire({
                    title: 'Done!',
                    text: 'User Registered Successfully',
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                  })
                // alert("User Registered Successfully")
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
            }
            else {
                alert(result.response.data)
            }
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = userData;
        if (!email || !password) {
            Swal.fire({
                title: 'Done!',
                text: 'Please ill the form completely',
                icon: 'info',
                // confirmButtonText: 'Cool'
              })
            // alert("Please fill the form completely")
        }
        else {
            const result = await loginAPI(userData);
            console.log(result);
            if (result.status === 200) {
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
                sessionStorage.setItem("token", result.data.token)
                setIsAuthToken(true)

                Swal.fire({
                    title: 'Done!',
                    text: 'User Logged in Successfully',
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                  })
                // alert("User logged in successfully")
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/dashboard')
                
            }
            else {
                alert(result.response.data)
            }
        }
    }


    return (
        <>
            <div className='d-flex justify-content-center align-items-center ms-auto w-full' style={{ height: "100vh", width: "100%" }}>
                <div className=' w-75 container lg:m-96 p-9'>
                    <Link to={'/'} style={{ textDecoration: "none" }}> <i class="fa-solid fa-arrow-left me-2"></i> Back to home</Link>

                    <div className='card bg-slate-400 p-4 mt-3 rounded  '>
                        <div className=' align-items-center '>
                            <div xs={12} className='text-center align-items-center justify-center ms-auto'>
                                <img src={authImage} alt="" width={"300px"} className='animate__animated animate__backInDown text-center align-items-center justify-center mx-auto' />

                            </div>
                            <div className=''>
                                <div className="d-flex  flex-column">

                                    {/* <h2><i class="fa-brands fa-stack-overflow me-3 ms-5 fs-2"></i>Project Fair</h2> */}
                                    <h2 className='text-2xl md:text-4xl mb-3 animate__animated animate__backInDown'>
                                        {
                                            registerForm ? "Sign Up your account" : "Sign into your account"
                                        }
                                    </h2>
                                    <Form>
                                        {
                                            registerForm &&
                                            <Form.Group md="4" controlId="validationCustom01" className='animate__animated animate__backInDown'>
                                                <Form.Label>User name</Form.Label>
                                                <Form.Control
                                                    value={userData.username}           //required to clear the data atlast
                                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                                    type="text"
                                                    placeholder="User name"
                                                />
                                            </Form.Group>

                                            
                                            

                                        }


                                        <Form.Group md="4" controlId="validationCustom01" className='animate__animated animate__backInDown'>
                                            <Form.Label className='mt-2'>Email</Form.Label>
                                            <Form.Control
                                                value={userData.email}
                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                type="email"
                                                placeholder=" Email"
                                            />
                                        </Form.Group>

                                        <Form.Group md="4" controlId="validationCustom01" className='animate__animated animate__backInDown'>
                                            <Form.Label className='mt-2'>Password</Form.Label>
                                            <Form.Control
                                                value={userData.password}
                                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}

                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Group>

                                    </Form>
                                    {
                                        registerForm ?
                                            <div>
                                                <button className='btn btn-warning rounded mt-3 mb-3 ms-auto animate__animated animate__backInDown' onClick={handleRegister}>Register</button>
                                                <p>Already a user? <Link to={'/login'} style={{ textDecoration: "none" }}>click here to Login</Link> </p>
                                            </div> :
                                            <div className='text-center'>
                                               
                                                    <button className='btn btn-warning rounded mt-3 mb-3 ms-auto animate__animated animate__backInDown' onClick={handleLogin} >Login</button>
                                                
                                                <p>Not a user? <Link to={'/register'} style={{ textDecoration: "none" }}>click here to Register</Link></p>
                                            </div>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}

export default Auth

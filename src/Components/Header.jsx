import React, { useContext, useEffect, useState } from 'react'
import Img from '../Assets/Artify-removebg-preview.png'
import '../Styles/Header.css'
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { cartLengthResponseContext, isAuthTokenContext } from '../context/ContextShare';
import { getCartAPI } from '../Services/allAPI';
import Swal from 'sweetalert2';




const logoStyles = {
    width: '100px',
    height: 'auto',


};

function Header({ dashboard, head }) {

    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

    // const { cartLength, setCartLength } = useContext(cartLengthResponseContext)




    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    const isDashboard = dashboard ? true : false;
    const isHead = head ? true : false;

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("existinguser")
        setIsAuthToken(false)

        Swal.fire({
            title: 'Done!',
            text: 'Log Out Successfully',
            icon: 'success',
            // confirmButtonText: 'Cool'
          })

        navigate("/")

    }



    //
    const [cart, setCart] = useState()
    const getCart = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getCartAPI(reqHeader);
            console.log("REsult fot carts in header------");
            console.log(result.data);
            setCart(result.data);
            console.log(cart);

        }

    }
    //







    useEffect(() => {
        getCart()
    }, [cart])


    return (
        <>
            <div className=' text-xl'>
                <nav className='navbar   top-0 z-10 w-full'>
                    <img className='brand animate__animated animate__slideInRight' sm={6} src={Img} alt="" />
                    {
                        isDashboard || isHead ?
                            <div className='animate__animated animate__slideInLeft'>
                                <ul className={` nav-links ${isNavOpen ? 'active' : ''}`}>
                                    <li className='hover:scale-110 duration-500'> <Link to={'/dashboard'}>Home</Link></li>
                                    <li className='hover:scale-110 duration-500'> <Link to={'/profile'}>Profile</Link></li>
                                    <li className='hover:scale-110 duration-500'> <Link to={'/explore'}>Explore</Link></li>
                                    <li className='hover:scale-110 duration-500'> <Link to={'/wishlist'}> Cart <sup><Badge className='bg-zinc-700'>{cart?.length}</Badge></sup></Link></li>
                                    {/*<li className='hover:scale-110 duration-500'> <Link to={'/cart'}>Cart<sup><Badge className='bg-zinc-700'>0</Badge></sup></Link></li> */}
                                    <li><button className='btn btn-dark rounder' onClick={handleLogout}>Logout</button></li>
                                </ul>
                                <div className="nav-icon" onClick={toggleNav}>
                                    <i className={`fas ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
                                </div>
                            </div>
                            :
                            <div className='animate__animated animate__slideInLeft'>


                                <ul className={` nav-links ${isNavOpen ? 'active' : ''}`}>
                                    <li className='hover:scale-110 duration-500'> <a href="#home">Home</a></li>
                                    <li className='hover:scale-110 duration-500'> <a href="#about">About</a></li>
                                    <li className='hover:scale-110 duration-500'> <a href="#explore">Explore</a></li>
                                    <li className='hover:scale-110 duration-500'> <a href="#contact">Contact</a></li>
                                </ul>
                                <div className="nav-icon" onClick={toggleNav}>
                                    <i className={`fas ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
                                </div>
                            </div>

                    }


                </nav>


            </div>

        </>
    )
}

export default Header
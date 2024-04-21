import React, { useEffect, useState } from 'react'
import '../Styles/About.css'
import '../Styles/HoverText.css'
import painting from '../Assets/painting.png'
import { Link } from 'react-router-dom'
import { homeArtAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseurl'
import HomeExplore from './HomeExplore'
import Swal from 'sweetalert2'



function About() {

    const [homeArt, setHomeArt] = useState([])

    const getHomeArt = async () => {
        const result = await homeArtAPI();
        console.log(result);
        setHomeArt(result.data)
    }
    useEffect(() => {
        getHomeArt()
    }, [])
    console.log(homeArt)

    const showAlert = async () => {

        Swal.fire({
            title: 'Oooooops!',
            text: 'Please Login to explore more.....',
            icon: 'error',
            // confirmButtonText: 'Cool'
          })
        // alert("Please Login to explore more......")
    }
    return (
        <>
            <div id='home' className='min-h-screen  grid grid-cols-1 md:grid-cols-2 gap-3 hover-container'>
                <div sm={12} md={6} lg={6} className='pt-40 md:pt-0 my-auto  text-center animate__heartBeat'>

                    <p xl={12} className='text-4xl  md:text-6xl font-extrabold  text-center '>Welcome to Artify</p>
                    <p className='text-center w-75 mx-auto mt-3 md:mt-5'> Immerse yourself in a vibrant community of artists and enthusiasts, where you can showcase your own masterpieces, explore captivating works from others, and acquire your favorite pieces with ease."</p>
                    <Link to='/login' ><button className=' btn btn-success text-center mt-3 md:mt-5 '>Login</button></Link>

                </div>
                <div sm={12} md={6} lg={6} className='grid  text-center justify-center  items-center '>
                    <img src="https://m.media-amazon.com/images/I/61jiGCV2utL._AC_UF894,1000_QL80_.jpg" alt="" height="75%" width="100%  " className=' min-h-32 mx-auto md:pt-14 ' />
                </div>
            </div>


            <div id='about' className='min-h-screen pt-20'>
                <div className='py-3.5 p-8 md:p-8 mx-auto '>
                    <p className='text-4xl font-bold inline border-b-4 border-pink-600'>About</p>
                </div>
                <div className='text-center '>
                    <p className='text-6xl font-extrabold pt-5 md:pt-0 animate__animated animate__shakeY'>Elegant, Efficient, Effective.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 text-xl leading-6 '>
                    <div className='p-8 md:p-16'>
                        <p>Work less, achieve more. We believe that no matter whether you are a gallerist, an artist or a collector, technology should be there to support you in achieving more with less effort. Discover the comprehensive all-in-one platform for art management, art marketing and sales, and website creation services to help you manage your collections, keep your data organized, automate and grow your art business.</p>
                    </div>
                    <div className='p-8 md:p-16'>
                        <p>We make it our mission to create an innovative, efficient, easy to use and powerful technology platform to enable you to keep your art organized, nurture your client relationships and save you an astronomical amount of time. With a knowledgeable team of software developers and experts in technology, it’s easy to see why we have emerged as global market leaders in the art industry.</p>
                    </div>
                </div>

            </div>


            <div id='explore' className='min-h-screen pt-16 '>
                <div className='py-3.5 p-16 md:p-16   mx-auto'>
                    <h1 className='text-4xl font-bold inline border-b-4 border-pink-600 '>

                        Explore

                    </h1>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3'>
                    {

                        homeArt?.length > 0 ?

                            homeArt.map((item) => (

                                <div style={{ height: "250px" }} className='animate__animated animate__rotateIn mt-2 rounded-lg shadow-md shadow-[#040c16] mx-auto p-3 '>

                                    < div style={{ width: "250px", height: "100%", overflow: "hidden" }}>
                                        <img className='mx-auto p-2 h-full' width={"250px"} style={{ objectFit: "cover" }} src={`${BASE_URL}/uploads/${item?.artImage}`} alt="" />
                                    </div>
                                    <div className='text-center d-flex items-center justify-center'>
                                        {/* <HomeExplore item={item} /> */}
                                    </div>

                                </div>


                            )) :
                            <p>No Arts Uploaded to Show</p>
                    }



                </div >

                <div className='mt-20 text-center'>
                    <a onClick={showAlert} className='cursor-pointer font-bold text-xl underline text-blue-500'>Click here to explore more</a>

                </div>
            </div >

        </>
    )
}

export default About

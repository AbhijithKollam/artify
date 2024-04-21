import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArtCard from '../Pages/ArtCard'
import Header from './Header'
import { allArtAPI } from '../Services/allAPI';

function Explore({ head }) {
  const navigate = useNavigate();

  const [allArt, setAllArt] = useState([])

  const getAllArt = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allArtAPI(reqHeader);
      console.log("REsult fot all arts------");
      console.log(result);
      setAllArt(result.data);
    }

  }



  const [showContent, setShowContent] = useState(false);

  const handleButtonClick = async () => {
    setShowContent(true);
    navigate('/explore')
  };


  useEffect(() => {
    getAllArt();
  }, [])
  return (
    <>

      <Header head={head} />




      {/* <div className='d-flex justify-content-center align-items-center flex-column pt-32'>
          <Link to={'/'} style={{ textDecoration: "none" }}> <i class="fa-solid fa-arrow-left me-2"></i> Back to home</Link>
          <img src="https://st3.depositphotos.com/1717437/18622/v/450/depositphotos_186223678-stock-illustration-incognito-unknown-person-silhouette-man.jpg" alt="" height={"300px"} width={"300px"} />
          <p className='text-danger fs-4'> Please <Link style={{ textDecoration: "none" }} to={'/login'} >Login</Link> to view projects</p>
        </div> */}





<div id='explore' className='min-h-screen pt-24 md:pt-16' style={{backgroundImage: `url(${require('../Assets/bgImage.jpg')})`}}>
        <div className='py-3.5 p-16 md:p-16   mx-auto'>
          <p className='text-4xl font-bold inline border-b-4 text-shadow text-shadow-lg border-pink-600 '>

            Explore

          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 '>

          {
            allArt.length > 0 ?
              allArt.map((item) => (


                <ArtCard item={item} />


              )) :
              <p>No items to show</p>
          }
        </div>



        {/* <div className='mt-5'>
          <Link onClick={handleButtonClick}><p className='text-center font-bold underline text-xl text-blue-500'>Click here to explore more</p></Link>
        </div> */}
      </div>




    </>
  )
}

export default Explore
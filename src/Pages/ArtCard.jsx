import React from 'react'
import { Card } from 'react-bootstrap'
import { BASE_URL } from '../Services/baseurl'
import { artWishlistAPI } from '../Services/allAPI';
import HomeExplore from '../Components/HomeExplore';
import Cart from './Cart';
import DeleteCart from './DeleteCart';

function ArtCard({ item, items }) {

    // const handleWishlist = async (e) => {
    //     e.preventDefault();
    //     const userData = { item };
    //     console.log("Data ====", userData);

    //     const result = await artWishlistAPI(userData)
    //     console.log("from backend", result);
    // }
    return (
        <>


            {
                item && (
                    <div style={{ height: "250px" }} className='mt-2 rounded-lg shadow-md shadow-[#040c16] mx-auto m-16 animate__animated animate__bounceIn'>
                        <div className='' style={{ width: "250px", height: "100%" }}>
                            <img className='mx-auto p-2 h-full' src={`${BASE_URL}/uploads/${item?.artImage}`} alt="" />
                        </div>
                        <div className='d-flex justify-content-evenly align-items-center gap-3'>
                            {/* <button className='btn btn-success w-75 shadow-md shadow-[#040c16]' onClick={handleWishlist}><i class="fa-solid fa-heart"></i></button> */}
                            {/* <button className='btn btn-success w-75 shadow-md shadow-[#040c16]'>Details</button> */}
                            <HomeExplore item={item} />
                            <Cart item={item} />
                        </div>
                    </div>

                )}
            {
                items && (
                    <div style={{ height: "250px" }} className='mt-2 rounded-lg shadow-md shadow-[#040c16] mx-auto m-16 animate__animated animate__bounceIn'>
                        <div className='' style={{ width: "250px", height: "100%" }}>
                            <img className='mx-auto p-2 h-full' src={`${BASE_URL}/uploads/${items?.artImage}`} alt="" />
                        </div>
                        <div className='d-flex justify-content-evenly align-items-center gap-3'>
                            {/* <button className='btn btn-success w-75 shadow-md shadow-[#040c16]' onClick={handleWishlist}><i class="fa-solid fa-heart"></i></button> */}
                            {/* <button className='btn btn-success w-75 shadow-md shadow-[#040c16]'>Details</button> */}
                            <HomeExplore item={items} />
                            {/* <Cart item={item} /> */}
                            <DeleteCart items={items}/>
                        </div>
                    </div>
                )
            }







        </>
    )
}

export default ArtCard
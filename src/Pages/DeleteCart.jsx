import React, { useContext, useEffect } from 'react'
import { deleteCartApi } from '../Services/allAPI';
import { deleteCartResponseContext } from '../context/ContextShare';
import Swal from 'sweetalert2';

function DeleteCart({items}) {

    const { deleteCartResponse, setDeleteCartResponse } = useContext(deleteCartResponseContext)


    const handleDeleteCart = async (id) => {
        console.log("idInsideHandleDelete===",id);
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteCartApi(id, reqHeader);
        console.log(result);
        if (result.status === 200) {
            Swal.fire({
                title: 'Done!',
                text: 'Deleted successfully',
                icon: 'success',
                // confirmButtonText: 'Cool'
              })
            // alert("Project deleted successfully")
            setDeleteCartResponse(true)
            // getUserArt();
        }
        else {

        }
    }
    
    return (


        <>
            <div className=' d-flex justify-content-evenly align-items-center gap-3 mt-3'>
                <button className='btn btn-success  shadow-md shadow-[#040c16]' onClick={() => handleDeleteCart(items._id)}><i class="fa-solid fa-trash"></i></button>
            </div>
        </>
    )
}

export default DeleteCart
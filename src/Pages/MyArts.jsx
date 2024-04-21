import React, { useContext, useEffect, useState } from 'react'
import AddArt from '../Pages/AddArt'
import EditArt from '../Pages/EditArt'
import { BASE_URL } from '../Services/baseurl'

function MyArts({ item }) {



  return (
    <>

          <tbody className='grid border-collapse p-3 ' >
            <tr className=' grid grid-cols-4  items-center '>
              <th className=''><img src={`${BASE_URL}/uploads/${item?.artImage}`} alt="" className='h-32 w-32 rounded-full mx-auto '  /></th>
              <th ><h5 className='ms-auto' >{item.title}</h5></th>
              <th className='d-none d-sm-table-cell d-md-table-cell'><h5 className='ms-auto' >{item.price}</h5></th>
              <th><EditArt item={item} />
                </th>
            </tr>
          </tbody>



          {/* <div className="border d-flex justify-content-between align-items-center rounded p-2">
            <img src={`${BASE_URL}/uploads/${item?.artImage}`} alt="" className='h-32 w-32 rounded-full' />
            <h5 className='ms-auto' >{item.title}</h5>
            <h5 className='ms-auto' >{item.price}</h5>

            <div className="ms-auto">
              <EditArt item={item} />
              <button className='btn'><i class="fa-solid fa-trash text-danger" ></i></button>
            </div>
          </div> */}

          {/* // <p className='text-danger fw-bolder fs-4 mt-3'>No projects uploaded yet</p> */}


        
    </>
  )
}

export default MyArts
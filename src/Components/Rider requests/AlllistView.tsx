import React from 'react'

export default function AlllistView() {
  return (
   <>
   <div className='bg-white ml-4'>
    <div>
        <img className='w-20 mx-5' src="/logo.png" alt="" />
    </div>
    <div className='flex gap-8'>
        <div className='flex flex-col bg-slate-300 p-4 w-full m-4'>
        <p>Rider Request</p>
        <p>Pikup Address</p>
        <p>pepsicola</p>
        <p>Drop Address</p>
        <p>Tinkune</p>
        <div>
            <div>
                <p>Total Distance</p>
                <p>10km</p>
            </div>
            <div>
                <p>Total Duration</p>
                <p>1 hr</p>
            </div>
            <div>
                <p>Driver Earning</p>
                <p>Rs 200</p>
            </div>
        </div>
        </div>

        <div className='flex flex-col bg-slate-300 p-4 w-full mx\-4'>
        <p>Rider Request</p>
        <p>Pikup Address</p>
        <p>pepsicola</p>
        <p>Drop Address</p>
        <p>Tinkune</p>
        <div>
            <div>
                <p>Total Distance</p>
                <p>10km</p>
            </div>
            <div>
                <p>Total Duration</p>
                <p>1 hr</p>
            </div>
            <div>
                <p>Driver Earning</p>
                <p>Rs 200</p>
            </div>
        </div>
        </div>

    </div>

   </div>
   </>
  )
}

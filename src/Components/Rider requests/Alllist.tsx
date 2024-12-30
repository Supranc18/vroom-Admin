import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function Alllist() {

    const [filter, setFilter] = useState<boolean>(false);

    const filterHandle=()=>{
        setFilter((prev) => !prev)
    }
    const close=()=>{
        setFilter(false)
    }

    interface Trip {
        Trip_No: number;
        "Passenger": string;
        "Requested_Driver": string;
        "Accepted_Driver": string;
        "Requested_Date": string;
        "Total_Trip_Distance": string;
        "Price": string;
        "Invoice": string;
        "Status": string;
        "Action": string;
    }
    

    const trips: Trip[] = [
        {
            Trip_No: 1,
            "Passenger": "John Doe",
            "Requested_Driver": "Driver A",
            "Accepted_Driver": "Driver B",
            "Requested_Date": "2024-12-03",
            "Total_Trip_Distance": "15 km",
            "Price": "$20",
            "Invoice": "INV-001",
            "Status": "Completed",
            "Action": "View"
        },
        {
            Trip_No: 2,
            "Passenger": "Jane Smith",
            "Requested_Driver": "Driver C",
            "Accepted_Driver": "Driver C",
            "Requested_Date": "2024-12-02",
            "Total_Trip_Distance": "10 km",
            "Price": "$15",
            "Invoice": "INV-002",
            "Status": "Pending",
            "Action": "Cancel"
        },
        {
            Trip_No: 3,
            "Passenger": "Bob Johnson",
            "Requested_Driver": "Driver D",
            "Accepted_Driver": "Driver E",
            "Requested_Date": "2024-12-01",
            "Total_Trip_Distance": "25 km",
            "Price": "$30",
            "Invoice": "INV-003",
            "Status": "Cancelled",
            "Action": "Rebook"
        }
    ];
  return (
    <>
    <div className='bg-gray-200 h-full'>
    <div className='bg-white ml-4'>

        {filter &&(
            <>
             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-300 p-8 flex flex-col gap-4">
                        <div>
                            <p className='font-bold'>Add Filter</p>
                        </div>
                        <div className='flex gap-4'>
                        <div>
                            <label className='w-20 inline-block' htmlFor="startdate">Start Date</label>
                            <input  className='p-2' type="date" />
                        </div>
                        <div>
                            <label className='w-20 inline-block' htmlFor="enddate">End Date</label>
                            <input className='p-2' type="date" />
                        </div>
                        </div>
                        <div>
                            <label htmlFor="Passenger">Passenger</label>
                        </div>
                        <div>
                            <label htmlFor="driver">Driver</label>
                        </div>
                        <div>
                            <label htmlFor="status">Status</label>
                        </div>
                        <div className='flex justify-between'>
                            <button className='bg-blue-600 text-white px-2'>Apply</button>
                            <button className='bg-red-500 text-white px-2' onClick={close}>Close</button>
                        </div>
                    </div>
                </div>
            </>
        )}
        <div>
            <div className='flex justify-between px-4 py-4'>
            <p>Rider Request List</p>
            <button onClick={filterHandle} className='bg-blue-600 text-white px-4'>Filter</button>
            </div>

            <div>
                <table className='w-full my-8'>
                    <thead>
                        <tr className="border-b">
                            <th>Trip No.</th>
                            <th>Passenger</th>
                            <th>Requested Driver</th>
                            <th>Accepted Driver</th>
                            <th>Requested Date</th>
                            <th>Trotal Trip Distance</th>
                            <th>Price</th>
                            <th>Invoice</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((el)=>(
                            <>
                            <tr className="border-b text-center text-sm h-16">
                                <td>{el.Trip_No}</td>
                                <td>{el.Passenger}</td>
                                <td>{el.Requested_Driver}</td>
                                <td>{el.Accepted_Driver}</td>
                                <td>{el.Requested_Date}</td>
                                <td className='w-20'>{el.Total_Trip_Distance}</td>
                                <td>{el.Price}</td>
                                <td>{el.Invoice}</td>
                                <td>{el.Status}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <Link to={`view/${el.Trip_No}`} className='bg-blue-600 text-white px-2'>View</Link>
                                        <button className='bg-red-500 text-white px-2'>Delete</button>
                                    </div>
                                </td>
                                
                            </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

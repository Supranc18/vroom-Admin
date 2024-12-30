import React, { useState } from 'react'
import { MdOutlineArrowDropDown, MdPreview } from 'react-icons/md';
import { Link } from 'react-router-dom';



export default function PassengerList() {
    interface Passanger {
        id: string,
        name: string,
        number: string,
        email: string,
        last_signin: string,
        created: string,
        status: string

    }

    const passenger: Passanger[] = [
        {
            "id": "2",
            "name": "Aarav Shrestha",
            "number": "9986788888",
            "email": "arav@gmail.com",
            "last_signin": "November 6, 2024 - 14:30",
            "created": "November 3, 2024 - 14:30",
            "status": "ACTIVE"
        },
        {
            "id": "2",
            "name": "Aarav Shrestha",
            "number": "9986788888",
            "email": "arav@gmail.com",
            "last_signin": "November 6, 2024 - 14:30",
            "created": "November 3, 2024 - 14:30",
            "status": "INACTIVE"
        }
    ]


    const [dropdown, setDropdown] = useState<boolean>(false)

    const [filter, setFilter] = useState<string>("");

    const filteredDocuments = filter
        ? passenger.filter((doc) => doc.status === filter)
        : passenger;

    const dropdownHandle = () => {
        setDropdown(!dropdown);
    };





    return (
        <>
            <div className='bg-gray-200 h-full'>
                <div className='bg-white ml-4'>
                    <div>
                        <p>Vroom passengers List</p>
                        <div className='flex gap-8'>
                            <div>
                                <div >
                                    <button
                                        onClick={dropdownHandle}
                                        className='flex items-center gap-2 bg-blue-500 text-white px-2 '>Passenger Status (INFO)
                                        <MdOutlineArrowDropDown className='text-2xl' /> </button>
                                </div>
                                {dropdown && (
                                    <div className=" w-52 cursor-pointer p-2 border border-gray-300 bg-white ">
                                        <ul >
                                            <button onClick={() => setFilter("")}>All passengers</button>
                                            <button onClick={() => setFilter("ACTIVE")}>Active Passengers</button>
                                            <button onClick={() => setFilter("INACTIVE")}>Inactive Passengers</button>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <input type="text" placeholder='Search..' className='border border-black' />
                                <button className='ml-1 bg-blue-700 text-white px-2'>Search</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <table className='w-full  border-collapse my-8'>
                            <thead>
                                <tr className='border-b-2'>
                                    <th>Passenger ID</th>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Last Signed In</th>
                                    <th>Created Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDocuments.map((el) => (
                                    <>
                                        <tr className='border-b text-center text-sm h-16'>
                                            <td>{el.id}</td>
                                            <td>{el.name}</td>
                                            <td>{el.number}</td>
                                            <td>{el.last_signin}</td>
                                            <td>{el.created}</td>
                                            <td >
                                                <div className={`py-1 text-white ${el.status === "ACTIVE" ? "bg-blue-600 " : "bg-orange-400"}`}>{el.status}
                                                </div></td>
                                            <td>
                                                <Link className='flex justify-center' to={`/passengerlist/view/${el.id}`}>
                                                    <div className='text-3xl bg-blue-600 flex flex-col items-center w-9 text-white rounded-sm '><MdPreview />
                                                        <p className='text-xs'>View</p>
                                                    </div> </Link>

                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

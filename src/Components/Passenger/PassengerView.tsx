import React, { useState } from 'react';

export default function PassengerView() {

    interface Passenger {
        rider_id: string;
        image: string;
        email: string;
        name: string;
        number: string;
        status: string;
        trip: string;

    }

    const passenger: Passenger[] = [
        {
            rider_id: "5",
            image: "/image 9.png",
            email: "hari@gmail.com",
            name: "Hari Shrestha",
            status: "ACTIVE",
            number: "9867867556",
            trip: "200"
        },
    ];

    const [select, setSelect] = useState<'info' | 'history'>('info')

    return (
        <div className='bg-gray-200 h-full'>
            <div className='bg-white ml-4'>
                <p className='p-2'>Vroom Passengers</p>

                <div className='flex justify-around my-4 text-blue-600    font-bold'>
                    <button onClick={() => setSelect('info')}
                        className={`border-b-2 w-full ${select === "info" ? "border-b-4 p-4 border-blue-600 " : ""} `}
                    >Passenger Full Information</button>
                    <button onClick={() => setSelect('history')}
                        className={`border-b-2  w-full  ${select === "history" ? "border-b-4 p-4 border-blue-600 " : ""} `}
                    >Trip History</button>
                </div>

                {select === 'info' && (
                    <div className="flex gap-4 my-4 p-4">
                        {passenger.map((el) => (
                            <div
                                key={el.rider_id}
                                className="bg-white w-96 flex flex-col justify-center border border-black    gap-4"
                            >
                                <div className="flex flex-col gap-2 items-center bg-orange-400 w-[100%] p-4 text-white">
                                    <img className="w-20 h-20 rounded-full" src={el.image} alt={el.name} />
                                    <p className="text-xl">{el.name}</p>
                                    <p >Status: <span className={` text-xs font-semibold p-1 ${el.status === "ACTIVE" ? "bg-blue-600" : "bg-orange-500"}`}>{el.status}</span></p>
                                </div>
                                <div className="p-4 flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <p>Total Trips</p>
                                        <p className="text-white bg-blue-600 px-4">{el.trip}</p>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between">
                                        <p>Passenger ID</p>
                                        <p className="text-white bg-blue-600 px-4">{el.rider_id}</p>
                                    </div>
                                    <hr />
                                    <div className="flex items-center ">
                                        <p>Email:</p>
                                        <p className="text-sm">{el.email}</p>
                                    </div>
                                    <hr />
                                    <div className="flex items-center ">
                                        <p>Phone Number:</p>
                                        <p className="text-sm">{el.number}</p>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {select === "history" && (
                    <div>
                        <table className='w-full border-collapse my-8'>
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th>Passenger Name</th>
                                    <th>Requested Driver</th>
                                    <th>Assigned Driver</th>
                                    <th>Trip Date/time</th>
                                    <th>Pickup Point</th>
                                    <th>Drop Point</th>
                                    <th>Trip Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b text-center text-sm h-16'>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function VerifideDriver() {

    interface VehicleDetail {
        wheelCount: number;
        brandName: string;
        color: string;
        isEV: boolean;
        type: string;
        number: string;
    }

    interface VehicleImages {
        front: string;
        back: string;
    }

    interface BluebookImages {
        page2: string;
        page3: string;
        page9: string;
    }

    interface Driver {
        status: string;
        avatar: string;
        name: string;
        id: string;
        vehicleDetail: VehicleDetail;
        vehicleImages: VehicleImages;
        bluebookImages: BluebookImages;
        licenseImage: string;
        insurance: string;
        submit_date: string;
    }


    const [drivers, setDrivers] = useState<Driver[]>([]);


    const fetchProducts = () => {
        axios.get<Driver[]>('http://localhost:3000/drivers')
            .then((response) => {
                setDrivers(response.data);
                console.log(response.data);

            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);




    return (
        <div className='bg-gray-200 h-full'>
        <div className='bg-white ml-4 p-4'>
            <div>
                <p>Vroom Verified Driver List</p>
            </div>

            <div className='my-8'>
                <table className='w-full border-collapse'>
                    <thead >
                        <tr className='border-b-2'>
                            <th>Driver ID</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Vehicle Type</th>
                            <th>Vehicle Photo</th>
                            <th>Bill Book</th>
                            <th>License</th>
                            <th>Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers
                            .filter((el) => el.status === "Approved") 
                            .map((el) => (
                                <tr key={el.id} className="border-b text-center text-sm h-16">
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>99</td>
                                    <td>{el.vehicleDetail.wheelCount === 2 ? "Two wheeler" : "Four Wheeler"}</td>
                                    <td>
                                        <img className="w-20" src={el.vehicleImages.front} alt="" />
                                        <img className="w-20" src={el.vehicleImages.back} alt="" />
                                    </td>
                                    <td>
                                        <img className="w-20" src={el.bluebookImages.page2} alt="" />
                                        <img className="w-20" src={el.bluebookImages.page3} alt="" />
                                        <img className="w-20" src={el.bluebookImages.page9} alt="" />
                                    </td>
                                    <td>
                                        <img className="w-20" src={el.licenseImage} alt="" />
                                    </td>
                                    <td>{el.submit_date}</td>
                                    <td>{el.insurance === "F" ? "FULL" : "HALF"}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
           

        </div>

        </div>
    )
}

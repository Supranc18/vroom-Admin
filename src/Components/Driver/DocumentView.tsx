import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdModeEdit, MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function DocumentView() {

    const navigate = useNavigate()


    type RejectState = {
        message: string;
        vehicleImages: string[];
        bluebookImages: string[];
        // licenseImages: string[];
    };

    const [status, setStatus] = useState("");
    const [state, setState] = useState({
        dropdown: false,
        isEditing: false,
        deleteConfirm: false,
        largeImage: "",
    });
    const [reject, setReject] = useState<RejectState>({
        message: '',
        vehicleImages: [],
        bluebookImages: [],
        // licenseImages: [],
    });

    const [driverDetail, setDriverDetail] = useState({
        avatar: "",
        name: "",
        id: "",
        vehicleDetail: {
            wheelCount: 0,
            brandName: "",
            color: "",
            isEV: false,
            type: "",
            number: "",
        },
        vehicleImages: {
            front: "",
            back: "",
        },
        bluebookImages: {
            page2: "",
            page3: "",
            page9: "",
        },
        licenseImage: "",
        insurance: "",
    });

    const prams = useParams();


    //fetching data
    useEffect(() => {
        if (prams.slug) {
            axios.get(`http://localhost:3000/api/v1/profile/driver/${prams.slug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            })
                .then((res) => {
                    setDriverDetail(res.data.data);
                });
        }
    }, [prams.slug]);

    const dropdownHandle = () => {
        setState((prev) => ({ ...prev, dropdown: !prev.dropdown }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;


        setReject((prevState) => {
            let updatedCategory = [...prevState[name as keyof RejectState]];
            if (checked) {
                updatedCategory.push(value); // Add to category if checked
            } else {
                updatedCategory = updatedCategory.filter((item) => item !== value); // Remove if unchecked
            }

            return {
                ...prevState,
                [name]: updatedCategory, // Update specific category
            };
        });
    };

    const handleReject = async () => {
        try {

            const bluebookImagesObject: { [key: string]: string } = {};
            reject.bluebookImages.forEach((image) => {
                bluebookImagesObject[image] = "true"; 
            });

            const vehicleImagesObject: { [key: string]: string } = {};
            reject.vehicleImages.forEach((image) => {
                vehicleImagesObject[image] = "true"; 
            });
            const response 
            = await axios.patch(
                `http://localhost:3000/api/v1/profile/driver/verify/reject/${prams.slug}`,
                {
                    message: reject.message,
                    fields: {
                        vehicleImages: vehicleImagesObject,
                        bluebookImages: bluebookImagesObject,
                        // licenseImages: reject.licenseImages,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    },
                }
            );
            console.log('Rejection status updated:', response.data);
        } catch (error) {
            console.error('Error updating rejection status:', error);
        }
    };

    // Render rejected status form
    const renderRejectedStatus = () => {
        if (status === 'Reject') {
            return (
                <div className="bg-red-100 p-4 mt-4 border border-red-500">
                    <p className="text-red-500 font-bold">This document has been rejected.</p>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="msg">Rejected Message</label>
                        <input
                            type="text"
                            name="message"
                            placeholder="Reason for rejection"
                            className="mt-2 p-2 border border-gray-300"
                            onChange={(e) => setReject({ ...reject, message: e.target.value })}
                        />
                    </div>
                    <div>
                        <p>Vehicle photo</p>
                        <input
                            type="checkbox"
                            value="front"
                            name="vehicleImages"
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2" htmlFor="front">
                            Front
                        </label>
                        <br />
                        <input
                            type="checkbox"
                            value="back"
                            name="vehicleImages"
                            onChange={handleCheckboxChange}
                        />
                        {reject && (<>
                        rejected
                        </>)}
                        <label className="ml-2" htmlFor="back">
                            Back
                        </label>
                    </div>
                    <div>
                        <p>Bill Book photo</p>
                        <input
                            type="checkbox"
                            value="page2"
                            name="bluebookImages"
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2" htmlFor="page2">
                            Page 2
                        </label>
                        <br />
                        <input
                            type="checkbox"
                            value="page3"
                            name="bluebookImages"
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2" htmlFor="page3">
                            Page 3
                        </label>
                        <br />
                        <input
                            type="checkbox"
                            value="page9"
                            name="bluebookImages"
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2" htmlFor="page9">
                            Page 9
                        </label>
                    </div>
                    <div>
                        <p>License photo</p>
                        <input
                            type="checkbox"
                            value="license"
                            name="licenseImages"
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2" htmlFor="license">
                            License
                        </label>
                    </div>
                    <div>
                        <button onClick={handleReject} className="bg-blue-600 text-white rounded-md  py-1 px-4 my-4">
                            Submit
                        </button>
                    </div>
                    
                </div>
            );
        }
        return null;
    };

    const handleImageClick = (imageUrl: string) => {
        setState((prev) => ({ ...prev, largeImage: imageUrl }));
    };

    const closeImage = () => {
        setState((prev) => ({ ...prev, largeImage: "" }));
    };

    const handelConfirm = () => {
        setState((prev) => ({ ...prev, deleteConfirm: !prev.deleteConfirm }));
    };

    const handelNo = () => {
        setState((prev) => ({ ...prev, deleteConfirm: false }));
    };

    const { dropdown, isEditing, deleteConfirm, largeImage } = state;

    // Edit Driver Profile

    const handleEditClick = () => {
        if (isEditing) {
            const { _id, userId, averageRating, totalRatings, completedTripCount, ...updatedDriverDetail } = driverDetail;
            axios.patch(`http://localhost:3000/api/v1/profile/driver/${prams.slug}`, updatedDriverDetail, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            })
                .then((res) => {
                    toast.success('Driver details updated successfully');
                    console.log(res);
                })
                .catch((error) => {
                    console.error('Error updating driver details:', error);
                });
        }

        setState((prev) => ({ ...prev, isEditing: !prev.isEditing }));
    };


    //   Delete driver Profile
    const deleteHandle = () => {
        axios.delete(`http://localhost:3000/api/v1/profile/driver/${prams.slug}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Token')}`,
            }
        })
            .then((response) => {
                setState((prev) => ({ ...prev, deleteConfirm: false }));
                toast.success("Driver profile deleted successfully");
                navigate("driver-document")
                console.log(response);


            })
            .catch((error) => {
                console.error('Error deleting driver profile:', error);
                toast.error("Error deleting driver profile. Please try again.");
            });

    }


    return (
        <>
            <div className='bg-gray-100 min-h-screen'>
                <div className='bg-white shadow-md rounded-lg mx-4 mt-6 p-6'>
                    <p className='text-3xl font-semibold text-blue-600'>VIEW DRIVER REGISTRATION DOCUMENT</p>
                </div>
                <div className='p-8'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex justify-between items-center'>

                            {/* Avatar Section */}
                            <div className='flex flex-col gap-4 items-center'>
                                <img
                                    className="w-52 h-52 rounded-full border-4 border-gray-300 shadow-lg hover:scale-105 transition-all"
                                    src={driverDetail.avatar}
                                    alt="Driver Avatar"
                                    onClick={() => handleImageClick(driverDetail.avatar)}
                                />
                                <label className='font-semibold text-lg text-gray-600'>Uploaded Photo</label>
                            </div>

                            {/* Action Buttons */}
                            <div className='mr-20 flex flex-col items-center gap-6'>
                                <p className='text-xl font-semibold text-gray-800'>Action</p>
                                <div className='flex gap-6'>
                                    <button
                                        onClick={handleEditClick}
                                        className='flex flex-col justify-center items-center text-2xl w-16 bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-all'
                                    >
                                        <MdModeEdit />
                                        <p className='text-xs'>{isEditing ? "Save" : "Edit"}</p>
                                    </button>
                                    <button
                                        onClick={handelConfirm}
                                        className='flex flex-col justify-center items-center text-2xl w-16 bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-all'
                                    >
                                        <MdDeleteForever />
                                        <p className='text-xs'>Delete</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Delete Confirmation Popout */}
                        {deleteConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
                                    <p className='text-lg text-gray-800 font-semibold'>
                                        Are you sure you want to delete this driver profile?
                                    </p>
                                    <div className='flex justify-between'>
                                        <button
                                            className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all'
                                            onClick={deleteHandle}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all'
                                            onClick={handelNo}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='bg-gray-100 min-h-screen p-6'>
                            {/* Driver Details */}
                            <div className='bg-white shadow-lg rounded-lg p-6'>
                                <p className='text-3xl font-semibold text-blue-600 mb-6'>Driver Details</p>

                                {/* Full Name */}
                                <div className='flex gap-4 mb-6'>
                                    <label className='font-bold text-lg text-gray-700 w-32'>Full Name</label>
                                    <input
                                        className='px-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        type="text"
                                        value={driverDetail.name}
                                        onChange={(e) =>
                                            setDriverDetail((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Vehicle Details */}
                                <div className='mb-6'>
                                    <div>
                                        <div>
                                            <p className='font-semibold text-lg text-gray-700'>Vehicle Details</p>
                                            <div className='flex flex-wrap gap-6'>
                                                {/* Vehicle Type */}
                                                <div className='flex items-center gap-2'>
                                                    <input
                                                        type="radio"
                                                        id="twowheeler"
                                                        name="vehicleType"
                                                        value="Two Wheeler"
                                                        checked={driverDetail.vehicleDetail.wheelCount === 2}
                                                        disabled={!isEditing}
                                                    />
                                                    <label className='text-gray-600' htmlFor="twowheeler">Two Wheeler</label>
                                                    <input
                                                        type="radio"
                                                        id="fourwheeler"
                                                        name="vehicleType"
                                                        value="Four Wheeler"
                                                        checked={driverDetail.vehicleDetail.wheelCount === 4}
                                                        disabled={!isEditing}
                                                    />
                                                    <label className='text-gray-600' htmlFor="fourwheeler">Four Wheeler</label>
                                                </div>
                                            </div>

                                            <div className='my-2'>
                                                {/* Electric Vehicle */}
                                                <p className='font-semibold text-lg text-gray-700'>Electric</p>
                                                <div className='flex flex-wrap gap-6'></div>
                                                <div className='flex items-center gap-2'>
                                                    <input
                                                        type="radio"
                                                        id="yes"
                                                        name="ev"
                                                        value="yes"
                                                        checked={driverDetail.vehicleDetail.isEV === true}
                                                        disabled={!isEditing}
                                                    />
                                                    <label className='text-gray-600' htmlFor="yes">Electric</label>
                                                    <input
                                                        type="radio"
                                                        id="no"
                                                        name="ev"
                                                        value="no"
                                                        checked={driverDetail.vehicleDetail.isEV === false}
                                                        disabled={!isEditing}
                                                    />
                                                    <label className='text-gray-600' htmlFor="no">Non-Electric</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Brand Name */}
                                        <div className='flex gap-2 w-full'>
                                            <label className='w-36 font-semibold text-gray-700' htmlFor="brand_name">Brand Name</label>
                                            <input
                                                className='px-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                type="text"
                                                name="brandname"
                                                id="brand_name"
                                                value={driverDetail.vehicleDetail.brandName}
                                                onChange={(e) =>
                                                    setDriverDetail((prev) => ({
                                                        ...prev,
                                                        vehicleDetail: {
                                                            ...prev.vehicleDetail,
                                                            brandName: e.target.value,
                                                        },
                                                    }))
                                                }
                                                disabled={!isEditing}
                                            />
                                        </div>

                                        {/* Vehicle Color */}
                                        <div className='flex gap-2 w-full'>
                                            <label className='w-36 font-semibold text-gray-700' htmlFor="color">Vehicle Color</label>
                                            <input
                                                className='px-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                type="text"
                                                name="color"
                                                id="color"
                                                value={driverDetail.vehicleDetail.color}
                                                onChange={(e) =>
                                                    setDriverDetail((prev) => ({
                                                        ...prev,
                                                        vehicleDetail: {
                                                            ...prev.vehicleDetail,
                                                            color: e.target.value,
                                                        },
                                                    }))
                                                }
                                                disabled={!isEditing}
                                            />
                                        </div>

                                        {/* Vehicle Type */}
                                        <div className='flex gap-2 w-full'>
                                            <label className='w-36 font-semibold text-gray-700' htmlFor="type">Vehicle Type</label>
                                            <input
                                                className='px-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                type="text"
                                                name="type"
                                                id="type"
                                                value={driverDetail.vehicleDetail.type}
                                                onChange={(e) =>
                                                    setDriverDetail((prev) => ({
                                                        ...prev,
                                                        vehicleDetail: {
                                                            ...prev.vehicleDetail,
                                                            type: e.target.value,
                                                        },
                                                    }))
                                                }
                                                disabled={!isEditing}
                                            />
                                        </div>

                                        {/* Vehicle Number */}
                                        <div className='flex gap-2 w-full'>
                                            <label className='w-36 font-semibold text-gray-700' htmlFor="number">Vehicle Number</label>
                                            <input
                                                className='px-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                type="text"
                                                name="number"
                                                id="number"
                                                value={driverDetail.vehicleDetail.number}
                                                onChange={(e) =>
                                                    setDriverDetail((prev) => ({
                                                        ...prev,
                                                        vehicleDetail: {
                                                            ...prev.vehicleDetail,
                                                            number: e.target.value,
                                                        },
                                                    }))
                                                }
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Photo */}
                                <div className='mb-6'>
                                    <p className='font-semibold text-lg text-gray-700'>Vehicle Photos</p>
                                    <div className='flex gap-4'>
                                        {/* Front Image */}
                                        <div className='text-center'>
                                            <img
                                                className="w-52 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                                src={driverDetail.vehicleImages.front}
                                                alt="Vehicle Front"
                                                onClick={() => handleImageClick(driverDetail.vehicleImages.front)}
                                            />
                                            <span className='text-red-500 font-bold'>
                                                {reject["vehicleImages"]?.includes("front") ? "Rejected: Front" : ""}
                                            </span>
                                        </div>
                                        {/* Back Image */}
                                        <div className='text-center'>
                                            <img
                                                className="w-52 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                                src={driverDetail.vehicleImages.back}
                                                alt="Vehicle Back"
                                                onClick={() => handleImageClick(driverDetail.vehicleImages.back)}
                                            />
                                            <span className='text-red-500 font-bold'>
                                                {reject["vehicleImages"]?.includes("back") ? "Rejected: Back" : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bill Book Photos */}
                                <div className='mb-6'>
                                    <p className='font-semibold text-lg text-gray-700'>Bill Book Photos</p>
                                    <div className='flex gap-4'>
                                        {/* Page 2 Image */}
                                        <div className='text-center'>
                                            <img
                                                className="w-52 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                                src={driverDetail.bluebookImages.page2}
                                                alt="Bill Book Page 2"
                                                onClick={() => handleImageClick(driverDetail.bluebookImages.page2)}
                                            />
                                            <span className='text-red-500 font-bold'>
                                                {reject["bluebookImages"]?.includes("page2") ? "Rejected: Page 2" : ""}
                                            </span>
                                        </div>
                                        {/* Page 3 Image */}
                                        <div className='text-center'>
                                            <img
                                                className="w-52 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                                src={driverDetail.bluebookImages.page3}
                                                alt="Bill Book Page 3"
                                                onClick={() => handleImageClick(driverDetail.bluebookImages.page3)}
                                            />
                                            <span className='text-red-500 font-bold'>
                                                {reject["bluebookImages"]?.includes("page3") ? "Rejected: Page 3" : ""}
                                            </span>
                                        </div>
                                        {/* Page 9 Image */}
                                        <div className='text-center'>
                                            <img
                                                className="w-52 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                                src={driverDetail.bluebookImages.page9}
                                                alt="Bill Book Page 9"
                                                onClick={() => handleImageClick(driverDetail.bluebookImages.page9)}
                                            />
                                            <span className='text-red-500 font-bold'>
                                                {reject["bluebookImages"]?.includes("page9") ? "Rejected: page99" : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                {/* License Photo */}
                                <div className='mb-6'>
                                    <p className='font-semibold text-lg text-gray-700'>License Photo</p>
                                    <div className='text-center'>
                                        <img
                                            className="w-52 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                            src={driverDetail.licenseImage}
                                            alt="License"
                                            onClick={() => handleImageClick(driverDetail.licenseImage)}
                                        />
                                        {/* <span className='text-red-500 font-bold'>
                                            {reject["licenseImage"]?.includes("License") ? "Rejected: License" : ""}
                                        </span> */}
                                    </div>
                                </div>

                                {/* Insurance Type */}
                                <div className='mb-6'>
                                    <p className='font-semibold text-lg text-gray-700'>Insurance Type</p>
                                    <div className='flex items-center gap-6'>
                                        <input
                                            type="radio"
                                            id="full"
                                            name="insuranceType"
                                            value="Full"
                                            checked={driverDetail.insurance === "F"}
                                            disabled={!isEditing}
                                        />
                                        <label className='text-gray-600' htmlFor="full">Full</label>

                                        <input
                                            type="radio"
                                            id="half"
                                            name="insuranceType"
                                            value="Half"
                                            checked={driverDetail.insurance === "H"}
                                            disabled={!isEditing}
                                        />
                                        <label className='text-gray-600' htmlFor="half">Half</label>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button
                                onClick={dropdownHandle}
                                className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300'>
                                VERIFICATION STATUS (INFO)
                                <MdOutlineArrowDropDown className='text-2xl' />
                            </button>
                            {dropdown && (
                                <div className="ml-20 w-40 cursor-pointer p-2 border border-gray-300 rounded-lg bg-white shadow-lg mt-2">
                                    <ul className="space-y-2">
                                        <li>
                                            <button
                                                className={`w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 transition-colors duration-200 ${status === "Pending" ? "bg-blue-600 text-white" : "text-gray-700"}`}
                                                onClick={() => {setStatus("Pending")
                                                    setState((prev) => ({ ...prev, dropdown: false }));
                                                }}
                                            >
                                                Pending
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 transition-colors duration-200 ${status === "Approved" ? "bg-blue-600 text-white" : "text-gray-700"}`}
                                                onClick={() => {setStatus("Approved")
                                                    setState((prev) => ({ ...prev, dropdown: false }));
                                                }}
                                            >
                                                Approved
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 transition-colors duration-200 ${status === "Reject" ? "bg-blue-600 text-white" : "text-gray-700"}`}
                                                onClick={() =>{ setStatus("Reject")
                                                    setState((prev) => ({ ...prev, dropdown: false }));
                                                } }
                                            >
                                                Rejected
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <div>{renderRejectedStatus()}</div>
                            <button className='bg-blue-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-700 transition duration-300'>
                                Submit Document
                            </button>
                        </div>
                    </div>
                </div>

                {/* Large Image Modal */}
                {largeImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white w-[40%] p-4 rounded-lg shadow-lg">
                            <img className="w-full rounded-md" src={largeImage} alt="Large View" />
                            <button
                                onClick={closeImage}
                                className="text-red-500 mt-4 px-4 py-2 rounded-lg hover:bg-red-100 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div >

        </>
    );
}

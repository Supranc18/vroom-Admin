
// import { Link, useNavigate } from 'react-router-dom'
// import { MdChevronRight, MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
// import { useState } from 'react';
// import { FaCar, FaRegistered } from 'react-icons/fa';



// export default function AdminPage() {
//     const navigat = useNavigate()

//     const [dropdown, setDropdown] = useState<{ [key: string]: boolean }>({
//         vroom: false,
//         vroompassengers: false,
//         rideRequest: false,
//         pushnotification:false,

//     });



//     const notification = [
//         { label: "Notification List", path: "/notificationlist" },
//         { label: "Add Push Notification List", path: "/addpushnotificationlist" },
       
//     ];

//     const riderRequestList = [
//         { label: "All List", path: "/Alllist" },
//         { label: "New Ride", path: "/Newride" },
//         { label: "Completed", path: "/completed" },
//         { label: "Cancelled", path: "/cancelled" },
//         { label: "Pending", path: "/pending" },
//     ];
//     const navigatHandel = (path: string) => {
//         navigat(path)
//     }

//     const dropdownHandel = (dropdown: string) => {
//         setDropdown(prevState => ({
//             ...prevState,
//             [dropdown]: !prevState[dropdown],
//         }));
//     };

//     return (
//         <>
//             <div className='flex flex-col '>
//                 <div>
//                     <Link
//                         to={"/dashboard"}
//                         className='hover:bg-slate-700 hover:text-white p-2  w-[100%] flex gap-2 items-center'>
//                         <MdDashboard />Dashboard
//                     </Link>
//                 </div>
//                 <div>
//                     <Link
//                         to={"/dashboard"}
//                         className='hover:bg-slate-700 hover:text-white p-2  w-[100%] flex gap-2 items-center'>
//                         <FaRegistered />Vehicle Register
//                     </Link>
//                 </div>
//                 <div>
//                     <div >
                        
//                         <button
//                             className='hover:bg-slate-700 bg-white hover:text-white p-2  w-[100%] flex gap-2 items-center  '>
//                             <FaCar/> Vroom Drivers
//                         </button>

//                         <button
//                             onClick={() => dropdownHandel("vroompassengers")}
//                             className='hover:bg-slate-700 bg-white hover:text-white p-2  w-[100%] flex gap-2 items-center justify-between '>
//                             Vroom passengers <MdKeyboardArrowDown />
//                         </button>
//                         {dropdown.vroompassengers &&
//                             <>
//                                 <Link className={`${dropdown} cursor-pointer text-sm hover:bg-slate-700 bg-white hover:text-white p-2  w-[100%] flex gap-2 items-center`}
//                                     to={"/passengerlist"}> <MdChevronRight /> Passenger List </Link>
//                             </>
//                         }

//                         <button
//                             onClick={() => dropdownHandel("rideRequest")}
//                             className='hover:bg-slate-700 bg-white hover:text-white p-2  w-[100%] flex gap-2 items-center justify-between '>
//                             Ride Request Report <MdKeyboardArrowDown />
//                         </button>
//                         {dropdown.rideRequest && riderRequestList.map((el) => (
//                             <>
//                                 <div
//                                     className={`${dropdown} cursor-pointer text-sm hover:bg-slate-700 bg-white hover:text-white p-2  w-[100%] flex gap-2 items-center`}
//                                     onClick={() => navigatHandel(el.path)} >
//                                     <MdChevronRight /> {el.label}

//                                 </div>
//                             </>
//                         ))
//                         }

//                         <button
//                             onClick={() => dropdownHandel("pushnotification")}
//                             className='hover:bg-slate-700 bg-white hover:text-white p-2  w-[100%] flex gap-2 items-center justify-between '>
//                             Push Notification <MdKeyboardArrowDown />
//                         </button>
//                         {dropdown.pushnotification && notification.map((el)=>(
//                             <>
//                             <div
//                                     className={`${dropdown} cursor-pointer text-sm hover:bg-slate-700 bg-white hover:text-white p-2  w-[100%] flex gap-2 items-center`}
//                                     onClick={() => navigatHandel(el.path)} >
//                                     <MdChevronRight /> {el.label}
//                                 </div>
//                             </>
//                         ))
//                         }
//                     </div>
//                 </div>

//                 <div>
//                     <Link
//                         to={"/ads"}
//                         className='hover:bg-slate-700 hover:text-white p-2  block'
//                     >
//                         Ads
//                     </Link>
//                 </div>
//                 <Link to={"/revenue"}>Revenue</Link>
//             </div>


//         </>

//     )
// }

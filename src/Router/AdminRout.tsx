import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaCar } from 'react-icons/fa';
import { useState } from 'react';

export default function AdminRout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate =useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logoutHandle=()=>{
    localStorage.removeItem('Token');
    navigate("/")

  }

  return (
    <>
      <header className="w-[100vw]">
        <div className="bg-slate-800 border-b text-white px-10 py-4 flex justify-between items-center">
          <div className='flex items-center gap-4 cursor-pointer' onClick={toggleSidebar}>
            <img className="w-10" src="vroom.svg" alt="" />
            <h1 className='font-bold text-xl'>Vroom Nepal</h1>
          </div>
          <button onClick={logoutHandle} >Logout</button>
        </div>
      </header>

      <div className="flex">
        <div
          className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64 bg-slate-800' : 'w-16 bg-slate-800'} `}
        >
          <div className="flex flex-col h-full">
            <div>
              <Link
                to={"/dashboard"}
                className={`hover:bg-slate-700 text-white p-2 w-full flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}
              >
                <MdDashboard className={`${isSidebarOpen ? "":"text-2xl"} `}/>
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </div>
            <div>
              <Link to={"driver-document"}
                className={`hover:bg-slate-700 text-white p-2 w-full flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}
              >
                <FaCar className={`${isSidebarOpen ? "":"text-2xl"} `} />
                {isSidebarOpen && <span>Vroom Drivers</span>}
              </Link>

              <Link to={"passengerlist"}
                className={`hover:bg-slate-700 text-white p-2 w-full flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}
              >
                <IoMdPerson className={`${isSidebarOpen ? "":"text-2xl"} `} />
                {isSidebarOpen && <span>Vroom Passengers</span>}
              </Link>

              <button
                className={`hover:bg-slate-700 text-white p-2 w-full flex items-center justify-between ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}
              >
                {isSidebarOpen && <span>Ride Request Report</span>}
                <MdKeyboardArrowDown />
              </button>

              <button
                className={`hover:bg-slate-700 text-white p-2 w-full flex items-center justify-between ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}
              >
                {isSidebarOpen && <span>Push Notification</span>}
                <MdKeyboardArrowDown />
              </button>
            </div>

            <div>
              <Link
                to={"/ads"}
                className={`hover:bg-slate-700 text-white p-2 block ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}
              >
                {isSidebarOpen && <span>Ads</span>}
              </Link>
            </div>
            <Link
              to={"/revenue"}
              className={`text-white p-2 block ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}
            >
              {isSidebarOpen && <span>Revenue</span>}
            </Link>
          </div>
        </div>

        <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-[calc(100vw-16rem)]' : 'w-full'} p-4`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

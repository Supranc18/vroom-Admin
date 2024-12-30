import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { formatDistanceToNow, parse } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaFilter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

export default function DriverDocuments() {

  interface Driver {
    driverProfileId: string;
    fullName: string;
    wheelCount: number;
    status: string;
    timeAgo: string;
  }

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [state, setState] = useState({
    search: "",
    hiddenSuggestion: "block",
    filter: false,
    status: "S",
    vehicleType: 0,
    hasmore: true
  })
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Fetch driver data from the server
  const fetchDrivers = () => {
    axios.get(`http://localhost:3000/api/v1/profile/driver?page=${page}&limit=4&sort=desc&status=${state.status}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
      .then((response) => {
        const newDrivers = response.data.data.drivers; 
        setDrivers((prevDrivers) =>
          page === 1 ? newDrivers : [...prevDrivers, ...newDrivers]
        );

        setState((prevState) => ({
          ...prevState,
          hasmore:newDrivers.length === 4,
        }));
      })
      .catch((error) => console.error("Error fetching drivers:", error));
  }

  useEffect(() => {
    fetchDrivers();
  }, [page, state.status]);


  const filteredDrivers = drivers.filter(driver => {

    //search by name filter
    const searchFeature = state.search.trim() === "" ||
      driver.fullName.toLowerCase().startsWith(state.search.trim().toLowerCase())

    // Vehicletype Filter
    const matchesVehicleType = state.vehicleType === 0 ||
      Number(driver.wheelCount) === state.vehicleType;

    return searchFeature && matchesVehicleType;
  })

  // Pagination logic for infinite scrolling
  const fetchMoreData = () => {
    if (state.hasmore) {
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 5000); // 5000ms = 5 seconds
    }
  };



  // .map((driver) => {
  //   const parsedDate = parse(driver.date, "MM/dd/yyyy HH:mm", new Date());
  //   const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true }).replace(
  //     /^about\s/,
  //     ""
  //   );
  //   return { ...driver, timeAgo };
  // });

  // Pagination logic for infinite scrolling




  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({
      ...prev,
      search: value,
      hiddenSuggestion: value ? "block" : "hidden",
    }));

  };

  const handleSearchSuggestionClick = (name: string) => {
    setState((prev) => ({ ...prev, search: name, hiddenSuggestion: "hidden" }));
  };

  const filterHandle = () => {
    setState((prev) => ({ ...prev, filter: !prev.filter }))
  }
  const filterClose = () => {
    setState((prev) => ({ ...prev, filter: false }))
  }

  const handleStatus = (status: string) => {
    setState((prev) => ({ ...prev, status: status, filter: false }))

  }

  const handleVehicleType = (type: number) => {
    setState((prev) => ({ ...prev, vehicleType: type, filter: false }));
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="mx-auto max-w-6xl bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold  mb-6">Driver Document List</h1>

        <div className="flex justify-between">
          <div className="flex  gap-3 mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={state.search}
              onChange={handleSearchChange}
              className="flex-grow border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-all"
            >
              Search
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="flex items-center gap-2 bg-blue-600 text-white p-2 rounded-lg"
              onClick={filterHandle}>
              <FaFilter /> Filter</button>
          </div>
        </div>

        {/* Filter option */}
        {state.filter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ">
            <div className=" bg-white p-2  w-[30%] h-[50%]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Filter Options</h2>
                <button onClick={filterClose}><IoIosClose className="text-2xl font-bold" /></button>
              </div>

              <div className="flex gap-8 justify-center">
                {/* Vehicle Type Section */}
                <div className="mb-6">
                  <p className="font-semibold mb-2">Vehicle Type</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleVehicleType(0)}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                      All
                    </button>
                    <button onClick={() => handleVehicleType(2)}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                      Two Wheeler
                    </button>
                    <button onClick={() => handleVehicleType(4)}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                      Four Wheeler
                    </button>
                  </div>
                </div>

                {/* Status Section */}
                <div className="mb-6">
                  <p className="font-semibold mb-2">Status</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleStatus("S")}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                      Submitted
                    </button>
                    <button onClick={() => handleStatus("V")}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                      Verified
                    </button>
                    <button onClick={() => handleStatus("R")}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                      Rejected
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {state.search && (
          <div className="border border-gray-300 rounded-md shadow-sm bg-white w-64 ml-2">
            {filteredDrivers.map((driver) => (
              <div
                key={driver.driverProfileId}
                onClick={() => handleSearchSuggestionClick(driver.fullName)}
                className={`${state.hiddenSuggestion} p-3 cursor-pointer hover:bg-gray-100 transition-all`}
              >
                {driver.fullName}
              </div>
            ))}
          </div>
        )}


        {/* Total Drivers Count Display */}
        <div className="mb-4">
          <span className="text-lg font-semibold ">
            Total Drivers: <span className="text-blue-600">{filteredDrivers.length}</span>
          </span>
        </div>

        <InfiniteScroll
          dataLength={drivers.length}
          next={fetchMoreData}
          hasMore={state.hasmore}
          loader={<div className="flex justify-center items-center py-4">
            <div className="flex flex-col items-center">
              <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <h4 className="mt-4 text-center text-gray-600 font-medium">Loading...</h4>
            </div>
          </div>}
          endMessage={
            <p className="text-center py-4 font-semibold">
              <b>No more data to show</b>
            </p>
          }
        >
          <table className="w-full border-collapse bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-200 text-sm font-semibold">
              <tr>
                <th className="py-3 px-2">Full Name</th>
                <th className="py-3 px-2">Vehicle Type</th>
                <th className="py-3 px-2">Submit Date</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.slice(0, page * 4).map((driver) => (

                <tr
                  key={driver.driverProfileId}
                  className="border-b text-center text-sm hover:bg-gray-50 cursor-pointer transition-all"
                  onClick={() => navigate(`document/${driver.driverProfileId}`)}
                >
                  <td className="py-3 px-2">{driver.fullName}</td>
                  <td className="py-3 px-2">
                    {driver.wheelCount === 2
                      ? "Two Wheeler"
                      : "Four Wheeler"}
                  </td>
                  <td className="py-3 px-2">{driver.timeAgo}</td>
                  <td className="py-3 px-2">
                    <div
                      className={`text-white inline-block px-3 py-1 rounded-lg text-sm ${driver.status === "S"
                        ? "bg-blue-500 text-white"
                        : driver.status === "V"
                          ? "bg-green-500"
                          : driver.status === "R"
                            ? "bg-red-500" : ""
                        }`}
                    >
                      {driver.status === "S"
                        ? "Submitted"
                        : driver.status === "V"
                          ? "Verified"
                          : driver.status === "R"
                            ? "Rejected"
                            : ""}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>

  );
}

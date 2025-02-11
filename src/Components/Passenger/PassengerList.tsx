import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaFilter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import PassengerService from "../../../services/passengerServices"


export default function PassengerList() {
    interface User {
        _id: string;
        fullName: string;
        createdAt: string;
        phoneNumber: string;
        timeAgo?: string; 
      }
      
    
      const [users, setusers] = useState<User[]>([]);
      const [state, setState] = useState({
        search: "",
        hiddenSuggestion: "block",
        filter: false,
        hasmore: true
      })
      const [page, setPage] = useState(1);
    
    //   const navigate = useNavigate();
    
      // Fetch user data from the server
      const fetchusers = async () => {
        try {
          const response = await PassengerService.user(page);
          const newusers = response;
      
          setusers((prevusers) =>
            page === 1 ? newusers : [...prevusers, ...newusers]
          );
      
          setState((prevState) => ({
            ...prevState,
            hasmore:  newusers.length > 0 && newusers.length === 10, 
          }));
        } catch (error) {
          console.error("Error fetching users:", error);
          setState((prevState) => ({ ...prevState, hasmore: false }));
        }
      };
      
      useEffect(() => {
        fetchusers();
      }, [page]);
      
    
      const filteredusers = users.filter(user => {
    
        //search by name filter
        const searchFeature = state.search.trim() === "" ||
          user.fullName.toLowerCase().startsWith(state.search.trim().toLowerCase())
    
       
    
        return searchFeature;
      }).map((user) => {
        // Calculate timeAgo for the filtered users
        const parsedDate = parseISO(user.createdAt);
        const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true }).replace(
          /^about\s/,
          ""
        );
      
        // Add the timeAgo property to the user object
        return { ...user, timeAgo };
      });
    
      // Pagination logic for infinite scrolling
      const fetchMoreData = () => {
        if (state.hasmore) {
            setPage((prevPage) => prevPage + 1);
        }
      };
    
    //   search
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
    
    //   const handleStatus = (status: string) => {
    //     setPage(1); // Reset page to 1
    //     setState((prev) => ({ ...prev, status: status, filter: false }));
    //   };
    
      
      return (
        <div className="bg-gray-100 min-h-screen py-6">
          <div className="mx-auto max-w-6xl bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-bold  mb-6">user Document List</h1>
    
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
    
                    {/* Status Section */}
                    {/* <div className="mb-6">
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
                        <button onClick={() => handleStatus("C")}
                          className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                          Canceled
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
    
    
            {state.search && (
              <div className="border border-gray-300 rounded-md shadow-sm bg-white w-64 ml-2">
                {filteredusers.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleSearchSuggestionClick(user.fullName)}
                    className={`${state.hiddenSuggestion} p-3 cursor-pointer hover:bg-gray-100 transition-all`}
                  >
                    {user.fullName}
                  </div>
                ))}
              </div>
            )}
    
    
            {/* Total users Count Display */}
            <div className="mb-4">
              <span className="text-lg font-semibold ">
                Total users: <span className="text-blue-600">{filteredusers.length}</span>
              </span>
            </div>
    
            <InfiniteScroll
              dataLength={users.length}
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
                    <th className="py-3 px-2">Phone number</th>
                    <th className="py-3 px-2">Submit Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredusers.slice(0, page * 10).map((user) => (
    
                    <tr
                      key={user._id}
                      className="border-b text-center text-sm hover:bg-gray-50 cursor-pointer transition-all"
                    //   onClick={() => navigate(`document/${user.userProfileId}`)}
                    >
                      <td className="py-3 px-2">{user.fullName}</td>
                      <td className="py-3 px-2">
                        {user.phoneNumber}
                      </td>
                      <td className="py-3 px-2">{user.timeAgo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </div>
    
      );
    }
     
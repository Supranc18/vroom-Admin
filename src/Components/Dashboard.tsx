

interface Income {
  id: string;
  title: string;
  Amount: string;
}

interface Driver {
  rider_id: string;
  image: string;
  type: string;
  name: string;
  trip: string;
  cancelride: string;
  Earning: string;
}

interface Request {
  trip_id: string;
  passanger: string;
  driver: string;
  status: string;
  time: string;
}

export default function Dashboard() {
  const income: Income[] = [
    {
      id: "10",
      title: "Total number passenger",
      Amount: "45,000",
    },
    {
      id: "18",
      title: "Waiting for approval",
      Amount: "35,000",
    },
    {
      id: "1",
      title: "Today Earning",
      Amount: "15,000",
    },
    {
      id: "2",
      title: "Weekly Earning",
      Amount: "85,000",
    },
    {
      id: "3",
      title: "Monthly Earning",
      Amount: "2,85,000",
    },
  ];

  const driver: Driver[] = [
    {
      rider_id: "5",
      image: "/image 9.png",
      type: "Car",
      name: "Hari Shrestha",
      trip: "200",
      cancelride: "6",
      Earning: "45,000",
    },
    {
      rider_id: "6",
      image: "/image 9.png",
      type: "Bike",
      name: "Hari Shrestha",
      trip: "200",
      cancelride: "6",
      Earning: "45,000",
    },
  ];

  const TripRequest: Request[] = [
    {
      trip_id: "80",
      passanger: "Hari Sharma",
      driver: "Ganesh KC",
      time: "20 kartik 2081 /(11:20)",
      status: "way to pick",
    },
    {
      trip_id: "80",
      passanger: "Hari Sharma",
      driver: "Ganesh KC",
      time: "20 kartik 2081 /(11:20)",
      status: "On going trip",
    },
    {
      trip_id: "80",
      passanger: "Hari Sharma",
      driver: "Ganesh KC",
      time: "20 kartik 2081 /(11:20)",
      status: "COMPLETED",
    },
    {
      trip_id: "80",
      passanger: "Hari Sharma",
      driver: "Ganesh KC",
      time: "20 kartik 2081 /(11:20)",
      status: "CANCELED",
    },
  ];


  return (
    <>
    <div className='bg-gray-200'>
      <div className="px-4 py-2">
        <div>
          <h1 className="font-bold text-2xl">Vroom Nepal Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {income.map((el) => (
            <div key={el.id} className="p-4 my-4 flex flex-col w-52 bg-white">
              <p>{el.title}</p>
              <p className="text-2xl font-bold">{el.Amount}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          {driver.map((el) => (
            <div
              key={el.rider_id}
              className="bg-white w-96 flex flex-col justify-center gap-4"
            >
              <div className="flex flex-col gap-2 items-center bg-orange-400 w-[100%] p-4 text-white">
                <img className="w-20 h-20 rounded-full" src={el.image} alt={el.name} />
                <p className="text-xl">{el.type} top income {el.name}</p>
                <p>{el.type} Vroom rider</p>
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-between">
                  <p>Total trips</p>
                  <p className="text-white bg-blue-600 px-4">{el.trip}</p>
                </div>
                <div className="flex justify-between">
                  <p>Rider ID</p>
                  <p className="text-white bg-blue-600 px-4">{el.rider_id}</p>
                </div>
                <div className="flex justify-between">
                  <p>Cancelled rides</p>
                  <p className="text-white bg-blue-600 px-4">{el.cancelride}</p>
                </div>
                <div className="flex justify-between">
                  <p>Earnings per day</p>
                  <p className="text-white bg-blue-600 px-4">{el.Earning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-white my-6 p-2'>
          <h1>Recent Request List</h1>
          <div>
            <table className="w-full border-collapse border-b-2 border-gray-200 text-left my-3">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 border-b-2 border-gray-300">Trip ID</th>
                  <th className="p-4 border-b-2 border-gray-300">Passenger Name</th>
                  <th className="p-4 border-b-2 border-gray-300">Requested Date/Time</th>
                  <th className="p-4 border-b-2 border-gray-300">Driver Name</th>
                  <th className="p-4 border-b-2 border-gray-300">Trip Status</th>
                </tr>
              </thead>
              <tbody>
                {TripRequest.map((el) => (
                  <tr key={el.trip_id} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="p-4 border-b border-gray-200">{el.trip_id}</td>
                    <td className="p-4 border-b border-gray-200">{el.passanger}</td>
                    <td className="p-4 border-b border-gray-200">{el.time}</td>
                    <td className="p-4 border-b border-gray-200">{el.driver}</td>
                    <td
                      className={`p-4 border-b border-gray-200 ${el.status === "way to pick"
                          ? "bg-slate-300"
                          : el.status === "On going trip"
                            ? "bg-blue-600 text-white"
                            : el.status === "COMPLETED"
                              ? "bg-green-500 text-white"
                              : el.status === "CANCELED"
                                ? "bg-red-600 text-white"
                                : ""
                        }`}
                    >
                      {el.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      </div>
    </>
  );
}

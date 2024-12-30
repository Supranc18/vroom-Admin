import { useState, ChangeEvent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Revenue() {
    interface EarningsData {
        timePeriod: string;
        earnings: number;
    }

    const earningsData: {
        yearly: EarningsData[];
        monthly: EarningsData[];
        daily: EarningsData[];
        hourly: EarningsData[];
    } = {
        yearly: [{ timePeriod: "Yearly", earnings: 151600 }],
        monthly: [
            { timePeriod: "January", earnings: 4300 },
            { timePeriod: "February", earnings: 4000 },
            { timePeriod: "March", earnings: 4500 },
            { timePeriod: "April", earnings: 2500 },
            { timePeriod: "May", earnings: 6500 },
            { timePeriod: "June", earnings: 1500 },
            { timePeriod: "July", earnings: 9500 },
            { timePeriod: "August", earnings: 8500 },
            { timePeriod: "September", earnings: 6500 },
            { timePeriod: "October", earnings: 5500 },
            { timePeriod: "November", earnings: 4500 },
            { timePeriod: "December", earnings: 3500 },
        ],
        daily: [
            { timePeriod: "1st", earnings: 200 },
            { timePeriod: "2nd", earnings: 210 },
            { timePeriod: "3rd", earnings: 1210 },
            { timePeriod: "4th", earnings: 2210 },
            { timePeriod: "5th", earnings: 3210 },
            { timePeriod: "6th", earnings: 5210 },
            { timePeriod: "7th", earnings: 1210 },
            { timePeriod: "8th", earnings: 6210 },
            { timePeriod: "9th", earnings: 8210 },
            { timePeriod: "10th", earnings: 5210 },
            { timePeriod: "11th", earnings: 7210 },
            { timePeriod: "12th", earnings: 4210 },
            { timePeriod: "14th", earnings: 8210 },
            { timePeriod: "15th", earnings: 7210 },
            { timePeriod: "16th", earnings: 6210 },
            { timePeriod: "17th", earnings: 5210 },
            { timePeriod: "18th", earnings: 1210 },
            { timePeriod: "19th", earnings: 2210 },
            { timePeriod: "20th", earnings: 3210 },
            { timePeriod: "21st", earnings: 9210 },
            { timePeriod: "22nd", earnings: 5210 },
            { timePeriod: "23rd", earnings: 7210 },
            { timePeriod: "24th", earnings: 6210 },
            { timePeriod: "25th", earnings: 8210 },
            { timePeriod: "26th", earnings: 9210 },
            { timePeriod: "27th", earnings: 4210 },
            { timePeriod: "28th", earnings: 14210 },
            { timePeriod: "29th", earnings: 14210 },
            { timePeriod: "30th", earnings: 24210 },
        ],
        hourly: [
            { timePeriod: "1:00", earnings: 25 },
            { timePeriod: "2:00", earnings: 30 },
        ],
    };

    const [selectedPeriod, setSelectedPeriod] = useState<string>("yearly");
    const [currentData, setCurrentData] = useState<EarningsData[]>(earningsData.yearly);

    const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const period = event.target.value;
        setSelectedPeriod(period);
        setCurrentData(earningsData[period as keyof typeof earningsData]);
    };

    return (
        <div className="bg-gray-200" style={{ textAlign: "center" }}>
            <h2>Revenue</h2>

            <select onChange={handlePeriodChange} value={selectedPeriod}>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="hourly">Hourly</option>
            </select>

            <div style={{ overflowX: "auto", width: "100%" }}>
                <LineChart
                    width={1000}
                    height={480}
                    data={currentData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timePeriod" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="earnings" stroke="red" />
        </LineChart>
      </div>
    </div>
  );
}

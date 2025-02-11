import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import UploadAds from "./Components/ADS/UploadAds";
import AdminRout from "./Router/AdminRout";
import Ads from "./Components/ADS/Ads";
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login";
import DriverDocuments from "./Components/Driver/DriverDocuments";
import DocumentView from "./Components/Driver/DocumentView";
import PassengerList from "./Components/Passenger/PassengerList";
import PassengerView from "./Components/Passenger/PassengerView";
import Alllist from "./Components/Rider requests/Alllist";
import AlllistView from "./Components/Rider requests/AlllistView";
import Revenue from "./Revenue/Revenue";
import Signup from "./Components/Signup";
import VehicleRegister from "./Components/Vehicle Register/VehicleRegister";
import ViewColor from "./Components/Vehicle Register/ViewColor";
import Brand from "./Components/Vehicle Register/Brand";
import Color from "./Components/Vehicle Register/Color";
import Model from "./Components/Vehicle Register/Model";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <AdminRout />,
      children: [

        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: 'registervehicle',
          children: [
            {
              path:"",
              element:<VehicleRegister/>
            },
            {
              path:"brand",
              element:<Brand/>
            },
            {
              path:"model",
              element:<Model/>
            },
            {
              path:"color",
              children:[
                {
                  path:"",
                  element:<Color/>
                },
                {
                  path:"view/:slug",
                  element:<ViewColor/>
                }
              ] 
            },
          ]
        },
        {
          path: "passengerlist",

          children: [
            {
              path: "",
              element: <PassengerList />,
            },
            {
              path: "view/:slug",
              element: <PassengerView />,

            },
          ]
        },

        {
          path: "driver-document",
          children: [
            {
              path: '',
              element: <DriverDocuments />,
            },
            {
              path: "document/:slug",
              element: <DocumentView />,
            },
          ]

        },
        {
          path: "Alllist",
          children: [
            {
              path: '',
              element: <Alllist />,
            },
            {
              path: 'view/:slug',
              element: <AlllistView />,
            },
          ]

        },
        {
          path: "/revenue",
          element: <Revenue />,
        },



        {
          path: "ads",
          children: [
            {
              path: "",
              element: <Ads />
            },
            {
              path: "uploadads",
              element: <UploadAds />,
            },
            {
              path: "edit/:slug",
              element: <UploadAds />
            },
          ]
        },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

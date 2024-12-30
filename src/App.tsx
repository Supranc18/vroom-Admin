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
import VerifideDriver from "./Components/Driver/VerifideDriver";
import PendingDriver from "./Components/Driver/PendingDriver";
import PassengerList from "./Components/Passenger/PassengerList";
import PassengerView from "./Components/Passenger/PassengerView";
import Alllist from "./Components/Rider requests/Alllist";
import AlllistView from "./Components/Rider requests/AlllistView";
import Revenue from "./Revenue/Revenue";
import Signup from "./Components/Signup";

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
          path: "/verified-drivers",
          element: <VerifideDriver />,
        },
        {
          path: "/pending-drivers",
          element: <PendingDriver />,
        },
        
        {
          path:"passengerlist",
          
          children:[
            {
              path:"",
              element:<PassengerList/>,
            },
            {
              path: "view/:slug",
              element: <PassengerView />,
             
            },
          ]
        },

        {
          path: "driver-document",
          children:[
            {
              path:'',
              element: <DriverDocuments/>,
            },
            {
              path: "document/:slug",
              element: <DocumentView/>,
            },
          ]
          
        },
        {
          path: "Alllist",
          children:[
            {
              path:'',
              element: <Alllist/>,
            },
            {
              path:'view/:slug',
              element: <AlllistView/>,
            },
          ]
          
        },
        {
          path: "/revenue",
          element: <Revenue />,
        },
        
      
        
        {
          path: "ads",
          children:[
            {
              path:"",
              element:<Ads/>  
            },
            {
              path: "uploadads",
              element: <UploadAds />,
            },
            {
              path:"edit/:slug",
              element: <UploadAds/> 
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

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Public/Home";
import Main from "../layout/Main";
import AllStore from "../pages/Public/AllStore/AllStore";
import SignUp from "../pages/Public/Auth/SignUp";
import SignIn from "../pages/Public/Auth/SignIn";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Public/Profile";
import AddStore from "../pages/StoreOwner/AddStore";
import AddSpace from "../pages/StoreOwner/AddSpace";
import MySpace from "../pages/StoreOwner/MySpace";
import MyStores from "../pages/StoreOwner/MyStores";
import AllSpace from "../pages/Public/AllSpace/AllSpace";
import ReserveNow from "../pages/Public/ReserveNow/ReserveNow";
import StoreDetails from "../pages/Public/AllStore/StoreDetails";
import DashboardHome from "../pages/Public/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/signup", element: <SignUp></SignUp> },
      { path: "/signin", element: <SignIn></SignIn> },
      {
        path: "/allstore",
        element: <AllStore></AllStore>,
      },
      {
        path: "/allspace",
        element: <AllSpace></AllSpace>,
      },
      {
        path: "/storedetails/:storeId",
        element: <StoreDetails></StoreDetails>,
      },
      {
        path: "/reserve/:Id",
        element: <ReserveNow></ReserveNow>,
      },
      {
        path: "/payment/failed/:Id",
        element: <h1>Failed</h1>,
      },
      {
        path: "/payment/success/:Id",
        element: <h1>Success</h1>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      { path: "home", element: <DashboardHome></DashboardHome> },
      { path: "profile", element: <Profile></Profile> },
      {
        path: "storeowner/addstore",
        element: <AddStore></AddStore>,
      },
      {
        path: "storeowner/addspace",
        element: <AddSpace></AddSpace>,
      },
      {
        path: "storeowner/myspace",
        element: <MySpace></MySpace>,
      },
      {
        path: "storeowner/mystore",
        element: <MyStores></MyStores>,
      },
    ],
  },
]);
export default router;

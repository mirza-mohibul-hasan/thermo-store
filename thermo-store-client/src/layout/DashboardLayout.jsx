import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { GiLockers } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { FaDumpster, FaHome, FaShoppingCart, FaUsersCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { LuListStart } from "react-icons/lu";
import NavigationBar from "../component/NavigationBar";
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role;
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className=" dark:bg-gray-900 dark:text-white">
        <div className="lg:flex w-11/12 mx-auto gap-5 my-5 min-h-[75vh">
          <div className="lg:w-2/12 flex flex-col gap-2 lg:border-r-2 border-[#334B35] pr-3 py-5">
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                  : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
              }
            >
              <FaHome />
              HOME
            </NavLink>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                  : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
              }
            >
              <CgProfile />
              PROFILE
            </NavLink>
            {role == "admin" && (
              <>
                <NavLink
                  to="manageusers"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <FaUsersCog />
                  MANAGE USERS
                </NavLink>
                <NavLink
                  to="managestore"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <LuListStart />
                  MANAGE STORE
                </NavLink>
              </>
            )}
            {role == "storeowner" && (
              <>
                <NavLink
                  to="storeowner/mystore"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <FaDumpster />
                  MY STORES
                </NavLink>
                <NavLink
                  to="storeowner/myspace"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <FaDumpster />
                  MY SPACE
                </NavLink>
                <NavLink
                  to="storeowner/addstore"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <IoIosAddCircle />
                  ADD STORE
                </NavLink>
                <NavLink
                  to="storeowner/addspace"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <IoIosAddCircle />
                  ADD SPACE
                </NavLink>
              </>
            )}
            {role == "customer" && (
              <>
                <NavLink
                  to="cart"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <FaShoppingCart />
                  MY CART
                </NavLink>
                <NavLink
                  to="landfill-vehicle-entry"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <GiLockers />
                  MY SPACES
                </NavLink>
                <NavLink
                  to="billing-history"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#334B35]  rounded p-1 text-left text-md text-white inline-flex items-center gap-1 pl-2"
                      : "border border-[#334B35] rounded p-1 text-left text-md inline-flex items-center gap-1 pl-2 text-[#334B35]"
                  }
                >
                  <TbReport />
                  HISTORY
                </NavLink>
              </>
            )}
          </div>
          <div className="w-full p-5">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

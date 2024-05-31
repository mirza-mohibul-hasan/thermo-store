import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoSun, GoMoon } from "react-icons/go";
import { FaBarsProgress } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { AuthContext } from "../provider/AuthProvider";
import { BiLogOut } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import axios from "axios";
import Swal from "sweetalert2";
const NavigationBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, refetch, setRefetch } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme, user]);
  const links = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/allstore",
      name: "All Store",
    },
    {
      url: "/allspace",
      name: "All Space",
    },
  ];
  const providerLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3456/api/v1/logout");
      if (!response.data.success) {
        Swal.fire({
          icon: "error",
          title: response.data?.message,
          text: "Please try again.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: response.data?.message,
          text: "Thank you!",
        }).then(() => {
          localStorage.removeItem("token");
          setRefetch(!refetch);
          window.location.href = "/";
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className=" bg-[#334B35] dark:bg-gray-800 text-[#FFFFFF]">
      <nav>
        <div className="max-w-7xl mx-auto">
          <div className="flex mx-auto justify-between w-5/6 ">
            {/* Primary menu and logo */}
            <div className="flex items-center gap-16 my-5">
              {/* logo */}
              <div>
                <NavLink
                  to="/"
                  className="flex gap-1 font-bold text-[#FFFFFF] items-center hover:transition hover:duration-200 hover:text-[#F7C35F]"
                >
                  <IoStorefrontOutline className="h-6 w-6 text-[#F7C35F]" />

                  <span>Thermo Store</span>
                </NavLink>
              </div>
              {/* primary */}
              <div className="hidden lg:flex gap-8 ">
                {links.map((link) => (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "hover:transition hover:duration-200 hover:text-[#F7C35F] border-b-2 border-[#F7C35F]"
                        : "hover:transition hover:duration-200 hover:text-[#F7C35F]"
                    }
                    key={link.url}
                    to={link.url}
                  >
                    {link.name}
                  </NavLink>
                ))}
                {user && (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "hover:transition hover:duration-200 hover:text-[#F7C35F] border-b-2 border-[#F7C35F] inline-flex items-center gap-1"
                        : "hover:transition hover:duration-200 hover:text-[#F7C35F] inline-flex items-center gap-1"
                    }
                    to="/dashboard/profile"
                  >
                    <RxDashboard size={12} />
                    Dashboard
                  </NavLink>
                )}
              </div>
            </div>
            {/* secondary */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                    onClick={toggleTheme}
                  >
                    {theme === "light" ? (
                      <GoSun className="h-4 w-4" />
                    ) : (
                      <GoMoon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {user ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`http://localhost:3456/public/uploads/profile/${user.avatar}`}
                    alt=""
                  />
                ) : (
                  <NavLink
                    className="hover:transition hover:duration-200 hover:text-[#F7C35F]"
                    to="/signin"
                  >
                    Sign In
                  </NavLink>
                )}
                {user && (
                  <button
                    onClick={providerLogout}
                    className="hover:transition hover:duration-200 hover:text-[#F7C35F]"
                  >
                    <BiLogOut size={24}></BiLogOut>
                  </button>
                )}
              </div>
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <FaBarsProgress className="h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 bg-[#334B35] dark:bg-gray-800 text-[#FFFFFF] ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8 ">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              {links.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "hover:transition hover:duration-200 hover:text-[#F7C35F] border-b-2 border-[#F7C35F]"
                      : "hover:transition hover:duration-200 hover:text-[#F7C35F]"
                  }
                  key={link.url}
                  to={link.url}
                >
                  <button onClick={() => setToggleMenu(!toggleMenu)}>
                    {link.name}
                  </button>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;

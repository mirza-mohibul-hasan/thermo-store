import { Outlet } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import Footer from "../component/Footer";
const Main = () => {
  return (
    <div className="">
      <NavigationBar></NavigationBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;

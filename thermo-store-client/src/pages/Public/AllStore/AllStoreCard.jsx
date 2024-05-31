import { FaBowlRice, FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
const AllStoreCard = ({ store }) => {
  console.log(store);
  return (
    <div className="p-5 bg-[#334b353d] rounded shadow shadow-red-20">
      <img
        className="rounded shadow-2xl mt-1 shadow-[#334b3591] w-full h-56"
        src={`http://localhost:3456/public/uploads/store/${store.avatar}`}
        alt=""
      />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-1 text-[#3E312D] font-[700] font-inter">
          {store.storeName}
        </h1>
        {/* <p className="rounded-full text-black py-1 px-5 ml-4 border-2 border-[#334B35] font-bold"></p> */}
      </div>
      <h1 className="text-xl my-1 text-[#3E312D] font-[700] font-inter">
        Size: {store.length} X {store.width} feet
      </h1>
      <h4 className="mb-2 flex items-center gap-1">
        <FaBowlRice size={20} className="text-[#334B35]"></FaBowlRice>

        <span className="font-semibold ">Capacity: {store.capacity} Ton</span>
      </h4>
      <h4 className="mb-2 flex items-center gap-1">
        <FaMapLocationDot
          size={20}
          className="text-[#334B35]"
        ></FaMapLocationDot>
        <span className="font-semibold ">{store.address}</span>
      </h4>
      <h4 className="flex items-center gap-1 mb-2">
        <TfiEmail size={20} className="text-[#334B35]"></TfiEmail>
        <span className="font-semibold ">{store.owner}</span>
      </h4>
      <div className="flex justify-between">
        <Link to={`/storedetails/${store._id}`}>
          <button className="bg-gray-200 flex items-center text-[#334B35] hover:text-white hover:bg-[#334B35] p-1 rounded-full px-3">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllStoreCard;

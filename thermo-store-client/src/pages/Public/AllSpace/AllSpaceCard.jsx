import { TbCurrencyTaka } from "react-icons/tb";
import { MdOutlineTableBar } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";

const AllSpaceCard = ({ space }) => {
  console.log(space);

  return (
    <div className="p-5 bg-[#334b353d] rounded shadow shadow-[#334b3591] dark:bg-gray-900 dark:text-white dark:shadow">
      <img
        className="rounded dark:shadow shadow-2xl shadow-[#334b356b] h-56 w-full"
        src={`http://localhost:3456/public/uploads/space/${space.avatar}`}
        alt={space.name}
      />
      <div className="flex justify-between mt-2 border-b-2 border-[#334B35] pb-1">
        <h1 className="text-xl text-[#3E312D] font-[700] font-inter dark:text-white">
          <span className="uppercase">{space.shape}</span>
        </h1>
        <p className="text-xl font-semibold flex gap-2 ">
          <span className="text-lg">from</span>
          <span>{space.storeName}</span>
        </p>
      </div>
      <div>
        <div className="text-xl font-semibold flex justify-between mt-1">
          <h1>
            Size: {space.length} X {space.width} feet
          </h1>
          <h4 className="flex items-center justify-end">
            <TbCurrencyTaka size={25}></TbCurrencyTaka>
            <span>{parseFloat(space.pricePerDay).toFixed(2)}/Day</span>
          </h4>
        </div>
      </div>
      <div className="flex justify-between my-1">
        <p
          className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
        >
          {space.productType}
        </p>
        <p
          className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
        >
          {space.capacity} KG
        </p>
        {/* <p
          className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
        >
          {space.availability ? "Available" : "Not Available"}
        </p> */}
      </div>
      <p className="py-2">{space.description}</p>
      <div className="h-10 flex justify-between items-center ">
        <Link to={`/storedetails/${space.storeId}`}>
          <button className="bg-gray-200 flex items-center text-[#334B35] hover:text-white hover:bg-[#334B35] p-1 rounded-full px-3">
            <BiDetail size={20}></BiDetail>
            <p>Store Details</p>
          </button>
        </Link>
        <Link to={`/reserve/${space._id}`}>
          <button className="bg-gray-200 flex items-center text-[#334B35] hover:text-white hover:bg-[#334B35] p-1 rounded-full px-3">
            <MdOutlineTableBar size={20} />
            <p>Reserve Now</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllSpaceCard;

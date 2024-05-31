import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

const ReserveNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Id } = useParams();
  const [space, setSpace] = useState(null);
  const [price, setPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3456/api/v1/space/${Id}`
        );
        setSpace(response.data);
      } catch (error) {
        console.error("Error fetching spaces:", error.message);
      }
    };

    fetchSpaces();
  }, [Id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3456/api/v1/calculate-price",
        {
          spaceId: Id,
          fromDate,
          toDate,
        }
      );

      if (response.data.success) {
        console.log(response.data);
        setPrice(response.data.price);
        setTotalPrice(response.data.totalPrice);
        setDiscount(response.data.discount);
      } else {
        alert("Failed to calculate price");
      }
    } catch (error) {
      console.error("Error calculating price:", error.message);
      alert("Failed to calculate price");
    }
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };
  const handlePay = () => {
    if (!totalPrice) {
      alert("Please calculate the price first");
      return;
    }

    if (user && user?.email) {
      const paymentDetails = {
        space,
        user,
        totalPrice,
        currency: "BDT",
      };
      fetch("http://localhost:3456/api/v1/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      })
        .then((res) => res.json())
        .then((result) => window.location.replace(result.url))
        .catch((error) => {
          console.error("Error processing payment:", error);
          alert("Failed to initiate payment");
        });
    } else {
      Swal.fire({
        title: "Please sign in first",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign In now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="mt-5 w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div>
        <div className="p-5 bg-[#334b353d] rounded shadow shadow-[#334b3591] dark:bg-gray-900 dark:text-white dark:shadow">
          <img
            className="rounded dark:shadow shadow-2xl shadow-[#334b356b] h-56 w-full"
            src={`http://localhost:3456/public/uploads/space/${space?.avatar}`}
            alt={space?.name}
          />
          <div className="flex justify-between mt-2 border-b-2 border-[#334B35] pb-1">
            <h1 className="text-xl text-[#3E312D] font-[700] font-inter dark:text-white">
              <span className="uppercase">{space?.shape}</span>
            </h1>
            <p className="text-xl font-semibold flex gap-2 ">
              <span className="text-lg">from</span>
              <span>{space?.storeName}</span>
            </p>
          </div>
          <div>
            <div className="text-xl font-semibold flex justify-between mt-1">
              <h1>
                Size: {space?.length} X {space?.width} feet
              </h1>
              <h4 className="flex items-center justify-end">
                <TbCurrencyTaka size={25}></TbCurrencyTaka>
                <span>{parseFloat(space?.pricePerDay).toFixed(2)}/Day</span>
              </h4>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p
              className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
              style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
            >
              {space?.productType}
            </p>
            <p
              className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
              style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
            >
              {space?.capacity} KG
            </p>
            {/* <p
className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
>
{space?.availability ? "Available" : "Not Available"}
</p> */}
          </div>
          <p className="py-2">{space?.description}</p>
        </div>
      </div>
      {/* Calculate Price form */}
      <div className="p-5 bg-[#334b353d] rounded shadow shadow-[#334b3591] dark:bg-gray-900 dark:text-white dark:shadow mt-5 lg:mt-0">
        <h1 className="text-lg text-center font-semibold text-[#717070] px-5 uppercase">
          Calculate Price
        </h1>
        <form onSubmit={handleSubmit} className="">
          {/* From Date */}
          <div className="form-control flex flex-col mt-1">
            <label className="label">
              <span className="label-text uppercase">From Date</span>
            </label>
            <input
              value={fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
              className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] focus:outline-none"
              type="date"
              required
            />
          </div>
          {/* To Date */}
          <div className="form-control flex flex-col mt-1">
            <label className="label">
              <span className="label-text uppercase">To Date</span>
            </label>
            <input
              value={toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
              className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] focus:outline-none"
              type="date"
              required
            />
          </div>
          {/* Submit button */}
          <div className="form-control mt-6 flex justify-center pb-3">
            <input
              type="submit"
              value="Calculate Price"
              className="text-[#334B35] border rounded p-1 font-semibold hover:bg-[#334B35] hover:text-white border-[#334B35] uppercase w-full"
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-3 p-5 bg-[#334b353d] rounded shadow shadow-[#334b3591] dark:bg-gray-900 dark:text-white dark:shadow mt-5 lg:mt-0">
        <p className="text-xl text-[#3E312D] font-[700] font-inter dark:text-white">
          Total Price: {totalPrice ? totalPrice : 0}
        </p>
        <p className="text-xl text-[#3E312D] font-[700] font-inter dark:text-white">
          Price after discount: {price ? price : 0}
        </p>
        <p className="text-xl text-[#3E312D] font-[700] font-inter dark:text-white">
          Discount: {discount ? discount : 0} %
        </p>
        <button
          onClick={() => handlePay()}
          className="text-[#334B35] border rounded p-1 font-semibold hover:bg-[#334B35] hover:text-white border-[#334B35] uppercase w-full"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ReserveNow;

import { useForm } from "react-hook-form";
import useTitle from "../../hooks/useTitle";
import { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const AddStore = () => {
  useTitle("Add Store");
  const { user } = useContext(AuthContext);
  console.log(user);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("address", data.address);
      formData.append("capacity", parseFloat(data.capacity));
      formData.append("length", parseFloat(data.length));
      formData.append("width", parseFloat(data.width));
      formData.append("owner", user?.email);
      formData.append("storeName", data.storeName);
      formData.append("avatar", data.avatar[0]);

      console.log(data);
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3456/api/v1/addstore",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      console.log(response);
      if (response.data?.success) {
        alert("Store successfully added");
        reset();
      } else {
        alert("Store add failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding store:", error.message);
    }
  };

  return (
    <div className="card flex-shrink-0 lg:w-2/5 mx-auto my-5 rounded p-5 bg-[#97979719] text-[#717070]">
      <div className="card-body">
        <h1 className="text-lg text-center font-semibold text-[#717070] px-5 uppercase">
          Add Store
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-base">
          <div>
            <div className="form-control flex flex-col mt-1">
              <label className="label">
                <span className="label-text uppercase">Store Name</span>
              </label>
              <input
                type="text"
                name="storeName"
                {...register("storeName")}
                placeholder="Royal Himagar"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control flex flex-col mt-1">
              <label className="label">
                <span className="label-text uppercase">Address</span>
              </label>
              <input
                type="text"
                name="address"
                {...register("address")}
                placeholder="14, Rail Road, Jessore"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Length in feet</span>
              </label>
              <input
                type="number"
                name="length"
                step="0.01"
                {...register("length")}
                placeholder="00.40"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Width in feet</span>
              </label>
              <input
                type="number"
                name="length"
                step="0.01"
                {...register("width")}
                placeholder="00.40"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Capacity(In Ton)</span>
              </label>
              <input
                type="text"
                name="capacity"
                {...register("capacity")}
                placeholder="200.40"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Store Picture</span>
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                {...register("avatar")}
                className="input input-bordered bg-gray-100 rounded py-1 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#cad2f4c3] file:text-[#334B35] hover:file:bg-[#b6c2f5c3]"
              />
            </div>
          </div>
          <div className="form-control mt-6 flex justify-center pb-3">
            <input
              type="submit"
              value="Add Store"
              className="text-[#334B35] border rounded p-1 font-semibold hover:bg-[#334B35] hover:text-white border-[#334B35] uppercase w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStore;

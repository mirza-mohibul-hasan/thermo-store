import { Bars } from "react-loader-spinner";
import useTitle from "../../hooks/useTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddSpace = () => {
  useTitle("Add Space");
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user) {
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:3456/api/v1/stores/${user?.email}`
        );
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const selectedStore = stores.find((store) => store._id === data.storeId);
      const formData = new FormData();
      formData.append("storeId", data.storeId);
      formData.append("storeName", selectedStore.storeName);
      formData.append("length", parseFloat(data.length));
      formData.append("width", parseFloat(data.width));
      formData.append("pricePerDay", parseFloat(data.pricePerDay));
      formData.append("productType", data.productType);
      formData.append("capacity", parseFloat(data.capacity)); // New capacity field
      formData.append("avatar", data.avatar[0]);

      setLoading(true);
      const response = await axios.post(
        "http://localhost:3456/api/v1/addspace",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);

      if (response.data?.success) {
        alert("Space successfully added");
        reset();
      } else {
        alert("Failed to add space");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding space:", error.message);
    }
  };

  return (
    <div className="card flex-shrink-0 lg:w-2/5 mx-auto my-5 rounded p-5 bg-[#97979719] text-[#717070]">
      <div className="card-body">
        <h1 className="text-lg text-center font-semibold text-[#717070] px-5 uppercase">
          Add Space
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-base">
          <div>
            <div className="form-control flex flex-col mt-1">
              <label className="label">
                <span className="label-text uppercase">Select Store</span>
              </label>
              <select
                name="storeId"
                {...register("storeId")}
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] focus:outline-none"
                required
              >
                <option value="">Select Store</option>
                {stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.storeName}
                  </option>
                ))}
              </select>
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
                name="width"
                step="0.01"
                {...register("width")}
                placeholder="00.40"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">PerDay Price per Square Feet</span>
              </label>
              <input
                type="number"
                name="pricePerDay"
                step="0.01"
                {...register("pricePerDay")}
                placeholder="20.50"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Product Type</span>
              </label>
              <select
                name="productType"
                {...register("productType")}
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#5D5FEF] focus:ring-1 focus:ring-[#5D5FEF] focus:outline-none"
                required
              >
                <option value="">Select Product Type</option>
                <option value="Fruits">Fruits (e.g., apple, grape)</option>
                <option value="Vegetables">Potato and Vegetables</option>
                <option value="Meat">Meat</option>
              </select>
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Capacity in KG</span>
              </label>
              <input
                type="number"
                name="capacity"
                step="0.01"
                {...register("capacity")}
                placeholder="1000"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Space Picture</span>
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
              value="Add Space"
              className="text-[#334B35] border rounded p-1 font-semibold hover:bg-[#334B35] hover:text-white border-[#334B35] uppercase w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpace;

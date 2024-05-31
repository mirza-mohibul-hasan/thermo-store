import { useEffect, useState } from "react";
import axios from "axios";

const MyStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get("http://localhost:3456/api/v1/mystores");
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  return (
    <div className="px-5 border-l-2 ml-5 mt-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Stores</h2>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="table text-center">
          {/* head */}
          <thead className="bg-[#334B35] text-white">
            <tr>
              <th>Image</th>
              <th>Store Name</th>
              <th>Address</th>
              <th>Capacity</th>
              <th>Size (Length X Width)</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store._id}>
                <td>
                  <img
                    className="w-16 h-16 rounded-full"
                    src={`http://localhost:3456/public/uploads/store/${store.avatar}`}
                    alt=""
                  />
                </td>
                <td>{store.storeName}</td>
                <td>{store.address}</td>
                <td>{store.capacity}</td>
                <td>
                  {store.length} X {store.width}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyStores;

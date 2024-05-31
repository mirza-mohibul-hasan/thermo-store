import { useEffect, useState } from "react";
import axios from "axios";

const MySpace = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const response = await axios.get("http://localhost:3456/api/v1/myspaces");
      setSpaces(response.data);
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  };

  return (
    <div className="px-5 border-l-2 ml-5 mt-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Spaces</h2>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="table text-center">
          {/* head */}
          <thead className="bg-[#334B35] text-white">
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Space Name</th>
              <th>Product Type</th>
              <th>Size (Length X Width)</th>
              <th>Capacity</th>
              <th>Price Per Day</th>
            </tr>
          </thead>
          <tbody>
            {spaces?.map((space, index) => (
              <tr key={space._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="w-16 h-16 rounded-full"
                    src={`http://localhost:3456/public/uploads/space/${space.avatar}`}
                    alt=""
                  />
                </td>
                <td>{space.storeName}</td>
                <td>{space.productType}</td>
                <td>
                  {space.length} X {space.width}
                </td>
                <td>{space.capacity}</td>
                <td>${space.pricePerDay.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySpace;

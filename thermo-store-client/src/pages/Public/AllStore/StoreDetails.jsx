import { useEffect, useState } from "react";
import AllSpaceCard from "../AllSpace/AllSpaceCard";
import { useParams } from "react-router-dom";

const StoreDetails = () => {
  const [spaces, setSpaces] = useState([]);
  const [store, setStore] = useState(null);
  const { storeId } = useParams();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(
          `http://localhost:3456/api/v1/spaces/${storeId}`
        );
        const data = await response.json();
        console.log(data);
        setSpaces(data.spaces);
        setStore(data.store);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, [storeId]);

  console.log(spaces);

  return (
    <div className="mt-5 w-10/12 mx-auto">
      {store && (
        <div className="bg-[#334b35] text-white rounded-lg shadow-lg p-5 mb-5">
          <div className="md:flex items-center gap-5">
            <img
              className="rounded shadow-lg lg:w-32 lg:h-32 mx-auto md:mx-0"
              src={`http://localhost:3456/public/uploads/store/${store.avatar}`}
              alt={store.storeName}
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{store.storeName}</h1>
              <p className="text-lg">
                Size: {store.length} X {store.width} feet
              </p>
              <p className="text-lg">Capacity: {store.capacity} Ton</p>
              <p className="text-lg">Location: {store.address}</p>
              <p className="text-lg">Owner: {store.owner}</p>
            </div>
          </div>
        </div>
      )}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {spaces?.map((space) => (
          <AllSpaceCard key={space._id} space={space} />
        ))}
      </div>
    </div>
  );
};

export default StoreDetails;

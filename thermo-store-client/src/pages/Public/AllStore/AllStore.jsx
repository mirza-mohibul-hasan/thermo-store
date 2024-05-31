import { useEffect, useState } from "react";
import axios from "axios";
import AllStoreCard from "./AllStoreCard";

const AllStore = () => {
  // State to store the fetched stores data
  const [stores, setStores] = useState([]);

  // Fetch stores data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3456/api/v1/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto">
        {stores.map((store) => (
          <AllStoreCard key={store._id} store={store}></AllStoreCard>
        ))}
      </div>
    </div>
  );
};

export default AllStore;

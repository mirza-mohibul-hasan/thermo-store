import AllSpaceCard from "./AllSpaceCard";

import { useEffect, useState } from "react";

const AllSpace = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch("http://localhost:3456/api/v1/spaces");
        const data = await response.json();
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto">
      {spaces.map((space) => (
        <AllSpaceCard key={space._id} space={space} />
      ))}
    </div>
  );
};

export default AllSpace;

import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3456/api/v1/profile")
      .then((response) => {
        if (response.data.loggedIn) {
          setUser(response.data?.user);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => console.error("Error fetching login status:", error))
      .finally(() => setLoading(false));
  }, [refetch]);

  const authInfo = {
    user,
    loading,
    refetch,
    setRefetch,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} || Thermo Store`;
  }, [title]);
};
export default useTitle;

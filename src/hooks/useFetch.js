import { useState, useEffect } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "utils/firebase";
const useFetch = (url, token) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [toggle, setToggle] = useState();
    useEffect(() => {
      if(!token) return;
      if(!url) return;
      setIsFetching(true);
      axios.get(url, { headers: { Authorization: `Bearer ${token}` }})
        .then(response => setData(response.data))
        .catch(({response}) => {
          setError(response.data);
          if(response.data.status === 403) {
            signOut(auth)
          } 
        })
        .finally(() => setIsFetching(false));
    }, [url, toggle,token]);
    const handleToggle = () => {
      setToggle(!toggle)
    }
    return { data, isFetching, error, handleToggle };
};
export { useFetch }
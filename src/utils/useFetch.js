import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [toggle, setToggle] = useState();
    useEffect(() => {
      if(!url) return;
      setIsFetching(true);
      axios.get(url, { headers: { 'TEST-USER-ID': 'f1' }})
        .then(response => setData(response.data))
        .catch(error => setError(error.response.data))
        .finally(() => setIsFetching(false));
    }, [url, toggle]);
    const handleToggle = () => {
      setToggle(!toggle)
    }
    return { data, isFetching, error, handleToggle };
};
export { useFetch }
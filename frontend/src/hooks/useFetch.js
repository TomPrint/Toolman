import { useState, useEffect } from "react";
import {useAuthContext} from '../hooks/useAuthContext'

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const {user} = useAuthContext()

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(url,{
                headers: {'Authorization': `Bearer ${user.token}`},
            });
            const data = await response.json();
            setData(data);
            setLoading(false);
        };
        if(user){
            fetchData();
        }
    }, [url,user]);

    return { loading, data, setData };
};

  export default useFetch;
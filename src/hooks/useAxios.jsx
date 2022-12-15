import { useCallback, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://dhodonto.ctdprojetos.com.br';

const useAxios = () => {
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData =  useCallback(async(params) => {
        try {
            const result = await axios.request(params)
            setResponse(result.data)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { response, error, loading, fetchData };
};

export default useAxios;

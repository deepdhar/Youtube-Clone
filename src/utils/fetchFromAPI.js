import axios from "axios";

// const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

export const fetchFromAPI = async (options) => {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    
}
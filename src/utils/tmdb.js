import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`, // Use environment variable for the API key
        },
    };

    try {
        const response = await axios.get(url, options);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data from TMDB: " + response.statusText);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching from TMDB:", error.message);
        throw new Error("Failed to fetch data from TMDB.");
    }
};

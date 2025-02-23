import { fetchFromTMDB } from '../utils/tmdb.js';

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trending TV shows found" });
        }
        const randomTvShow = data.results[Math.floor(Math.random() * data.results.length)];
        res.json({ success: true, content: randomTvShow });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trailers found" });
        }
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        console.error(error.message);
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        if (!data) {
            return res.status(404).json({ success: false, message: "TV show not found" });
        }
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error(error.message);
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No similar TV shows found" });
        }
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    const validCategories = ["airing_today", "on_the_air", "popular", "top_rated"];
    
    if (!validCategories.includes(category)) {
        return res.status(400).json({ success: false, message: "Invalid category" });
    }

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No TV shows found for the given category" });
        }
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

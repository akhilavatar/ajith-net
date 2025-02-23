import { useEffect, useState } from "react";
import { useContentStore } from "../store/content.js";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]);  // Initialize as an empty array
  const { contentType } = useContentStore();  // Zustand store for content type

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);  // Ensure this endpoint is correct
        setTrendingContent(res.data.content || []);  // Set content or empty array
      } catch (error) {
        console.error("Error fetching trending content:", error);
        setTrendingContent([]);  // Set to an empty array on error to avoid further issues
      }
    };

    getTrendingContent();  // Call async function
  }, [contentType]);  // Dependency array triggers effect when contentType changes

  return { trendingContent };
};

export default useGetTrendingContent;

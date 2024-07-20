import { fetchFromTMDB } from "../services/tmdb.service.js";

const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error in getTrendingMovie controller");
    json.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US"`
    );

    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    console.error("Error in getTrailers controller");
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "trailer not found" })
        .send(null);
    }
    json.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.status(200).json({ success: true, details: data });
  } catch (error) {
    console.error("Error in getMovieDetails controller");
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "movie details not found" })
        .send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data });
  } catch (error) {
    console.error("Error in getSimilarMovies controller");
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "similar movies not found" })
        .send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, category: data });
  } catch (error) {
    console.error("Error in getMoviesByCategory controller");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
};

import { fetchFromTMDB } from "../services/tmdb.service.js";

const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomTv });
  } catch (error) {
    console.error("Error in getTrendingTv controller");

    json.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTvTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data });
  } catch (error) {
    console.error("Error in getTvtrailers Controller");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getTvDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.json({ success: true, details: data });
  } catch (error) {
    console.error("Error in getTvDetails Controller");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getSimilarTv = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    res.json({ success: true, similar: data });
  } catch (error) {
    console.error("Error in getSimilarTv Controller");
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "similar movies not found" })
        .send(null);
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getTvByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, category: data });
  } catch (error) {
    console.error("Error in getTvByCategory controller");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  getTrendingTv,
  getTvTrailers,
  getTvDetails,
  getSimilarTv,
  getTvByCategory,
};

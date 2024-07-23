import { User } from '../models/user.model.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';

const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: 'person',
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in searchPerson controller:', error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: 'person',
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error('Error in searchMovie controller:', error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: res.results[0].id,
          image: res.results[0].poster_path,
          title: res.results[0].name,
          searchType: 'tv',
          createdAt: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in searchTv controller:', error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.error('Error in get searchHIstory controller : ', error.message);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};

const deleteSearchItem = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id),
      {
        $pull: {
          searchHistory: { id: id },
        },
      };
    res
      .status(200)
      .json({ success: true, message: 'Item removed from search history' });
  } catch (error) {
    console.error('Error in deleteSearchitem controller : ', error.message);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};

export {
  searchMovie,
  searchPerson,
  searchTv,
  getSearchHistory,
  deleteSearchItem,
};

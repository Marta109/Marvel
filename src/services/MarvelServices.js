import {useHttp} from "../hooks/http.hook";

const useMarvelServices = () => {
  const {loading, error, request, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/",
    _apikey = "apikey=a4c83daddd16d8320882f8697640d04c",
    _baseOffsetCharacters = 210;

  const getAllCharacters = async (offset = _baseOffsetCharacters) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apikey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnailStyle: char.thumbnail.path.includes("image_not_available")
        ? true
        : false,
      // thumbnail: char.thumbnail.path.includes('image_not_available')?
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available ",
      description: comics.description || "There is no description",
      pages: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages ",
      // descriptionLanguage: comics.textObjects[0]language,
      descriptionLanguage: comics.textObjects[0]?.language || "en-us",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
  };
};

export default useMarvelServices;

// class MarvelServices {
//   _apiBase = "https://gateway.marvel.com:443/v1/public/";
//   _apikey = "apikey=a4c83daddd16d8320882f8697640d04c";
//   _baseOffsetCharacters = 210;

//   getResource = async (url) => {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//     }
//     return await res.json();
//   };

//   getAllCharacters = async (offset=this._baseOffsetCharacters) => {
//     const res = await this.getResource(
//       `${this._apiBase}characters?limit=9&offset=${offset}&${this._apikey}`
//     );
//     return res.data.results.map(this._transformCharacter);
//   };

//   getCharacter = async (id) => {
//     const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apikey}`);
//     return this._transformCharacter(res.data.results[0]);
//   };

//   _transformCharacter = (char) => {
//     return {
//       id: char.id,
//       name: char.name,
//       description: char.description
//         ? `${char.description.slice(0, 210)}...`
//         : "There is no description for this character",
//       thumbnailStyle: char.thumbnail.path.includes("image_not_available") ? true : false,
//       // thumbnail: char.thumbnail.path.includes('image_not_available')?
//       thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
//       homepage: char.urls[0].url,
//       wiki: char.urls[1].url,
//       comics: char.comics.items,
//     };
//   };
// }

// export default MarvelServices;

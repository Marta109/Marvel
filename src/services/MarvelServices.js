class MarvelServices {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apikey = "apikey=a4c83daddd16d8320882f8697640d04c";
  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Could not fetch ${url}, status: ${res.status}`
      );
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apikey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apikey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnailStyle: char.thumbnail.path.includes(
        "image_not_available"
      )
        ? true
        : false,
      // thumbnail: char.thumbnail.path.includes('image_not_available')?
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelServices;

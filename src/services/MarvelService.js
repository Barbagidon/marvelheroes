class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=8b75f1cbd7812e11499fba249c987f59";
  getData = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}. Error: ${res.status}`);
    }
    return await res.json();
  };

  getCharacters = async (url) => {
    const res = await this.getData(this._apiBase + url + "&" + this._apiKey);
    return this._transformCharacter(res);
  };

  getCharacter = async (id) => {
    const res = await this.getData(
      this._apiBase + "characters/" + id + "?" + this._apiKey
    );
    return this._transformCharacter(res);
  };

  _transformCharacter = (res) => {
    const char =
      res.data.results.length < 2 ? res.data.results[0] : res.data.results;
    if (char) {
      if (char.length > 4) {
        const chars = char.map((char) => {
          return {
            name: char.name,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            description: char.description,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
          };
        });
        return chars;
      } else {
        return {
          name: char.name,
          thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
          description: char.description,
          homepage: char.urls[0].url,
          wiki: char.urls[1].url,
          id: char.id,
          comics: char.comics.items,
        };
      }
    }
  };
}

export default MarvelService;

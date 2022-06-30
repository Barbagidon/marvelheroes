import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {
  const { loading, request, error, сlearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=8b75f1cbd7812e11499fba249c987f59";

  const getCharacters = async (url) => {
    const res = await request(_apiBase + url + "&" + _apiKey);
    return _transformCharacter(res);
  };

  const getCharacter = async (id) => {
    const res = await request(_apiBase + "characters/" + id + "?" + _apiKey);

    return _transformCharacter(res);
  };

  const getComics = async (url, num) => {
    const res = await request(
      _apiBase + `comics?issueNumber=${num}&` + url + "&" + _apiKey
    );
    return _transformComics(res);
  };

  const getComic = async (id) => {
    const res = await request(_apiBase + "comics/" + id + "?" + _apiKey);
    return _transformComics(res);
  };

  const _transformComics = (res) => {
    const result = res.data.results;

    const comicses = result.map((item) => {
      const origTitle = item.title;
      const indexDelete = origTitle.indexOf("#");
      const shortName =
        indexDelete > -1 ? origTitle.slice(0, indexDelete) : origTitle;
      return {
        id: item.id,
        description: item.description
          ? item.description
          : "Sorry, we dont have  description for this comic:(",
        pages: item.pageCount,
        title: shortName,
        url: item.urls[0].url,
        thumbnail: item.thumbnail.path + "." + item.thumbnail.extension,
        price:
          item.prices[0].price === 0
            ? "Out of stock"
            : item.prices[0].price + "$",
        language: item.textObjects.language || "en-us",
      };
    });

    return comicses;
  };

  const _transformCharacter = (res) => {
    if (res) {
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
    }
  };

  return {
    loading,
    error,
    getCharacters,
    getCharacter,
    сlearError,
    getComics,
    getComic,
  };
};

export default MarvelService;

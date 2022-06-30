import { useEffect } from "react";
import "./comicsList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import CreateContent from "../../hooks/createContent";
const ComicsList = () => {
  const { loading, getComics } = MarvelService();

  const {
    scroll,
    chars,
    firstLoading,
    getBottomWindow,
    getChars,
    getContentToScroll,
    loadingProcess,
  } = CreateContent([], 111, 10);

  useEffect(() => {
    getChars(getComics, "limit=8&offset=");
    window.addEventListener("scroll", getBottomWindow);
    return function () {
      window.removeEventListener("scroll", getBottomWindow);
    };
  }, []);

  useEffect(() => {
    if (scroll) {
      getContentToScroll(getComics, `limit=8&offset=`);
    }
  }, [scroll]);

  return (
    <div className="comics__list">
      <ul
        className="comics__grid"
        style={{
          gridTemplateColumns:
            loading && firstLoading ? "auto" : "repeat(auto-fill, 225px)",
          justifyContent: loading && firstLoading ? "center" : null,
        }}
      >
        {chars.map((item) => {
          const { title, thumbnail, price, id } = item;

          return (
            <li className="comics__item" key={id}>
              <Link to={`/comics/${id}`}>
                <img
                  src={thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      {loadingProcess ? (
        <Spinner></Spinner>
      ) : (
        <button
          className="button button__main button__long"
          onClick={() => getChars(getComics, "limit=8&offset=", 10)}
        >
          <div className="inner">load more</div>
        </button>
      )}
    </div>
  );
};

export default ComicsList;

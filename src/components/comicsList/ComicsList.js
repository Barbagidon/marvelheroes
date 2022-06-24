import { useState } from "react";
import "./comicsList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import Error from "../error/Error";
const ComicsList = () => {
  const { loading, error, getComics } = MarvelService();
  const [firstLoading, setFirstLoading] = useState(true);

  const [comicses, setComicses] = useState([]);

  const createComics = () => {
    getComics().then((res) => {
      setComicses(res);
    });
  };

  useState(() => {
    createComics();
  }, []);

  const spinner = loading && firstLoading ? <Spinner /> : null;
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
        {comicses.map((item) => {
          const { title, url, thumbnail, price, id } = item;

          return (
            <li className="comics__item" key={id}>
              <Link to={`/comics/${id}`}>
                <img
                  src={thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}$</div>
              </Link>
            </li>
          );
        })}
        {spinner}
      </ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;

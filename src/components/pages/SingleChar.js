import "./singleComicPage.scss";
import MarvelService from "../../services/MarvelService";
import { useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import CreateContent from "../../hooks/createContent";
import Spinner from "../spinner/Spinner";

const SingleComicPage = () => {
  const { name } = useParams();

  const { loading, getCharacter } = MarvelService();

  const { chars, firstLoading, updateChar } = CreateContent([]);

  useEffect(() => {
    updateChar(getCharacter, name);
    console.log(chars);
  }, []);

  const spinner = loading && firstLoading ? <Spinner /> : null;
  return (
    <div
      className="single-comic"
      style={{
        display: loading && firstLoading ? "block" : "grid",
      }}
    >
      {chars.map((item) => {
        console.log(item);
        return (
          <Fragment key={item.id}>
            <img
              src={item.thumbnail}
              alt="comics"
              className="single-comic__img"
            />
            <div className="single-comic__info">
              <h2 className="single-comic__name">{item.title}</h2>
              <p className="single-comic__descr">{item.description}</p>
              <p className="single-comic__descr">{item.pages} pages</p>
              <p className="single-comic__descr">Language: {item.language}</p>
              <div className="single-comic__price">{item.price}</div>
            </div>
          </Fragment>
        );
      })}
      {spinner}

      <Link
        to="/comics"
        href="#"
        className="single-comic__back"
        style={{ display: loading && firstLoading ? "none" : "inline" }}
      >
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;

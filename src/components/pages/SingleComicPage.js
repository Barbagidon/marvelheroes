import "./singleComicPage.scss";
import MarvelService from "../../services/MarvelService";
import { useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import CreateContent from "../../hooks/createContent";
import Spinner from "../spinner/Spinner";
import { Helmet } from "react-helmet";

const SingleComicPage = (createSingleChar) => {
  const { comicId } = useParams();
  const { name } = useParams();

  const { loading, getComic, getCharacter } = MarvelService();

  const { chars, firstLoading, getChars, updateChar } = CreateContent([]);

  const singleChar = Object.keys(createSingleChar).length;

  useEffect(() => {
    singleChar <= 0
      ? getChars(getComic, comicId)
      : updateChar(getCharacter, name);
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
        return (
          <Fragment key={item.id}>
            <Helmet>
              <meta
                name={
                  Object.keys(createSingleChar).length <= 0
                    ? "Comic page"
                    : "Character page"
                }
                content={item.title + "comic book" || item.name}
              />
              <title>{item.title || item.name}</title>
            </Helmet>
            <img
              src={item.thumbnail}
              alt="comic"
              className="single-comic__img"
            />
            <div className="single-comic__info">
              <h2 className="single-comic__name">{item.title}</h2>
              <p className="single-comic__descr">
                {item.description.length === 0
                  ? "Sorry, we dont have description for this char;("
                  : item.description}
              </p>

              {Object.keys(createSingleChar).length <= 0 ? (
                <>
                  <p className="single-comic__descr">{item.pages} pages</p>
                  <p className="single-comic__descr">
                    Language: {item.language}
                  </p>
                </>
              ) : null}

              <div className="single-comic__price">{item.price}</div>
            </div>
          </Fragment>
        );
      })}
      {spinner}

      <Link
        to={singleChar <= 0 ? "/comics" : "/"}
        href="#"
        className="single-comic__back"
        style={{ display: loading && firstLoading ? "none" : "inline" }}
      >
        Back to {singleChar <= 0 ? "all" : "main"}
      </Link>
    </div>
  );
};

export default SingleComicPage;

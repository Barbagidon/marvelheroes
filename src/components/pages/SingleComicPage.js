import "./singleComicPage.scss";
import MarvelService from "../../services/MarvelService";
import { useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import CreateContent from "../../hooks/createContent";
import Spinner from "../spinner/Spinner";

const SingleComicPage = () => {
  const { comicId } = useParams();

  const { loading, error, getComic } = MarvelService();

  const { chars, firstLoading, getChars } = CreateContent([]);

  useEffect(() => {
    getChars(getComic, comicId);
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
            <img
              src={item.thumbnail}
              alt="x-men"
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

// <img src={xMen} alt="x-men" className="single-comic__img" />
// <div className="single-comic__info">
//   <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
//   <p className="single-comic__descr">
//     Re-live the legendary first journey into the dystopian future of 2013
//     - where Sentinels stalk the Earth, and the X-Men are humanity's only
//     hope...until they die! Also featuring the first appearance of Alpha
//     Flight, the return of the Wendigo, the history of the X-Men from
//     Cyclops himself...and a demon for Christmas!?
//   </p>
//   <p className="single-comic__descr">144 pages</p>
//   <p className="single-comic__descr">Language: en-us</p>
//   <div className="single-comic__price">9.99$</div>
// </div>

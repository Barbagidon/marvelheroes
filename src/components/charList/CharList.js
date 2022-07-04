import { useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import MarvelService from "../../services/MarvelService";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CreateContent from "../../hooks/createContent";


const CharList = (props) => {
  const { loading, error, getCharacters } =
    MarvelService();
  const {
    scroll,
    chars,
    charEnded,
    firstLoading,
    getBottomWindow,
    getChars,
    getContentToScroll,
    loadingProcess,
  } = CreateContent([], 1245);
  const itemsRefs = useRef([]);

  const onFocus = (i) => {
    itemsRefs.current[i].className = "char__item char__item_selected";
  };

  const onBlur = (i) => {
    itemsRefs.current[i].className = "char__item";
  };

  useEffect(() => {
    getChars(getCharacters, `characters?limit=9&offset=`, 1);
    window.addEventListener("scroll", getBottomWindow);

    return function () {
      window.removeEventListener("scroll", getBottomWindow);
    };
  }, []);

  useEffect(() => {
    if (scroll) {
      getContentToScroll(getCharacters, `characters?limit=9&offset=`);
    }
  }, [scroll]);

  const errorMessage = error ? <Error /> : null;

  return (
    <div className="char__list">
      <TransitionGroup
        component={"ul"}
        className="char__grid"
        style={{
          gridTemplateColumns:
            loading && firstLoading ? "auto" : "repeat(3, 200px)",
        }}
      >
        {chars.map((item, i) => {
          const { name, thumbnail, id } = item;
          const notImage = thumbnail.indexOf("image_not_available.jpg");
          const shortName =
            name.length > 34 ? name.substr(0, 28) + "..." : name;

          return (
            <CSSTransition key={id} timeout={500} classNames="char__item">
              <li
                className="char__item"
                tabIndex={0}
                key={id}
                ref={(el) => (itemsRefs.current[i] = el)}
                onClick={() => props.getId(id)}
                onFocus={() => onFocus(i)}
                onBlur={() => onBlur(i)}
              >
                <img
                  src={thumbnail}
                  style={{ objectFit: notImage > 40 ? "fill" : "cover" }}
                  alt="hero"
                />
                <div className="char__name">{shortName}</div>
              </li>
            </CSSTransition>
          );
        })}
        {errorMessage}
      </TransitionGroup>
      {loadingProcess ? (
        <Spinner></Spinner>
      ) : (
        <button
          className="button button__main button__long"
          onClick={() =>
            getChars(getCharacters, `characters?limit=9&offset=`, 10)
          }
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      )}
    </div>
  );
};

export default CharList;

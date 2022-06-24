import { useState, useEffect, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CreateContent from "../../hooks/loadToScroll";

const CharList = (props) => {
  // const [chars, setChars] = useState([]);
  // const [num, setNum] = useState(1245);
  // const [scroll, setScroll] = useState(false);
  // const [charEnded, setcharEnded] = useState(false);
  // const [firstLoading, setFirstLoading] = useState(true);

  const { loading, error, getCharacters } = MarvelService();
  const {
 scroll,
 chars,
 num,
 charEnded,
 firstLoading,
 getBottomWindow,
 getChars,
 getContentToScroll,
setFirstLoading,
  } = CreateContent(1245);
  const itemsRefs = useRef([]);

  // const onCharLoaded = (chars) => {
  //   setChars(chars);
  //   setNum((num) => num + 10);
  // };

  const onFocus = (i) => {
    itemsRefs.current[i].className = "char__item char__item_selected";
  };

  const onBlur = (i) => {
    itemsRefs.current[i].className = "char__item";
  };

  // const getBottomWindow = () => {
  //   if (
  //     document.documentElement.scrollTop +
  //       document.documentElement.clientHeight >=
  //     document.documentElement.scrollHeight - 100
  //   ) {
  //     setScroll(true);
  //   }
  // };

  // const getChars = (i) => {
  //   if (i) {
  //     setNum((num) => num + i);
  //   }

  //   getCharacters(`characters?limit=9&offset=${num}`).then((charsList) => {
  //     if (!chars || chars.length < -1) {
  //       setcharEnded(true);
  //     } else {
  //       if (i) {
  //         const moreChars = chars.concat(charsList);
  //         onCharLoaded(() => moreChars);
  //       } else {
  //         onCharLoaded(() => charsList);
  //       }
  //     }
  //   });
  // };

  useEffect(() => {
    getChars(getCharacters, `characters?limit=9&offset=`);
    window.addEventListener("scroll", getBottomWindow);
    return function () {
      window.removeEventListener("scroll", getBottomWindow);
    };
  }, []);

  // useEffect(() => {
  //   if (chars.length > 9) {
  //     setFirstLoading(false);
  //   }
  // }, [chars]);

  // useEffect(() => {
  //   if (chars.length > 9) {
  //     setFirstLoading(false);
  //   }
  // }, [chars]);

  useEffect(() => {
    if (scroll) {
      getContentToScroll(getCharacters, `characters?limit=9&offset=`);

      // getCharacters(`characters?limit=9&offset=${num}`)
      //   .then((charsList) => {
      //     setFirstLoading(false);
      //     if (!charsList || charsList.length < 2) {
      //       charEnded(true);
      //     } else {
      //       const moreChars = chars.concat(charsList);
      //       onCharLoaded(moreChars);
      //     }
      //   })
      //   .finally(() => {
      //     // setScroll(false);
      //   });
    }
  }, [scroll]);

  const spinner = loading && firstLoading ? <Spinner /> : null;
  const errorMessage = error ? <Error /> : null;

  return (
    <div className="char__list">
      <ul
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
          );
        })}
        {spinner}
        {errorMessage}
      </ul>
      {
        <button
          className="button button__main button__long"
          onClick={() =>
            getChars(getCharacters, `characters?limit=9&offset=`, 10)
          }
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      }
    </div>
  );
};

export default CharList;

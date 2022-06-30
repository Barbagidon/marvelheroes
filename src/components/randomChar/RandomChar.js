import "./randomChar.scss";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import CreateContent from "../../hooks/createContent";

const RandomChar = () => {
  const [buttonOn] = useState(true);
  const { loading, error, getCharacter } = MarvelService();
  const { chars, updateChar, anim, setAnim } = CreateContent({});

  useEffect(() => {
    updateChar(getCharacter);
  }, []);

  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Spinner /> : null;
  const heroInfo = !(error || loading) ? (
    <View char={chars} anim={anim} setAnim={setAnim} />
  ) : null;

  return (
    <div className="randomchar">
      {errorMessage}

      {spinner}

      {heroInfo}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main "
          onClick={() => (buttonOn ? updateChar(getCharacter) : null)}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char, anim, setAnim }) => {
  console.log(anim);
  if (char) {
    const { name, thumbnail, description, homepage, wiki } = char;

    let notImage;
    if (thumbnail) {
      notImage = thumbnail.indexOf("image_not_available.jpg");
    }

    let about =
      !description && name
        ? "Sorry we dont have any information about this hero:("
        : description;
    if (about) {
      about =
        about.length > 174 && about ? about.substr(0, 174) + "..." : about;
    }

    return (
      <CSSTransition
        timeout={300}
        classNames="randomchar__block"
        onExited={() => setAnim(false)}
      >
        <div className={"randomchar__block"}>
          <img
            src={thumbnail}
            alt="Random character"
            className="randomchar__img"
            style={{ objectFit: notImage > 40 ? "contain" : "cover" }}
          />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{about}</p>
            <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  } else {
    return <Error />;
  }
};

export default RandomChar;

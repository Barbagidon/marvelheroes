import "./randomChar.scss";
import { useEffect, useState } from "react";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [buttonOn, setbuttonOn] = useState(true);

  const { loading, error, getCharacter } = MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
    setbuttonOn(true);
  };

  const buttonOff = () => {
    setbuttonOn(false);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    buttonOff();

    getCharacter(id).then((res) => {
      onCharLoaded(res);
    });
  };

  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Spinner /> : null;
  const heroInfo = !(error || loading) ? <View char={char} /> : null;

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
          onClick={() => (buttonOn ? updateChar() : null)}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
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
      <div className="randomchar__block">
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
    );
  } else {
    return <Error />;
  }
};

export default RandomChar;

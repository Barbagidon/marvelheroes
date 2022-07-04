import { useEffect, useState } from "react";
import "./charInfo.scss";

import MarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, process, setProcess } = MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
    setProcess("confirmed");
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return null;
    }

    getCharacter(charId).then((char) => {
      onCharLoaded(char);
    });
  };

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  const notImage = thumbnail.indexOf("image_not_available.jpg");

  const comicses =
    comics.length === 0 ? "Sorry we dont have comics with this hero;(" : null;

  let about =
    !description && name
      ? "Sorry we dont have any information about this hero:("
      : description;
  if (about) {
    about = about.length > 174 && about ? about.substr(0, 174) + "..." : about;
  }

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          style={{ objectFit: notImage > 40 ? "contain" : "cover" }}
          alt="abyss"
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{about}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicses}
        {comics.map((item, i) => {
          if (i < 10) {
            return (
              <li className="char__comics-item" key={i}>
                {item.name}
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default CharInfo;

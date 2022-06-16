import { Component } from "react";
import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelServices = new MarvelService();

  componentDidMount = () => {
    this.updateChar();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  };

  onCharOn = () => {
    this.setState({ loading: true });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return null;
    }

    

    this.onCharOn();

    this.marvelServices
      .getCharacter(charId)
      .then((char) => {
        this.onCharLoaded(char);
      })
      .catch(() => {
        this.onError();
      });
  };

  render() {
    const { char, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) && char ? <View char={char} /> : null;
    const errorMessage = error ? <Error /> : null;
    const skeleton = !(char || loading || error) ? <Skeleton /> : null;

    return (
      <div className="char__info">
        {spinner}
        {content}
        {errorMessage}
        {skeleton}
      </div>
    );
  }
}

export default CharInfo;

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

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

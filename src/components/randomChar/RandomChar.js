import "./randomChar.scss";
import { Component } from "react";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
    buttonOn: true,
  };

  

  marvelServices = new MarvelService();

  componentDidMount = () => {
    this.updateChar();
  };

  onCharOn = () => {
    this.setState({ loading: true });
  };
  
  onCharLoaded = (char) => {
    this.setState({ char, loading: false, buttonOn: true });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  buttonOff = () => {
    this.setState({
      buttonOn: false,
    });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharOn();
    this.buttonOff();

    this.marvelServices
      .getCharacter(id)
      .then((res) => {
        this.onCharLoaded(res);
      })
      .catch((e) => {
        this.onError();
      });
  };

  render() {
    const { char, loading, error, buttonOn } = this.state;
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
            onClick={() => (buttonOn ? this.updateChar() : null)}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki } = char;

  const notImage = thumbnail.indexOf("image_not_available.jpg");

  let about =
    !description && name
      ? "Sorry we dont have any information about this hero:("
      : description;
  if (about) {
    about = about.length > 174 && about ? about.substr(0, 174) + "..." : about;
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
};

export default RandomChar;

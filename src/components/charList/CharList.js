import { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CharListItem from "../charlist-item/CharlistItem";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    num: 1505,
    scroll: false,
    charEnded: false,
  };
  marvelServices = new MarvelService();

  onCharOn = () => {
    this.setState({ loading: true });
  };

  onCharLoaded = (chars) => {
    this.setState(({ num }) => ({
      chars,
      scroll: true,
      loading: false,
      num: num + 10,
    }));
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onScroll = () => {
    this.setState({ scroll: false });
  };

  createCardForScroll = (scroll) => {
    const { num } = this.state;

    this.marvelServices
      .getCharacters(`characters?limit=9&offset=${num}`)
      .then((chars) => {
        if (!chars || chars.length < 2) {
          this.setState(() => ({
            charEnded: true,
          }));
        } else {
          const moreChars = this.state.chars.concat(chars);
          this.onCharLoaded(moreChars);
        }
      });
  };

  getBottomWindow = () => {
    const { scroll } = this.state;
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1 &&
      scroll
    ) {
      this.createCardForScroll(scroll);
      this.onScroll();
    }
  };

  getChars = (i) => {
    if (i) {
      this.setState(() => ({
        num: num + i,
      }));
    }

    const { num } = this.state;

    this.marvelServices
      .getCharacters(`characters?limit=9&offset=${num}`)
      .then((chars) => {
        if (!chars || chars.length < 2) {
          this.setState(() => ({
            charEnded: true,
          }));
        }
        if (i) {
          const moreChars = this.state.chars.concat(chars);
          this.onCharLoaded(moreChars);
        } else {
          this.onCharOn();
          this.onCharLoaded(chars);
        }
      })
      .catch(() => {
        this.onError();
      });
  };

  createChars = (chars) => {
    const elements = chars.map((item) => {
      return (
        <CharListItem
          name={item.name}
          thumbnail={item.thumbnail}
          key={item.id}
          getId={() => this.props.getId(item.id)}
        />
      );
    });

    return elements;
  };

  componentDidMount = () => {
    console.log(this.state.scroll);
    this.getChars();
    window.addEventListener("scroll", this.getBottomWindow);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.getBottomWindow);
  };

  render() {
    const { chars, loading, error, charEnded } = this.state;

    const items = this.createChars(chars);

    const spinner = loading ? <Spinner /> : null;
    const elements = !loading ? items : null;
    const errorMessage = error ? <Error /> : null;

    return (
      <div className="char__list">
        <ul
          className="char__grid"
          style={{ gridTemplateColumns: loading ? "auto" : "repeat(3, 200px)" }}
        >
          {spinner}
          {elements}
          {errorMessage}
        </ul>
        {
          <button
            className="button button__main button__long"
            onClick={() => this.getChars(10)}
            style={{ display: charEnded ? "none" : "block" }}
          >
            <div className="inner">load more</div>
          </button>
        }
      </div>
    );
  }
}

export default CharList;

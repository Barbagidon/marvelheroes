import React, { Component } from "react";

class CharListItem extends Component {
  constructor(props) {
    super();
    this.myRef = React.createRef();
  }

  onFocus = () => {
    this.myRef.current.className = "char__item char__item_selected";
  };

  onBlur = () => {
    this.myRef.current.className = "char__item";
  };

  render() {
    const { name, thumbnail } = this.props;
    const shortName = name.length > 34 ? name.substr(0, 28) + "..." : name;

    const notImage = thumbnail.indexOf("image_not_available.jpg");
    return (
      <li
        ref={this.myRef}
        className="char__item"
        onClick={this.props.getId}
        tabIndex={0}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <img
          src={thumbnail}
          style={{ objectFit: notImage > 40 ? "fill" : "cover" }}
          alt="hero"
        />
        <div className="char__name">{shortName}</div>
      </li>
    );
  }
}

export default CharListItem;

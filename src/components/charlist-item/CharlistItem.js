import { Component } from "react";

class CharListItem extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { name, thumbnail} = this.props;
    const shortName = name.length > 34 ? name.substr(0, 28) + "..." : name;

    const notImage = thumbnail.indexOf("image_not_available.jpg");
    return (
      <li className="char__item" onClick={this.props.getId}>
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

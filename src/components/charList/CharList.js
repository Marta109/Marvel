import React, {Component} from "react";
import PropTypes from "prop-types";

import MarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charData: [],
      load: true,
      error: false,
      newItemLoading: false,
      offset: 210,
      charEnded: false,
    };
  }

  marvelService = new MarvelServices();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoading = () => {
    this.setState({newItemLoading: true});
  };

  onCharLoaded = (newCharData) => {
    let endChar = false;
    if (newCharData.length < 9) {
      endChar = true;
    }
    this.setState(({offset, charData}) => ({
      charData: [...charData, ...newCharData],
      load: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: endChar,
    }));
    // this.setState({charData, load: false, newItemLoading: false});
  };
  onError = () => {
    this.setState({error: true, load: false});
  };

  onCreateCharList = (data) => {
    let onselectChar = this.props.onSelectChar;
    return data.map((item) => {
      let imgStyle = {objectFit: "cover"};
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = {objectFit: "unset"};
      }
      return (
        <li
          key={item.id}
          className="char__item"
          onClick={() => {
            onselectChar(item.id);
          }}>
          <img src={item.thumbnail} alt="abyss" style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
  };
  render() {
    const {charData, load, error, offset, newItemLoading, charEnded} =
      this.state;
    const charListItems = this.onCreateCharList(charData);
    const spinner = load ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const charList = !(spinner || errorMessage) ? charListItems : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        <ul className="char__grid">{charList}</ul>
        <button
          className="button button__main button__long"
          style={{display: charEnded ? "none" : "block"}}
          disabled={newItemLoading}
          onClick={() => {
            this.onRequest(offset);
          }}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onSelectChar: PropTypes.func
};
export default CharList;

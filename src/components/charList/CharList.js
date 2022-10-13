import React, {Component} from "react";
import MarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {charData: [], load: true, error: false};
  }

  componentDidMount() {
    const marvelService = new MarvelServices();
    marvelService
      .getAllCharacters()
      .then(this.onCharLoading)
      .catch(this.onError);
  }

  onCharLoading = (charData) => {
    this.setState({charData, load: false});
  };
  onError = () => {
    this.setState({error: true, load: false});
  };

  onCreateCharList = (data) => {
    return data.map((item) => {
      const clazz = item.thumbnail ? {objectFit: "contain"} : null;
      return (
        <li key={item.id} className="char__item">
          <img src={item.thumbnail} alt="abyss" style={clazz} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
  };
  render() {
    const {charData, load, error} = this.state;
    const charListItems = this.onCreateCharList(charData);
    const spinner = load ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const charList = !(spinner || errorMessage)
      ? charListItems
      : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        <ul className="char__grid">{charList}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
export default CharList;

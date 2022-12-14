import "./randomChar.scss";
// import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";
import React from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

class RandomChar extends React.Component {
  state = {
    char: {},
    loding: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }
  onCharLoadid = (char) => {
    this.setState({char, loding: false});
  };

  onError = () => {
    this.setState({loding: false, error: true});
  };
  updateChar = () => {
    const randomChar = new MarvelServices();
    const randomId = Math.floor(
      Math.random() * (1011400 - 1011000) + 1011000
    );
    randomChar
      .getCharacter(randomId)
      .then(this.onCharLoadid)
      .catch(this.onError);
  };
  //    randomChar.getRandomCharacter()

  newRandomChar = () => {
    this.setState({error: false, loding: true});
    this.updateChar();
  };

  render() {
    const {char, loding, error} = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loding ? <Spinner /> : null;
    const content = !(loding || error) ? <View char={char} /> : null;
    // if (error) {
    //   return <ErrorMessage />;
    // }

    return (
      <div className="randomchar">
        {/* {loding ? <Spinner /> : <View char={char} />} */}
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main"
            onClick={this.newRandomChar}>
            <div className="inner">try it</div>
          </button>
          <img
            src={mjolnir}
            alt="mjolnir"
            className="randomchar__decoration"
          />
        </div>
      </div>
    );
  }
}

export default RandomChar;

function View({char}) {
  const {
    name,
    description,
    thumbnail,
    wiki,
    homepage,
    thumbnailStyle,
  } = char;

  const clazz = thumbnailStyle ? {objectFit: "contain"} : null;
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={clazz}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
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
}

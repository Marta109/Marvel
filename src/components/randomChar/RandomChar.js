import "./randomChar.scss";
// import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";
import React, {useEffect, useState} from "react";
import useMarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const {loading, error, getCharacter, clearError} = useMarvelServices();
  // const [loding, setLoding] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    updateChar();
    clearError();
    const timerId = setInterval(updateChar, 60000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharLoadid = (char) => {
    setChar(char);
    // setLoding(false);
  };

  // const onCharLoading = () => {
  //   setLoding(true);
  // };

  // const onError = () => {
  //   setLoding(false);
  //   setError(true);
  // };

  const updateChar = () => {
    // const randomChar = new MarvelServices();

    const randomId = Math.floor(
      Math.random() * (1011400 - 1011000) + 1011000
    );
    // onCharLoading();
    // randomChar.getCharacter(randomId).then(onCharLoadid).catch(onError);
    getCharacter(randomId).then(onCharLoadid);
  };

  const newRandomChar = () => {
    // setError(false);
    // setLoding(true);
    updateChar();
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
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
        <button className="button button__main" onClick={newRandomChar}>
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
};

export default RandomChar;

// class RandomChar extends React.Component {
//   state = {
//     char: {},
//     loding: true,
//     error: false,
//   };

//   componentDidMount() {
//     this.updateChar();
//   }
//   onCharLoadid = (char) => {
//     this.setState({char, loding: false});
//   };

//   onCharLoading = () => {
//     this.setState({loding: true});
//   };

//   onError = () => {
//     this.setState({loding: false, error: true});
//   };
//   updateChar = () => {
//     const randomChar = new MarvelServices();
//     const randomId = Math.floor(
//       Math.random() * (1011400 - 1011000) + 1011000
//     );
//     this.onCharLoading();
//     randomChar
//       .getCharacter(randomId)
//       .then(this.onCharLoadid)
//       .catch(this.onError);
//   };
//   //    randomChar.getRandomCharacter()

//   newRandomChar = () => {
//     this.setState({error: false, loding: true});
//     this.updateChar();
//   };

//   render() {
//     const {char, loding, error} = this.state;
//     const errorMessage = error ? <ErrorMessage /> : null;
//     const spinner = loding ? <Spinner /> : null;
//     const content = !(loding || error) ? <View char={char} /> : null;
//     // if (error) {
//     //   return <ErrorMessage />;
//     // }

//     return (
//       <div className="randomchar">
//         {/* {loding ? <Spinner /> : <View char={char} />} */}
//         {errorMessage}
//         {spinner}
//         {content}
//         <div className="randomchar__static">
//           <p className="randomchar__title">
//             Random character for today!
//             <br />
//             Do you want to get to know him better?
//           </p>
//           <p className="randomchar__title">Or choose another one</p>
//           <button
//             className="button button__main"
//             onClick={this.newRandomChar}>
//             <div className="inner">try it</div>
//           </button>
//           <img
//             src={mjolnir}
//             alt="mjolnir"
//             className="randomchar__decoration"
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default RandomChar;

function View({char}) {
  const {name, description, thumbnail, wiki, homepage} = char;
  let imgStyle = {objectFit: "cover"};
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = {objectFit: "contain"};
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
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

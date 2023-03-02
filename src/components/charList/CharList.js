import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

import useMarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";

const CharList = (props) => {
  const [charData, setCharData] = useState([]);
  // const [load, setLoad] = useState(true);
  // const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const {loading, error, getAllCharacters} = useMarvelServices();

  const charsRefArr = useRef([]);
  // const marvelService = new MarvelServices();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset, inital) => {
    inital ? setNewItemLoading(false) : setNewItemLoading(true);
    // onCharLoading();
    getAllCharacters(offset).then(onCharLoaded);
  };

  // const onCharLoading = () => {
  //   setNewItemLoading(true);
  // };

  const onCharLoaded = (newCharData) => {
    let endChar = false;
    if (newCharData.length < 9) {
      endChar = true;
    }
    setCharData((charData) => [...charData, ...newCharData]);
    // setLoad(false);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(endChar);
  };

  // const onError = () => {
  //   setError(true);
  //   setLoad(false);
  // };

  const onSetFocus = (id) => {
    charsRefArr.current.forEach((el) =>
      el.classList.remove("char__item_selected")
    );
    charsRefArr.current[id].classList.add("char__item_selected");
    charsRefArr.current[id].focus();
  };

  const onCreateCharList = (data) => {
    let onselectChar = props.onSelectChar;
    return data.map((item, i) => {
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
          ref={(elRef) => (charsRefArr.current[i] = elRef)}
          onClick={() => {
            onselectChar(item.id);
            onSetFocus(i);
          }}>
          <img src={item.thumbnail} alt="abyss" style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
  };

  const charListItems = onCreateCharList(charData);
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  // const charList = !(loading || errorMessage) ? charListItems : null;

  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      <ul className="char__grid">{charListItems}</ul>
      <button
        className="button button__main button__long"
        style={{display: charEnded ? "none" : "block"}}
        disabled={newItemLoading}
        onClick={() => {
          onRequest(offset);
        }}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onSelectChar: PropTypes.func,
};
export default CharList;

// class CharList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       charData: [],
//       load: true,
//       error: false,
//       newItemLoading: false,
//       offset: 210,
//       charEnded: false,
//     };
//   }

//   charsRefArr = [];
//   marvelService = new MarvelServices();

//   componentDidMount() {
//     this.onRequest();
//   }

//   onRequest = (offset) => {
//     this.onCharLoading();
//     this.marvelService
//       .getAllCharacters(offset)
//       .then(this.onCharLoaded)
//       .catch(this.onError);
//   };

//   onCharLoading = () => {
//     this.setState({newItemLoading: true});
//   };

//   onCharLoaded = (newCharData) => {
//     let endChar = false;
//     if (newCharData.length < 9) {
//       endChar = true;
//     }
//     this.setState(({offset, charData}) => ({
//       charData: [...charData, ...newCharData],
//       load: false,
//       newItemLoading: false,
//       offset: offset + 9,
//       charEnded: endChar,
//     }));
//     // this.setState({charData, load: false, newItemLoading: false});
//   };
//   onError = () => {
//     this.setState({error: true, load: false});
//   };

//   onSetRef = (ref) => {
//     if (ref) {
//       this.charsRefArr.push(ref);
//     }
//   };

//   onSetFocus = (id) => {
//     this.charsRefArr.forEach((el) =>
//       el.classList.remove("char__item_selected")
//     );
//     this.charsRefArr[id].classList.add("char__item_selected");
//     this.charsRefArr[id].focus();
//   };

//   onCreateCharList = (data) => {
//     let onselectChar = this.props.onSelectChar;
//     return data.map((item, i) => {
//       let imgStyle = {objectFit: "cover"};
//       if (
//         item.thumbnail ===
//         "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
//       ) {
//         imgStyle = {objectFit: "unset"};
//       }
//       return (
//         <li
//           key={item.id}
//           className="char__item"
//           ref={this.onSetRef}
//           onClick={() => {
//             onselectChar(item.id);
//             this.onSetFocus(i);
//           }}>
//           <img src={item.thumbnail} alt="abyss" style={imgStyle} />
//           <div className="char__name">{item.name}</div>
//         </li>
//       );
//     });
//   };
//   render() {
//     const {charData, load, error, offset, newItemLoading, charEnded} =
//       this.state;
//     const charListItems = this.onCreateCharList(charData);
//     const spinner = load ? <Spinner /> : null;
//     const errorMessage = error ? <ErrorMessage /> : null;
//     const charList = !(spinner || errorMessage) ? charListItems : null;

//     return (
//       <div className="char__list">
//         {spinner}
//         {errorMessage}
//         <ul className="char__grid">{charList}</ul>
//         <button
//           className="button button__main button__long"
//           style={{display: charEnded ? "none" : "block"}}
//           disabled={newItemLoading}
//           onClick={() => {
//             this.onRequest(offset);
//           }}>
//           <div className="inner">load more</div>
//         </button>
//       </div>
//     );
//   }
// }

// CharList.propTypes = {
//   onSelectChar: PropTypes.func,
// };
// export default CharList;

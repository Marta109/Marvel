import "./comicsList.scss";
// import uw from "../../resources/img/UW.png";
// import xMen from "../../resources/img/x-men.png";
import useMarvelServices from "../../services/MarvelServices";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import {Link} from "react-router-dom";

const ComicsList = () => {
  const [comicsData, setComicsData] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const {loading, error, getAllComics} = useMarvelServices();

  useEffect(() => {
    onRequest(offset, true);
  }, []);
  const onRequest = (offset, inital) => {
    inital ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComicsData) => {
    let endComics = false;
    if (newComicsData.length < 8) {
      endComics = true;
    }
    setComicsData((comicsData) => [...comicsData, ...newComicsData]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(endComics);
  };

  const onCreateComicsList = (data) => {
    return data.map((item, i) => {
      return (
        <li  className="comics__item"key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}$</div>
          </Link>
        </li>
      );
    });
  };
  const comicsListItems = onCreateComicsList(comicsData);
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      <ul className="comics__grid">{comicsListItems}</ul>
      <button
        className="button button__main button__long"
        style={{display: comicsEnded ? "none" : "block"}}
        disabled={newItemLoading}
        onClick={() => {
          onRequest(offset);
        }}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;

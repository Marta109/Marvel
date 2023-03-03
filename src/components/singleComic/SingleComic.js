import "./singleComic.scss";
// import xMen from "../../resources/img/x-men.png";
import {useEffect, useState} from "react";
import useMarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

const SingleComic = (props) => {
  const [comics, setComics] = useState(null);
  const {loading, error, getComics, clearError} = useMarvelServices();

  useEffect(() => {
    updateComics();
  }, [props.comicsId]);

  const updateComics = () => {
    clearError();
    const {comicsId} = props;
    if (!comicsId) {
      return;
    }

    getComics(comicsId).then(onComicsLoaded);
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comics) ? (
    <View comics={comics} />
  ) : null;

  return (
    <div className="single-comic">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({comics}) => {
  const {
    title,
    thumbnail,
    price,
    description,
    pages,
    descriptionLanguage,
  } = comics;

  return (
    <>
      <img src={thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pages} pages</p>
        <p className="single-comic__descr">Language: {descriptionLanguage}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComic;

import "./singleComicPage.scss";
import {useEffect, useState} from "react";
import useMarvelServices from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import {Link, useParams} from "react-router-dom";

const SingleComicPage = () => {
  const [comic, setComic] = useState(null);
  const {loading, error, getComics, clearError} = useMarvelServices();
  const {comicId} = useParams();

  useEffect(() => {
    updateComics();
  }, [comicId]);

  const updateComics = () => {
    clearError();
    getComics(comicId).then(onComicsLoaded);
  };

  const onComicsLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? (
    <View comic={comic} />
  ) : null;

  return (
    <div className="single-comic">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({comic}) => {
  const {
    title,
    thumbnail,
    price,
    description,
    pages,
    descriptionLanguage,
  } = comic;

  return (
    <>
      <img src={thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pages} </p>
        <p className="single-comic__descr">
          Language: {descriptionLanguage}
        </p>
        <div className="single-comic__price">{price} </div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComicPage;

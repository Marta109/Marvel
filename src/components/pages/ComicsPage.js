import {useState} from "react";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const ComicsPage = () => {
  const [selectdComicsId, setSelectdComicsId] = useState(null);
  const onSelectComics = (id) => {
    setSelectdComicsId(id);
  };

  return (
    <>
      <AppBanner />
      <ComicsList onSelectComics={onSelectComics} />
      <SingleComic comicsId={selectdComicsId} />
    </>
  );
};

export default ComicsPage;

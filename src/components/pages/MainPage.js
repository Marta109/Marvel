import {useState} from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectdCharId, setSelectdCharId] = useState(null);

  const onSelectChar = (id) => {
    setSelectdCharId(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onSelectChar={onSelectChar} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectdCharId} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;

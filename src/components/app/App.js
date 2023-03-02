import React, {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";
const App = () => {
  const [selectdCharId, setSelectdCharId] = useState(null);
  const [selectdComicsId, setSelectdComicsId] = useState(null);

  const onSelectChar = (id) => {
    setSelectdCharId(id);
  };
  const onSelectComics = (id) => {
    setSelectdComicsId(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
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
        <AppBanner />
        <ComicsList onSelectComics={onSelectComics}/>
        <SingleComic comicsId={selectdComicsId} />
      </main>
    </div>
  );
};

export default App;

// class App extends React.Component {
//   state = {
//     selectdCharId: null,
//   };

//   onSelectChar = (id) => {
//     this.setState({selectdCharId: id});
//   };
//   render() {
//     return (
//       <div className="app">
//         <AppHeader />
//         <main>
//           <ErrorBoundary>
//             <RandomChar />
//           </ErrorBoundary>
//           <div className="char__content">
//             <ErrorBoundary>
//               <CharList onSelectChar={this.onSelectChar} />
//             </ErrorBoundary>
//             <ErrorBoundary>
//               <CharInfo charId={this.state.selectdCharId} />
//             </ErrorBoundary>
//           </div>
//           <img className="bg-decoration" src={decoration} alt="vision" />
//         </main>
//       </div>
//     );
//   }
// }

// export default App;

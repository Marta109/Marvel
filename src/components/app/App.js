import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../pages/ComicsPage";
import MainPage from "../pages/MainPage";
import Page404 from "../pages/Page404.js";
import SingleComicPage from "../pages/SingleComicPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/MARVEL" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route
              path="/comics/:comicId"
              element={<SingleComicPage />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
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

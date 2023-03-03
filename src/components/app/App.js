import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../pages/ComicsPage";
import MainPage from "../pages/MainPage";
   
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/MARVEL">
              <MainPage />
            </Route>
            <Route exact path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
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

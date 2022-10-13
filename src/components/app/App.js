import React from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";

class App extends React.Component {
  state = {
    selectdCharId: null,
  };

  onSelectChar = (id) => {
    this.setState({selectdCharId: id});
  };
  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onSelectChar={this.onSelectChar} />
            <CharInfo charId={this.state.selectdCharId} />
          </div>
          <img
            className="bg-decoration"
            src={decoration}
            alt="vision"
          />
        </main>
      </div>
    );
  }
}

export default App;

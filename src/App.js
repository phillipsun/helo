import React, { Component } from "react";

import Nav from "./component/Nav/Nav";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {routes}
      </div>
    );
  }
}

export default App;

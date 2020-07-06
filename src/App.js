import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Faq from "./pages/Faq";
import Home from "./pages/Home";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Switch>
                      <Route exact path="/faq" component={Faq} />
                      <Route exact path="/home" component={Home} />
                  </Switch>
              </div>
          </BrowserRouter>

      </div>
  );
}

export default App;

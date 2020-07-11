import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Blogpost from "./container/pages/BlogPost/Blogpost";
import About from "./container/pages/About/About";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Blogpost} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faTable } from '@fortawesome/free-solid-svg-icons'
import Convert from './Convert';
//import Rates from './Rates';
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <div className="background">
        <nav className="navbar navbar-expand-md navbar-dark pt-5">
          <div className="container pb-3 container-navbar">
            <Link className="navbar-brand" to="/">
              <h2>Currency Exchange</h2>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item mx-3">
                  <Link className="nav-link d-flex px-4 active" to="/convert/">
                    <span><FontAwesomeIcon icon={faExchangeAlt} size="lg" /></span>
                    <h5 className="mb-0 mx-2">Convert</h5>
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link d-flex" to="/rates/">
                  <span><FontAwesomeIcon icon={faTable} size="lg" /></span>
                    <h5 className="mb-0 mx-2">Rates</h5>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Switch>
        <Route path="/" exact component={Convert} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
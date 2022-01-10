import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faTable } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Layout = (props) => {
  return (
    // A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.
    <React.Fragment>
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
        <div className="container content py-5">
          {props.children}
        </div>
        <footer className="container p-3">
          <div className="d-flex justify-content-center">
            <span className="mx-3 text-white">© 2022 Iti Armpalu. All rights reserved.</span>
            <div>
              <Link href="https://github.com/iti-armpalu" className="link-light mx-2" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} size="lg" /></Link>
              <Link href="https://www.linkedin.com/in/itiarmpalu/" className="link-light mx-2" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} size="lg" /></Link>
              <Link href="https://www.instagram.com/itiarmpalu/" className="link-light mx-2" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="lg" /></Link>
            </div>
        </div>
        </footer>
      </div>
    </React.Fragment>
  )
}

export default Layout;
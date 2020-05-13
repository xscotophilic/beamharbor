import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <header>
                <div className="ui container">
                    <Link to="/" className="logo">StreamTV</Link>
                    <input id="nav" type="checkbox" />
                    <label htmlFor="nav"></label>
                    <nav>
                        <ul>
                            <li><Link to="/">ALL STREAMS</Link></li>
                            <li><Link to="/">SIGN IN WITH GOOGLE</Link></li>
                            <li><a href="https://xscotophilic.ml/">MY PORTFOLIO</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;
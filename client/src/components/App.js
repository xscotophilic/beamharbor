import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import StreamCreate from './Streams/StreamCreate';
import StreamDelete from './Streams/StreamDelete';
import StreamEdit from './Streams/StreamEdit';
import StreamList from './Streams/StreamList';
import StreamShow from './Streams/StreamShow';
import history from '../history';

class App extends Component {
    render() {
        return (
            <div style={{ background: '#FFFFFF' }}>
                <Router history={history}>
                    <div>
                        <Navbar />
                        <Route path='/' exact component={StreamList} />
                        <Route path='/streams/new' exact component={StreamCreate} />
                        <Route path='/streams/edit/:id' exact component={StreamEdit} />
                        <Route path='/streams/delete/:id' exact component={StreamDelete} />
                        <Route path='/streams/show' exact component={StreamShow} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import StreamCreate from './Streams/StreamCreate';
import StreamDelete from './Streams/StreamDelete';
import StreamEdit from './Streams/StreamEdit';
import StreamList from './Streams/StreamList';
import StreamShow from './Streams/StreamShow';

class App extends Component {
    render() {
        return (
            <div style={{ background: '#FFFFFF' }}>
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div>
                        <Navbar />
                        <Routes>
                            <Route path='/' element={<StreamList />} />
                            <Route path='/streams/new' element={<StreamCreate />} />
                            <Route path='/streams/edit/:id' element={<StreamEdit />} />
                            <Route path='/streams/delete/:id' element={<StreamDelete />} />
                            <Route path='/streams/:id' element={<StreamShow />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

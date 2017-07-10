import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom'
import history from './client/history';

import App from './client/App';

ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={App} />
    </Router>,
    document.getElementById('root')
);


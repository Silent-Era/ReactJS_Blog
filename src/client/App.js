import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import HomePage from './components/Home'
import TestComponent from './components/TestComponent'
import TestComponent2 from './components/TestComponent2'
import PageNotFound from './components/PageNotFound'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
            <Route exact path ='/' component={ HomePage } />
            <Route exact path ='/test' component={ TestComponent }/>
            <Route exact path ='/test/:id' component={ TestComponent2 } />
            <Route path='*' component={ PageNotFound } />
          </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Header from './Components/layout/Header';
import Question from './Components/Question';

import './App.css';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Question />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

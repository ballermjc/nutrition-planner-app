import React, { Component } from 'react';
import BMR from './components/BMRComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1 className="Title">Nutrition Planner</h1>
        <div className="MainArea">
          <BMR />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import BMR from './components/BMRComponent';
import Macros from './components/MacrosComponent';
import Planner from './components/PlannerComponent';
import Title from './components/TitleComponent';
import BMRTitle from './components/BMRTitle';
import './App.css';
import MacrosTitle from './components/MacrosTitle';
import PlannerTitle from './components/PlannerTitle';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bmr: null,
      proteinMacroG: 0,
      fatMacroG: 0,
      carbMacroG: 0
    };
  }

  changeBMR(calculatedBMR) {
    this.setState({ bmr: calculatedBMR });
  }

  changeMacros(proteinG, fatG, carbG) {
    this.setState({
      proteinMacroG: proteinG,
      fatMacroG: fatG,
      carbMacroG: carbG
    })
  }

  render() {
    return (
      <div className="App">
      <Title />
      
        <div className="MainArea">
          <BMRTitle />
          <BMR bmr={this.state.bmr} changeBMR={this.changeBMR.bind(this)}/>
          <MacrosTitle/>
          <Macros bmr={this.state.bmr} changeMacros={this.changeMacros.bind(this)}/>
          <PlannerTitle/>
          <Planner proteinG={this.state.proteinMacroG} fatG={this.state.fatMacroG} carbG={this.state.carbMacroG}/>
        </div>
      </div>
    );
  }
}

export default App;

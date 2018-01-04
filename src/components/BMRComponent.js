import React, { Component } from 'react';
import axios from 'axios';

export default class BMR extends Component {
    constructor(){
        super();
        this.state = {
            feet: null,
            inches: null,
            weight: null,
            gender: '',
            age: null,
            bmr: null,
            activityLevels: [],
            chosenActivityLevel: null
        };
    }

    handleChange(event) {
        console.log(event.target.value);
        const category = event.target.name;
        const val = event.target.value;
        this.setState({
            [category]: val
        });
        console.log(this.state);
    }

    calculateBMR() {
        let weight = this.state.weight;
        let multiplier = this.state.chosenActivityLevel;
        let bmr = Math.round(24*.925*multiplier*weight/2.2);
        this.setState({
            bmr: bmr
        });
        console.log(this.state);
    }

    handleClick(event) {
        event.preventDefault();
        this.calculateBMR();
        
        
    }

    
    view() {
        axios.get(`/api/activityLevels`)
        .then( res => {
            let data = res.data;
            this.setState({
                activityLevels: data
            });
        })
        .catch(err => console.log(err));
    }

    

    render(){


        const activityLevels = this.state.activityLevels.map( level => {
            return (
              <div key={ level.id } className="ActivityLevelPanel">
                <input value={level.multiplier} type="radio" name="chosenActivityLevel" required onChange={ event => this.handleChange(event) }/>
                <label htmlFor="chosenActivityLevel">Name: { level.name }</label>
                <br/>
                <label htmlFor="chosenActivityLevel">{ level.description }</label>
              </div> 
            )
          });

        return (
            <div className="bmr-container">
            <h1>BMR Component Works</h1>
            <form> 
                <input required type="number" value={ this.state.feet } id="feet" name="feet" min="4" max="7" onChange={ event => this.handleChange(event) }/>
                <label htmlFor="feet">Feet</label>
                <input required type="number" value={ this.state.inches } id="inches" name="inches" min="0" max="11" onChange={ event => this.handleChange(event) }/>
                <label htmlFor="feet">Inches</label>
                <br/><br/>
                <input required type="number" value={ this.state.weight } id="weight" name="weight" min="100" max="400" onChange={ event => this.handleChange(event) }/>
                <label htmlFor="weight">lbs</label>
                <br/><br/>
                <input required type="number" value={ this.state.age } id="age" name="age" min="16" max="100" onChange={ event => this.handleChange(event) }/>
                <label htmlFor="age">years</label>
                <br/><br/>
                <input type="radio" value="female" name="gender" required id="female" onChange={ event => this.handleChange(event) }/>
                <label htmlFor="female">Female</label>
                <input type="radio" value="male" name="gender" required id="male" onChange={ event => this.handleChange(event) }/>
                <label htmlFor="male">Male</label>
                <h3>Choose your current activity level:</h3>
                { activityLevels }
                <br/><br/>
                <button type="button" onClick={ (event) => this.handleClick(event) }>Continue</button>
            </form>
            <p>{ this.state.bmr } Calories</p>
            <h1>{ this.view() }</h1>
            
            
            </div>
        );

        
    }
}
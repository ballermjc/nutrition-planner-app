import React, { Component } from 'react';
import axios from 'axios';

export default class BMR extends Component {
    constructor(){
        super();
        this.state = {
            feet: null,
            inches: null,
            weight: null,
            gender: 'female',
            age: null,
            bmr: null
        };
    }

    handleChange(event) {
        console.log("NAME", event.target.name);
        console.log("VALUE", event.target.value);
        const category = event.target.name;
        const val = event.target.value;
        this.setState({
            [category]: val
        });
        console.log(this.state);

    }

    calculateBMR() {
        let weight = this.state.weight;
        let bmr = 24*.925*weight/2.2;
        console.log(bmr);
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
        axios.get('https://activitylevels-ballermjc.c9users.io/api/activityLevels')
        .then( res => {
            console.log(res);
            let data = res;
            return data;
        })
        .catch(err => console.log(err));
    }

    

    render(){
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
                <input type="radio" value="female" name="gender" id="female" checked onChange={ event => this.handleChange(event) }/>
                <label htmlFor="female">Female</label>
                <input type="radio" value="male" name="gender" id="male" onChange={ event => this.handleChange(event) }/>
                <label htmlFor="male">Male</label>
                <br/><br/>
                <button type="button" onClick={ (event) => this.handleClick(event) }>Continue</button>
            </form>
            <p>{ this.state.bmr }</p>
            <h1>{ this.view() }</h1>
            </div>
        );
    }
}
import React, { Component } from 'react';
import axios from 'axios';

export default class Macros extends Component {
    constructor() {
        super();
        this.state = {
            nutritionPlans: [],
            chosenNutritionPlanID: null,
            proteinMacro: null,
            fatMacro: null,
            carbMacro: null
        }
    }

    handleChange(event) {
        const category = event.target.name;
        const val = event.target.value;
        this.setState({
            [category]: val,
            proteinMacro: this.state.nutritionPlans[val].proteinMacro,
            fatMacro: this.state.nutritionPlans[val].fatMacro,
            carbMacro: this.state.nutritionPlans[val].carbMacro
        });
        console.log(this.state);
    }


    viewNutritionPlans() {
        axios.get(`/api/nutritionPlans`)
        .then( res => {
            let data = res.data;
            this.setState({
                nutritionPlans: data
            });
        })
        .catch(err => console.log(err));
    }

    

    handlePlanClick(event) {
        let proteinG = Math.round(this.props.bmr * this.state.proteinMacro / 4);
        let fatG = Math.round(this.props.bmr * this.state.fatMacro / 9);
        let carbG = Math.round(this.props.bmr * this.state.carbMacro / 4);
        this.setState({
            proteinMacroPct: Math.round(100*this.state.proteinMacro),
            proteinMacroG: proteinG,
            fatMacroPct: Math.round(100*this.state.fatMacro),
            fatMacroG: fatG,
            carbMacroPct: Math.round(100*this.state.carbMacro),
            carbMacroG: carbG
        });
        this.props.changeMacros(proteinG, fatG, carbG);
    }

    render(){
        const nutritionPlans = this.state.nutritionPlans.map( plan => {
            return (
              <div key={ plan.id } className="NutritionPlanPanel">
                <input value={plan.id} type="radio" name="chosenNutritionPlanID" required onChange={ event => this.handleChange(event) }/>
                <label htmlFor="chosenNutritionPlanID">Name: { plan.name }</label>
                <br/>
                <label htmlFor="chosenNutritionPlanID">{ plan.description }</label>
              </div> 
            )
          });

        return(
            <div>
                <h1>Calculate Your Macronutrient Daily Values</h1>
                <form>
                    { nutritionPlans }
                    <button type="button" onClick={ (event) => this.handlePlanClick(event) }>Use This Plan</button>
                </form>
                
                <p>{ this.viewNutritionPlans() }</p>
                <h3>Protein Macros: {this.state.proteinMacroPct}% = {this.state.proteinMacroG}g Protein per day</h3>
                <h3>Fat Macros: {this.state.fatMacroPct}% = {this.state.fatMacroG}g Fat per day</h3>
                <h3>Carb Macros: {this.state.carbMacroPct}% = {this.state.carbMacroG}g Carbs per day</h3>
            </div>
        );
    }
}
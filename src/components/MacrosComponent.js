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
                <h1>Macros Component</h1>
                <form>
                    { nutritionPlans }
                    <button type="button">Continue</button>
                </form>
                
                <p>{ this.viewNutritionPlans() }</p>
                <h3>Protein Macros: {Math.round(100*this.state.proteinMacro)}</h3>
                <h3>Fat Macros: {Math.round(100*this.state.fatMacro)}</h3>
                <h3>Carb Macros: {Math.round(100*this.state.carbMacro)}</h3>
            </div>
        );
    }
}
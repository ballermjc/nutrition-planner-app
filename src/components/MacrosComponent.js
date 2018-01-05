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
        console.log(event.target.value);
        const category = event.target.name;
        const val = event.target.value;
        this.setState({
            [category]: val
        });
        console.log(this.state.nutritionPlans[this.state.chosenNutritionPlanID].proteinMacro);
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
                { nutritionPlans }
                <p>{ this.viewNutritionPlans() }</p>
            </div>
        );
    }
}
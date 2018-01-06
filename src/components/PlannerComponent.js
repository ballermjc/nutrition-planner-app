import React, { Component } from 'react';
import axios from 'axios';

// const apiKey = "W5PdSvq8YbX3tRojzzzTTs2lcPRTLf795ZG90lIN";
const apiKey = "DEMO_KEY";

export default class Planner extends Component {
    constructor() {
        super();
        this.state = {
            foodName: '',
            foodID: null,
            possibleFoods: [],
            chosenFood: '',
            chosenFoods: []
        };
    }

    handleChange(event) {
        console.log(event.target.value);
        const category = event.target.name;
        const val = event.target.value;
        this.setState({
            [category]: val
        });
    }

    handleFoodsClick(event) {
        this.listFoods();
    }

    handleRadioChange(event) {
        const category = event.target.name;
        const val = event.target.value;
        this.setState({
            [category]: val
        });
    }
    
    handleChosenFoodClick(event) {
        this.getMacros();
    }

    listFoods(){
        let foodName = encodeURI(this.state.foodName);
        let possibleFoods = [];
        axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${foodName}&sort=n&max=5&offset=0&api_key=${apiKey}`)
        .then( res => {
            // console.log(res);
            // console.log(res.data);
            possibleFoods.push(
                {
                    id:0,
                    name: res.data.list.item[0].name || '',
                    possibleFoodID: res.data.list.item[0].ndbno || ''
                },
                {
                    id:1,
                    name: res.data.list.item[1].name || '',
                    possibleFoodID: res.data.list.item[1].ndbno || ''
                },
                {
                    id:2,
                    name: res.data.list.item[2].name || '',
                    possibleFoodID: res.data.list.item[2].ndbno || ''
                },
                {
                    id: 3,
                    name: res.data.list.item[3].name || '',
                    possibleFoodID: res.data.list.item[3].ndbno || ''
                },
                {
                    id: 4,
                    name: res.data.list.item[4].name || '',
                    possibleFoodID: res.data.list.item[4].ndbno || ''
                }
            );
            this.setState({
                possibleFoods: possibleFoods
            });
        })
        .catch(err => console.log(err));
    }

    getMacros(){
        let servingSize = '';
        let protein = null;
        let fat = null;
        let carb = null;
        let quantity = null;
        let chosenFoods = this.state.chosenFoods;
        let chosenFoodName = '';
        axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${this.state.chosenFood}&type=f&format=json&api_key=${apiKey}`)
        .then( res => {
            servingSize = res.data.foods[0].food.nutrients[1].measures[0].label;
            protein = res.data.foods[0].food.nutrients[1].measures[0].value;
            fat = res.data.foods[0].food.nutrients[2].measures[0].value;
            carb = res.data.foods[0].food.nutrients[3].measures[0].value;
            quantity = res.data.foods[0].food.nutrients[1].measures[0].qty;
            chosenFoodName = res.data.foods[0].food.desc.name;
            
            chosenFoods.push(
                {
                    name: chosenFoodName,
                    quantity: quantity,
                    servingSize: servingSize,
                    protein: protein,
                    fat: fat,
                    carb: carb                    
                }
            );
            this.setState({ chosenFoods: chosenFoods });
            this.setState({ possibleFoods: []});
        })
        .catch(err => console.log(err));
    }

    render() {
        let proteinArr = [0];
        this.state.chosenFoods.forEach( food => {
            proteinArr.push(Number(food.protein));
        });
        let protein = proteinArr.reduce( (prev, curr) => prev + curr);

        let fatArr = [0];
        this.state.chosenFoods.forEach( food => {
            fatArr.push(Number(food.fat));
        });
        let fat = fatArr.reduce( (prev, curr) => prev + curr);

        let carbArr = [0];
        this.state.chosenFoods.forEach( food => {
            carbArr.push(Number(food.carb));
        });
        let carb = carbArr.reduce( (prev, curr) => prev + curr);

        const possibleFoods = this.state.possibleFoods.map( possibleFood => {
            return (
              <div key={ possibleFood.id } className="NutritionPlanPanel">
                <input value={possibleFood.possibleFoodID} type="radio" name="chosenFood" onClick={ event => this.handleRadioChange(event) } />
                <label htmlFor="chosenNutritionPlanID">Name: { possibleFood.name }</label>
                <br/>
                <button type="button" onClick={ (event) => this.handleChosenFoodClick(event) }>Add Food to Planner</button>
              </div> 
              
            )
          });

          const chosenFoods = this.state.chosenFoods.map( chosenFood => {
            return (
              <div key={ chosenFood.id } className="NutritionPlanPanel">
              <table>
                  <tr>
                    <td><h3>{ chosenFood.name }</h3></td>
                  </tr>

                  <tr>
                    <td><h4>Serving Size: { chosenFood.quantity } { chosenFood.servingSize }</h4></td>
                    <td><h4>{ chosenFood.protein }g Protein</h4></td>
                    <td><h4>{ chosenFood.fat }g Fat</h4></td>
                    <td><h4>{ chosenFood.carb }g Carb</h4></td>
                  </tr>
              </table>             
                <br/>
              </div> 
            )
          });

        return(
            <div>
                <h1>Track Your Diet</h1>
                <br/>
                <input type="text" name="foodName" placeholder="Search for a food" onChange={ event => this.handleChange(event) }/>
                <button type="button" onClick={ (event) => this.handleFoodsClick(event) }>Search</button>
                <br/>
                {possibleFoods}
                <br/>
                <br/>
                {chosenFoods}
                <br/>
                <br/>
                <h3>Totals</h3>
                <h4>Protein: {protein}g</h4>
                <h4>Fat: {fat}g</h4>
                <h4>Carbs: {carb}g</h4>
                <h4>Calories: {4*protein+4*carb+9*fat}</h4>
                <br/>
                <h3>Remaining</h3>
                <h4>Protein: {this.props.proteinG - protein}g</h4>
                <h4>Fat: {this.props.fatG - fat}g</h4>
                <h4>Carbs: {this.props.carbG - carb}g</h4>
                <h4>Calories: {4*(this.props.proteinG - protein)+4*(this.props.carbG - carb)+9*(this.props.fatG - fat)}</h4>
            </div>
        )
    }
}
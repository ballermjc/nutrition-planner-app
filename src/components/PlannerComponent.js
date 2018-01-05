import React, { Component } from 'react';
import axios from 'axios';

export default class Planner extends Component {
    constructor() {
        super();
        this.state = {
            foodName: '',
            foodID: null
        };
    }

    handleChange(event) {
        const category = event.target.name;
        const val = event.target.value;
        this.setState({
            [category]: val
        });
        this.listFoods();
        this.getMacros();
        console.log(this.state);
    }

    listFoods(){
        axios.get('https://api.nal.usda.gov/ndb/search/?format=json&q=kerrygold%20butter&sort=n&max=5&offset=0&api_key=W5PdSvq8YbX3tRojzzzTTs2lcPRTLf795ZG90lIN')
        .then( res => {
            // console.log(res);
            // console.log(res.data);
            // console.log(res.data.list.item[0].name);
        })
        .catch(err => console.log(err));
    }

    getMacros(){
        axios.get('https://api.nal.usda.gov/ndb/V2/reports?ndbno=45067050&type=f&format=json&api_key=W5PdSvq8YbX3tRojzzzTTs2lcPRTLf795ZG90lIN')
        .then( res => {
            console.log(res);
            console.log(res.data);
            console.log('Unit',res.data.foods[0].food.nutrients[1].measures[0].label);
            console.log('Quantity',res.data.foods[0].food.nutrients[1].measures[0].qty);
            console.log('Protein Macro',res.data.foods[0].food.nutrients[1].measures[0].value);
            console.log('Unit',res.data.foods[0].food.nutrients[2].measures[0].label);
            console.log('Quantity',res.data.foods[0].food.nutrients[2].measures[0].qty);
            console.log('Fat Macro',res.data.foods[0].food.nutrients[2].measures[0].value);
            console.log('Unit',res.data.foods[0].food.nutrients[3].measures[0].label);
            console.log('Quantity',res.data.foods[0].food.nutrients[3].measures[0].qty);
            console.log('Carb Macro', res.data.foods[0].food.nutrients[3].measures[0].value);


        })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div>Planner Component Works!!!
            <input type="text" name="foodName" placeholder="Search for a food" onChange={ event => this.handleChange(event) }/>
            </div>
        )
    }
}
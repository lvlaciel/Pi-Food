import React, { Component } from "react";
import { getRecipeById, clearDetails } from "../../actions";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import  Loading  from "../Loading/Loading.jsx"
import "./RecipeDetails.css"


class RecipeDetails extends Component{
    
    
    componentDidMount(){
       
        const id = this.props.match.params.id;
        
        this.props.getRecipeById(id);
        console.log(id)
    };
    /*
    imagen(image)-> SI
    nombre(name)-> SI
    tipo de plato(dishTypes)-> SI
    tipos de dietas(dietTypes)-> SI
    resumen del plato(summary)-> SI
    nivel de comida saludable(healthScore)-> SI
    paso a paso(steps-step)-> SI
    */
   componentWillUnmount(){

    this.props.clearDetails()

   }
   
    render(){
        
        return(
            <div className="GeneralDiv">
                <Link to="/home">
                    <button className="btnBackToHome"> Back To Home </button>
                </Link>
               {this.props.recipeDetails.name?
                <div className="RecipeDetails">
                    Details of the recipes:
                    
                    <h1>Name of recipe: </h1>
                    <h2>{this.props.recipeDetails.name} </h2>
                    <img src={this.props.recipeDetails.image} alt="Error" />
                    <h2>Dish types:</h2>
                    {this.props.recipeDetails.dishType?.map(el => {
                        return (
                            <li>{el}</li>)
                    })}
                    <h2>Diet types:</h2>
                    {this.props.recipeDetails.dietTypes?.map(el=> <li>{el.name ? el.name : el}</li>)}

                    <h2>Summary:</h2>
                    {<p>{this.props.recipeDetails?.summary?.replace(/<[^>]*>/g, '')}</p>}
                    <h2>Health score:{this.props.recipeDetails.healthScore}</h2>
                    <div>
                    <h2>Recipe steps:</h2>
                    {
                            typeof this.props.recipeDetails.steps !== "string" ?
                                 this.props.recipeDetails.steps?.map(el => {
                                    return (
                                        <li> {el.step} </li>
                                    )
                                }) : <li> {this.props.recipeDetails.steps} </li>
                    }
                    </div>
                    
                </div>
                   : <Loading/>}
            </div>
        )
    };

};

function mapStateToProps(state) {
    return {
        recipeDetails : state.recipeDetails
    };

  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getRecipeById: id => dispatch(getRecipeById(id)),
        clearDetails: () => dispatch(clearDetails()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
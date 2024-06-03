import React from "react";
import { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import './PotencialCompetiences.css'
import { Link } from "react-router-dom";

const PotencialCompetiences=()=>{

    return(
        <div className="survey-containers">
            <Navbar/>
            <div className="data-titles">
                    <button className="botons">
                       <Link to='/administrar-preguntas'>
                       Regresar
                       </Link>
                    </button>
                </div>
            <div className="top-containers">
                
                <h1>
                    Potential Competencies
                    <br></br>
                    Central Office
                </h1>
            </div>

            <div className="survey-type">
                <div className="evaluation-titles">
                    <h2>Behaviors Evaluation</h2>
                </div>
                <div className="categories">
                    <h2>Categories</h2>
                </div>
            </div>

            <div className="questions-lists">
                <div className="inform">
                <p>High potential is characterized by effective leadership ability,
                    combining clear direction, inspiration to achieve ambitious goals,
                    adaptability in a changing environment, commitment to the cause, and 
                    alignment of efforts toward a common purpose.
                </p>
                </div>
                <div className="categories2">
                    <label>Leadership</label>
                </div>
            </div>

            <div className="questions-lists">
                <div className="inform">
                <p>High potential extends the ability to take on roles of greater responsability
                    effectively, demonstrating fundamental skills and exceptional characteristics
                    necessary for success in leadership roles.
                </p>
                </div>
                <div className="categories2">
                    <label>Capacity</label>
                </div>
                
            </div>

            <div className="questions-lists">
                <div className="inform">
                <p>Emotional intelligence refers to how a person behaves in emotional and social 
                    situations, incluiding the ability to recognize and manage one's own and others
                    emotions, regulate emotional responses, maintain motivation, and establish effective
                    relationships.
                </p>
                </div>
                <div className="categories2">
                    <label>Emotional Intelligence</label>
                </div>
                
            </div>

        </div>

    );
};

export default PotencialCompetiences;
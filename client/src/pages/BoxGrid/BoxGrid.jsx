import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionContainer from "../../components/QuestionContainer/QuestionContainer";
import "./BoxGrid.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
const BoxGrid = () =>{
    const items = [
        "UNREALIZED TALENT",
        "UP AND COMING TALENT",
        "TOP TALENT",
        "UNCONFIRMED TALENT",
        "CORE TALENT",
        "FUTURE STAR",
        "UNDER PERFORMER",
        "CONSISTENT PERFORMER",
        "TECHNICAL EXPERT",
    ];
    
    return(
    <div className="box-grid-container">
        <Navbar/>
        <h2><b>9 Box Grid</b></h2>
        <div className="performances-grid">
            {items.map((item, index) =>(
                <div key ={index} className="grids-item">
                    {item}
                </div>
            ))}
        </div>
    </div>
    );
};

export default BoxGrid;
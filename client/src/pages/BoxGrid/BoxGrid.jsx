import React from "react";
import "./BoxGrid.css"
import Navbar from "../../components/Navbar/Navbar";
import { Nav } from "react-bootstrap";

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

    <div className="box-container">
        <Navbar/>

        <div className="performance-grid">
            {items.map((item, index) =>(
                <div key ={index} className="grid-item">
                    {item}
                    </div>
            ))}
        </div>
    </div>
}
import React from 'react'
import "./Card.css"

const Card = (props) => {
    const styling= {
        "width": 84,
        "height": 84
    };

  return (
    <div className="flex">
        {/* <img src={props.src} alt={props.alt_text} style={styling} /> */}

        <h3> {props.title} </h3>

        <h3> {props.value} {props.unit} </h3>
    </div>
  )
}

export default Card
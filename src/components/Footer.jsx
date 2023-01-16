import React from 'react';
import Github from "../images/github.svg";
import Linkedin from "../images/linkedin.svg";
import Instagram from "../images/instagram.svg";
import Mail from "../images/envelope-regular.svg";
import "./Footer.css";


const Footer = () => {
    const styling={
        "width": "24px",
        "height": "24px"
    };

  return (
    <div className="footer">
        <a title="Anmol on Linkedin" href="https://www.linkedin.com/in/anmol-pal/" target="_blank"><img src={Linkedin} style={styling}/></a>

        <a title="Anmol on Github" href="https://www.github/com/anmol111pal/" target="_blank"><img src={Github} style={styling}/></a>

        <a title="Anmol on Instagram" href="https://www.instagram.com/_anmolpal_" target="_blank"><img src={Instagram} style={styling}/></a>

        <a title="Mail Anmol" href="mailto:anmol111pal@gmail.com" target="_blank"><img src={Mail} style={styling}/></a>

    </div>
  )
}

export default Footer
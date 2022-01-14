import React from 'react';
import "./Image.css"
import image from "./library.jpg"
const Image = (props) => {
        return (
            <div class="images"><img src = {"images/" + props.image} className="image" />
            <div className="overlay_text"><div className="text">ABOUT</div></div></div>
        );
}
export default Image;
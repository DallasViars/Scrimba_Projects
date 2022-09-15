import React from "react";
import ReactDOM from "react-dom";
import Intro from "/Intro"
import About from "/About"
import Footer from "/Footer"
const root = document.getElementById("root");
function App() {
    return (
        <div className="container">
            <img src="./Me-Cropped.jpg" alt="One of my favorite selfies" />
            <div className="body">
                <Intro />
                <About />
                <Footer />
            </div>
        </div>
    )
}
ReactDOM.render(<App />, root);
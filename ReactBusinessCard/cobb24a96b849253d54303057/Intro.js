import React from "react"
export default function Intro() {
    return (
        <div className="section section__intro">
            <h1>Dallas Viars</h1>
            <p className="section__intro--title">Frontend Developer</p>
            <a href="" className="section__intro--website">fakeurl.com</a>
            <div>
                <button className="btn btn-email"><i className="fa-solid fa-envelope"></i> Email</button>
                <button className="btn btn-linkedin"><i className="fa-brands fa-linkedin"></i>LinkedIn</button>
            </div>
        </div>
    )
};
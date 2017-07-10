/**
 * Created by kylem on 6/27/2017.
 */

import React from "react";

export default class Footer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h3>Contact Information</h3>
                <h4>
                    Created By: Kyle Miller
                    &nbsp;&nbsp;
                    <a href="https://github.com/kcnklub"><img id="gitLink" src="../images/Octocat.png"/></a>
                    &nbsp;&nbsp;
                    <a href="https://www.linkedin.com/in/kyle-miller-08876666/"><img src="../images/Logo-2C-34px-TM.png"/></a>
                    &nbsp;&nbsp;
                </h4>
            </div>
        );
    }
};


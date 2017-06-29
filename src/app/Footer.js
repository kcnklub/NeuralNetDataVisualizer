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
                <h3>{this.props.test}</h3>
            </div>
        );
    }
};


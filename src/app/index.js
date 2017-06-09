import React from "react";
import { render } from "react-dom";

class Test extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                {tanh(0.534, true)}
            </div>
        );
    }
}

render(<Test />, document.getElementById("test"));
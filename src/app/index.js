import React from "react";
import { render } from "react-dom";

import Footer from "./Footer";
import NeuralNet from "./NeuralNet";

import "../css/mainPage.css"

class Graph extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div id="Layer" className="col-md-3">
                    <h4>Input Layer</h4>
                    <br />
                    <br />
                    <div>{this.props.inputLayer[0]}</div>
                    <br />
                    <div>{this.props.inputLayer[1]}</div>
                    <br />
                    <div>{this.props.inputLayer[2]}</div>
                </div>
                <div id="Layer" className="col-md-4">
                    <h4>Hidden Layer</h4>
                    <br />
                    <div>{this.props.hiddenLayer[0]}</div>
                    <br />
                    <div>{this.props.hiddenLayer[1]}</div>
                    <br />
                    <div>{this.props.hiddenLayer[2]}</div>
                    <br />
                    <div>{this.props.hiddenLayer[3]}</div>
                </div>
                <div id="Layer" className="col-md-3">
                    <h4>Output Layer</h4>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>{this.props.outputLayer[0]}</div>
                </div>
                <div className="col-md-1"></div>
            </div>
        )
    }
}

class Visualizer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h2 id="NetHeader">The Neural Network</h2>
                <div className="row">
                    <div id="NetHeader"  className="col-md-6">
                        <h3>Controls</h3>
                        <button id="controlButton">Step</button>
                        <button id="controlButton">Run</button>
                        <button id="controlButton">Stop</button>
                    </div>

                    <div id="NetHeader" className="col-md-6">
                        <h3>Activation Functions</h3>
                        <button id="controlButton">sigmoid</button>
                        <button id="controlButton">tanh</button>
                        <button id="controlButton">reLU</button>
                    </div>
                    <Graph inputLayer={TestNetwork.inputLayer} hiddenLayer={TestNetwork.hiddenLayer} outputLayer={TestNetwork.outputLayer}/>
                </div>

            </div>
        );
    }
}

render(<Visualizer />, document.getElementById("Visualizer"));
render(<Footer test="this is the test" />, document.getElementById("Footer"));

////////////////////////////////////////////////////////////////////////////////////////
// testing neural network.

let input = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
];

let output = [
    [0],
    [0],
    [1],
    [1]
]

var TestNetwork = new NeuralNet(input, 0, output);
TestNetwork.train();



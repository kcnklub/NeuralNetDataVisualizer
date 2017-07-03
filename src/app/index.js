import React from "react";
import { render } from "react-dom";

import Footer from "./Footer";
import NeuralNet from "./NeuralNet";

import "../css/mainPage.css"


class Graph extends React.Component {
    constructor (props) {
        super(props);

        this.input = [
            [0, 0, 1],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ];
        this.output = [
            [0],
            [0],
            [1],
            [1]
        ];
        this.neuralNetwork = new NeuralNet(this.input, 0, this.output);
    }
    render() {
        return (

            <div className="row">
                <button id="runButton">cool guy</button>
                <div className="col-md-2"></div>
                <div id="Layer" className="col-md-1">
                    <h4>Input Layer</h4>
                    <br />
                    <br />
                    <div>{this.neuralNetwork.inputLayer[0][0]}, {this.neuralNetwork.inputLayer[0][1]}, {this.neuralNetwork.inputLayer[0][2]}</div>
                    <br />
                    <div>{this.neuralNetwork.inputLayer[1][0]}, {this.neuralNetwork.inputLayer[1][1]}, {this.neuralNetwork.inputLayer[1][2]}</div>
                    <br />
                    <div>{this.neuralNetwork.inputLayer[2][0]}, {this.neuralNetwork.inputLayer[2][1]}, {this.neuralNetwork.inputLayer[2][2]}</div>
                    <br />
                    <div>{this.neuralNetwork.inputLayer[3][0]}, {this.neuralNetwork.inputLayer[3][1]}, {this.neuralNetwork.inputLayer[3][2]}</div>
                </div>
                <div id="Layer" className="col-md-2">
                    <h4>syn0</h4>
                    <br /><br /><br />
                    <div>{this.neuralNetwork.syn0[0][0].toFixed(3)}, {this.neuralNetwork.syn0[0][1].toFixed(3)}, {this.neuralNetwork.syn0[0][2].toFixed(3)}, {this.neuralNetwork.syn0[0][3].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.syn0[1][0].toFixed(3)}, {this.neuralNetwork.syn0[1][1].toFixed(3)}, {this.neuralNetwork.syn0[1][2].toFixed(3)}, {this.neuralNetwork.syn0[1][3].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.syn0[2][0].toFixed(3)}, {this.neuralNetwork.syn0[2][1].toFixed(3)}, {this.neuralNetwork.syn0[2][2].toFixed(3)}, {this.neuralNetwork.syn0[2][3].toFixed(3)}</div>
                </div>
                <div id="Layer" className="col-md-2">
                    <h4>Hidden Layer</h4>
                    <br /><br />
                    <div>{this.neuralNetwork.hiddenLayer[0][0].toFixed(3)}, {this.neuralNetwork.hiddenLayer[0][1].toFixed(3)}, {this.neuralNetwork.hiddenLayer[0][2].toFixed(3)}, {this.neuralNetwork.hiddenLayer[0][3].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.hiddenLayer[1][0].toFixed(3)}, {this.neuralNetwork.hiddenLayer[1][1].toFixed(3)}, {this.neuralNetwork.hiddenLayer[1][2].toFixed(3)}, {this.neuralNetwork.hiddenLayer[1][3].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.hiddenLayer[2][0].toFixed(3)}, {this.neuralNetwork.hiddenLayer[2][1].toFixed(3)}, {this.neuralNetwork.hiddenLayer[2][2].toFixed(3)}, {this.neuralNetwork.hiddenLayer[2][3].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.hiddenLayer[3][0].toFixed(3)}, {this.neuralNetwork.hiddenLayer[3][1].toFixed(3)}, {this.neuralNetwork.hiddenLayer[3][2].toFixed(3)}, {this.neuralNetwork.hiddenLayer[3][3].toFixed(3)}</div>
                </div>
                <div id="Layer" className="col-md-1">
                    <h4>syn1</h4>
                    <br /><br />
                    <div>{this.neuralNetwork.syn1[0][0].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.syn1[1][0].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.syn1[2][0].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.syn1[3][0].toFixed(3)}</div>
                </div>
                <div id="Layer" className="col-md-1">
                    <h4>Output Layer</h4>
                    <br /><br />
                    <div>{this.neuralNetwork.outputLayer[0][0].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.outputLayer[1][0].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.outputLayer[2][0].toFixed(3)}</div>
                    <br />
                    <div>{this.neuralNetwork.outputLayer[3][0].toFixed(3)}</div>
                </div>
                <div id="Layer" className="col-md-1">
                    <h4>Expected Output</h4>
                    <br />
                    <div>0</div>
                    <br />
                    <div>0</div>
                    <br />
                    <div>1</div>
                    <br />
                    <div>1</div>
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
                    <Graph
                    />
                </div>

            </div>
        );
    }
}

render(<Visualizer />, document.getElementById("Visualizer"));
render(<Footer test="this is the test" />, document.getElementById("Footer"));
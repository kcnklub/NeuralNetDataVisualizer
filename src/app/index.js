import React from "react";
import { render } from "react-dom";

import Footer from "./Footer";
import NeuralNet from "./NeuralNet";

import "../css/mainPage.css"

class Visualizer extends React.Component {
    constructor(props){
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
        this.state = {
            hiddenLayer: this.neuralNetwork.hiddenLayer,
            syn0: this.neuralNetwork.syn0,
            syn1: this.neuralNetwork.syn1,
            outputLayer: this.neuralNetwork.outputLayer,
            error: [[0],[0],[0],[0]],
            delta: [[0],[0],[0],[0]],
            stepInProcess: 0,
            actImage: "Sigmoid",
            actFunction: 0
        }
    }

    runNet(){
        this.neuralNetwork.train(500);
        this.setState({hiddenLayer: this.neuralNetwork.hiddenLayer});
        this.setState({syn0: this.neuralNetwork.syn0});
        this.setState({syn1: this.neuralNetwork.syn1});
        this.setState({outputLayer: this.neuralNetwork.outputLayer});
        this.setState({error: this.neuralNetwork.l2_error});
        this.setState({delta: this.neuralNetwork.l2_delta});
    }

    handleActivationChange(x){
        this.handleReset(x);
        this.setState({actFunction: x});
        if(x === 0){
            this.setState({actImage: "Sigmoid"});
        } else if (x === 1) {
            this.setState({actImage: "tanh"});
        }
    }

    handleStepingThruNetwork(){
        if(this.state.stepInProcess === 0){
            this.neuralNetwork.feedForward();
            this.setState({hiddenLayer: this.neuralNetwork.hiddenLayer});
            this.setState({outputLayer: this.neuralNetwork.outputLayer});
            this.setState({stepInProcess: 1});
        } else if( this.state.stepInProcess === 1){
            this.neuralNetwork.calcError();
            this.setState({stepInProcess: 2});
            this.setState({error: this.neuralNetwork.l2_error});
            this.setState({delta: this.neuralNetwork.l2_delta});
        } else {
            this.neuralNetwork.updateWeights();
            this.setState({syn0: this.neuralNetwork.syn0});
            this.setState({syn1: this.neuralNetwork.syn1});
            this.setState({stepInProcess: 0});
        }
    }

    handleReset(x){
        delete this.neuralNetwork;
        this.neuralNetwork = new NeuralNet(this.input, x, this.output);
        this.setState({hiddenLayer: this.neuralNetwork.hiddenLayer});
        this.setState({syn0: this.neuralNetwork.syn0});
        this.setState({syn1: this.neuralNetwork.syn1});
        this.setState({outputLayer: this.neuralNetwork.outputLayer});
        this.setState({error: [[0],[0],[0],[0]]});
        this.setState({stepInProcess: 0});
        this.setState({delta: [[0],[0],[0],[0]]});
    }

    render(){
        return (
            <div>
                <h2 id="NetHeader">The Neural Network</h2>
                <div className="row">
                    <div id="NetHeader"  className="col-md-4">
                        <h3>Controls</h3>
                        <button id="controlButton" onClick={ () => this.handleStepingThruNetwork()}>Step</button>
                        <button id="controlButton" onClick={ () => this.runNet()}>Run</button>
                        <button id="controlButton" onClick={ () => this.handleReset(this.state.actFunction)}>Reset</button>
                    </div>

                    <div className="col-md-4">
                        <h3 id="imageContent">Current Activation Function</h3>
                        <p id="imageContent"><b>{this.state.actImage}</b></p>
                        <img id="actImage" src={"../images/" + this.state.actImage + ".png"} />
                    </div>

                    <div id="NetHeader" className="col-md-4">
                        <h3>Activation Functions</h3>
                        <button id="controlButton" onClick={() => this.handleActivationChange(0)} >sigmoid</button>
                        <button id="controlButton" onClick={() => this.handleActivationChange(1)} >tanh</button>
                    </div>
                </div>

                    <div className="row">
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
                            <div>{this.state.syn0[0][0].toFixed(3)}, {this.state.syn0[0][1].toFixed(3)}, {this.state.syn0[0][2].toFixed(3)}, {this.state.syn0[0][3].toFixed(3)}</div>
                            <br />
                            <div>{this.state.syn0[1][0].toFixed(3)}, {this.state.syn0[1][1].toFixed(3)}, {this.state.syn0[1][2].toFixed(3)}, {this.state.syn0[1][3].toFixed(3)}</div>
                            <br />
                            <div>{this.state.syn0[2][0].toFixed(3)}, {this.state.syn0[2][1].toFixed(3)}, {this.state.syn0[2][2].toFixed(3)}, {this.state.syn0[2][3].toFixed(3)}</div>
                        </div>
                        <div id="Layer" className="col-md-2">
                            <h4>Hidden Layer</h4>
                            <br /><br />
                            <div>{this.state.hiddenLayer[0][0].toFixed(3)}, {this.state.hiddenLayer[0][1].toFixed(3)}, {this.state.hiddenLayer[0][2].toFixed(3)}, {this.state.hiddenLayer[0][3].toFixed(3)}</div>
                            <br />
                            <div>{this.state.hiddenLayer[1][0].toFixed(3)}, {this.state.hiddenLayer[1][1].toFixed(3)}, {this.state.hiddenLayer[1][2].toFixed(3)}, {this.state.hiddenLayer[1][3].toFixed(3)}</div>
                            <br />
                            <div>{this.state.hiddenLayer[2][0].toFixed(3)}, {this.state.hiddenLayer[2][1].toFixed(3)}, {this.state.hiddenLayer[2][2].toFixed(3)}, {this.state.hiddenLayer[2][3].toFixed(3)}</div>
                            <br />
                            <div>{this.state.hiddenLayer[3][0].toFixed(3)}, {this.state.hiddenLayer[3][1].toFixed(3)}, {this.state.hiddenLayer[3][2].toFixed(3)}, {this.state.hiddenLayer[3][3].toFixed(3)}</div>
                        </div>
                        <div id="Layer" className="col-md-1">
                            <h4>syn1</h4>
                            <br /><br />
                            <div>{this.state.syn1[0][0].toFixed(3)}</div>
                            <br />
                            <div>{this.state.syn1[1][0].toFixed(3)}</div>
                            <br />
                            <div>{this.state.syn1[2][0].toFixed(3)}</div>
                            <br />
                            <div>{this.state.syn1[3][0].toFixed(3)}</div>
                        </div>
                        <div id="Layer" className="col-md-1">
                            <h4>Output Layer</h4>
                            <br /><br />
                            <div>{this.state.outputLayer[0][0].toFixed(3)}</div>
                            <br />
                            <div>{this.state.outputLayer[1][0].toFixed(3)}</div>
                            <br />
                            <div>{this.state.outputLayer[2][0].toFixed(3)}</div>
                            <br />
                            <div>{this.state.outputLayer[3][0].toFixed(3)}</div>
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
                    <div id="errorRow" className="row">
                        <h4>Error</h4>
                        <div>{Math.abs((this.state.error[0][0] * 100)).toFixed(3)}%, {Math.abs((this.state.error[1][0] * 100)).toFixed(3)}%, {Math.abs((this.state.error[2][0] * 100)).toFixed(3)}%, {Math.abs((this.state.error[3][0] * 100)).toFixed(3)}%</div>
                    </div>
                    <div id="errorRow" className="row">
                        <h4>Delta</h4>
                        <div>{Math.abs((this.state.delta[0][0] * 100)).toFixed(3)}%, {Math.abs((this.state.delta[1][0] * 100)).toFixed(3)}%, {Math.abs((this.state.delta[2][0] * 100)).toFixed(3)}%, {Math.abs((this.state.delta[3][0] * 100)).toFixed(3)}%</div>
                    </div>
                </div>
        );
    }
}

render(<Visualizer />, document.getElementById("Visualizer"));
render(<Footer test="this is the test" />, document.getElementById("Footer"));
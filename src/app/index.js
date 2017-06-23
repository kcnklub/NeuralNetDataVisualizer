import React from "react";
import { render } from "react-dom";

var Math = require('mathjs');

console.log(Math.random());
class Visualizer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h3>The Neural Network</h3>
                <div className="row">
                    <button>Step</button>
                    <button>Run</button>
                    <button>Stop</button>
                </div>
                <div className="row">
                    <h3>Activation Functions</h3>
                    <button onClick={changeActivationFunction(0)}>sigmoid</button>
                    <button onClick={changeActivationFunction(1)}>tanh</button>
                    <button onClick={changeActivationFunction(2)}>reLU</button>
                </div>
            </div>
        );
    }
}

render(<Visualizer />, document.getElementById("test"));

class NeuralNet {
    constructor(x, y, z){
        this.inputLayer = x;
        this.syn0 = Math.matrix([
            [Math.random(), Math.random(), Math.random(), Math.random()],
            [Math.random(), Math.random(), Math.random(), Math.random()],
            [Math.random(), Math.random(), Math.random(), Math.random()]
        ]);//these is the synapse layers init them with random weights
        this.syn1 = Math.matrix([
            [Math.random()],
            [Math.random()],
            [Math.random()],
            [Math.random()]
        ]);//these will be updated as the neural net is trained.
        this.activationFucntion = y;
        //0 -> sig
        //1 -> tanh
        //2 -> reLU
        this.expectedOutput = z;
    }

    feedForward(){
        //this is the process of feeding the data forward from input to the output of the graph.
        this.hiddenLayer = Math.dotMultiply(this.inputLayer, this.syn0);
        console.log(this.hiddenLayer);
        this.outputLayer = sigmoid(Math.dotMultiply(this.hiddenLayer, this.syn1));
    }

    calcError(){
        this.l2_error = this.expectedOutput - this.outputLayer;
        this.l2_delta = this.l2_error * sigmoid(this.outputLayer, true);
        this.l1_error = Math.dotMultiply(this.l2_delta, this.syn1);
        this.l1_delta = this.l1_error * sigmoid(this.hiddenLayer, true);
    }

    updateWeights(){
        this.syn1 += Math.dotMultiply(this.l2_delta, this.hiddenLayer);
        this.syn0 += Math.dotMultiply(this.l1_delta, this.inputLayer);
    }

    train(){
        for(let i = 0; i < 60000; i++){
            console.log("we are starting the training");
            this.feedForward();
            console.log("we are bout to calc error");
            this.calcError();
            if((i % 10000) == 0)
                console.log(this.l2_error);
            this.updateWeights();
        }
    }
}
var testSet = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]
var testOut = [
    [0],
    [1],
    [1],
    [0]
]
var test = new NeuralNet(testSet, 0, testOut);

//test.train();


function dotProduct(A, B){
    var rowsA = A[0].length;
    var colsB = B.length;
    var rowsB = B[0].length;
    if(!(rowsA == colsB)){
        console.log("The Dimensions of your Matrices are off. ");
        return null;
    }else{
        var result = Array(rowsA);
        var tempRow = Array(colsB);
        var sum = 0;
        for(var i = 0; i < rowsA; i++){

            for(var j = 0; j < rowsB; j++){
                for(var k = 0; k < colsB; k++){
                    sum += (A[i][k] * B[k][j]);
                }
                tempRow[j] = sum;
                sum = 0;
            }
            result[i] = (tempRow);
            tempRow = [];
        }
        return result;
    }
}

var test1 = [[1,2], [1,2]];
var test2 = [[1,2,3], [1,2,3]];

var result = dotProduct(test1, test2);

console.log(result);
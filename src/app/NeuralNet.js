/**
 * Created by Kyle on 6/23/2017.
 */
 export default class NeuralNet {


    inputLayer;
    hiddenLayer;
    outputLayer;
    syn0;
    syn1;
    l2_error;
    l1_error;
    l2_delta;
    l1_delta;
    constructor(input, activationFunction, expectedOutput){
        this.inputLayer = input;
        this.syn0 = [
            [Math.random(), Math.random(), Math.random(), Math.random()],
            [Math.random(), Math.random(), Math.random(), Math.random()],
            [Math.random(), Math.random(), Math.random(), Math.random()]
        ];
        this.syn1 = [
            [Math.random()],
            [Math.random()],
            [Math.random()],
            [Math.random()]
        ];
        this.activationFucntion = activationFunction;
        //0 -> sig
        //1 -> tanh
        //2 -> reLU
        this.expectedOutput = expectedOutput;
    }

    feedForward(){
        //this is the process of feeding the data forward from input to the output of the graph.
        this.hiddenLayer = dotProduct(this.inputLayer, this.syn0);
        for (let i = 0; i < this.hiddenLayer.length; i++){
            for (let j = 0; j < this.hiddenLayer[i].length; j ++){
                this.hiddenLayer[i][j] = sigmoid(this.hiddenLayer[i][j]);
            }
        }

        // feed into the output layer
        this.outputLayer = dotProduct(this.hiddenLayer, this.syn1);
        for (let i = 0; i < this.outputLayer.length; i++){
            for (let j = 0; j < this.outputLayer[i].length; j ++){
                this.outputLayer[i][j] = sigmoid(this.outputLayer[i][j]);
            }
        }
    }

    calcError(){
        this.l2_error = [[],[],[],[]];
        for(let i = 0; i < this.expectedOutput.length; i++){
            for(let j = 0; j < this.expectedOutput[i].length; j++){
                this.l2_error[i][j] = this.expectedOutput[i][j] - this.outputLayer[i][j];
            }
        }

        this.outputDeriv = [[],[],[],[]];
        this.l2_delta = [[],[],[],[]];
        for(let i = 0; i < this.outputLayer.length; i++){
            for(let j = 0; j < this.outputLayer[i].length; j++){
                this.outputDeriv[i][j] = sigmoid(this.outputLayer[i][j], true);
                this.l2_delta[i][j] = this.l2_error[i][j] * this.outputDeriv[i][j];
            }
        }

        this.l1_error = dotProduct(this.l2_delta, transposeMat(this.syn1));
        this.hiddenDeriv = [[],[],[],[]];
        this.l1_delta = [[],[],[],[]];
        for(let i = 0; i < this.hiddenLayer.length; i++){
            for(let j = 0; j < this.hiddenLayer[i].length; j++){
                this.hiddenDeriv[i][j] = sigmoid(this.hiddenLayer[i][j], true);
                this.l1_delta[i][j] = this.l1_error[i][j] * this.hiddenDeriv[i][j];
            }
        }
    }

    updateWeights(){


        this.deltaSyn1 = dotProduct(transposeMat(this.l2_delta), this.hiddenLayer);
        this.deltaSyn0 = dotProduct(transposeMat(this.l1_delta), this.inputLayer);
        this.deltaSyn1 = transposeMat(this.deltaSyn1);
        this.deltaSyn0 = transposeMat(this.deltaSyn0);
        for( let i = 0; i < this.syn1.length; i++){
            for ( let j = 0; j < this.syn1[i].length; j++){
                this.syn1[i][j] += this.deltaSyn1[i][j];
            }
        }

        for (let i = 0; i < this.syn0.length; i++){
            for ( let j = 0; j < this.syn0[i].length; j++){
                this.syn0[i][j] += this.deltaSyn0[i][j];
            }
        }
    }

    train(){
        for(let i = 0; i < 1000; i++){
            this.feedForward();
            this.calcError();
            this.updateWeights();
            console.log(this.outputLayer);
        }
    }
}


function dotProduct(A, B){
    if(!(A[0].length === B.length)){
        console.log("The Dimensions of your Matrices are off. ");
        return null;
    }else{
        let result = [];
        let tempRow = [];
        let sum = 0;
        for(let i = 0; i < A.length; i++){

            for(let j = 0; j < B[0].length; j++){
                for(let k = 0; k < B.length; k++){
                    sum += (A[i][k] * B[k][j]);
                }
                tempRow.push(sum);
                sum = 0;
            }
            result.push(tempRow);
            tempRow = [];
        }
        return result;
    }
}

function transposeMat(A){
    let row = A.length;
    let col = A[0].length;
    let result = [];
    let tempRow = [];
    for(let j = 0; j < col; j++){
        for(let i = 0; i < row; i++){
            tempRow.push(A[i][j])
        }
        result.push(tempRow);
        tempRow = []
    }
    return result;
}

function sigmoid(x, deriv = false) {
    if (deriv) {
        return x * (1 - x);
    }
    return 1 / (1 + Math.exp(-x));
}

function tanh(x, deriv = false) {
    if (deriv) {
        return Math.acosh(1 / x) * Math.acosh(1 / x);
    }
    return Math.tanh(x);
}

function reLU(x) {
    if (x > 0) {
        return x;
    } else {
        return x * 0.01;
    }
}

function changeActivationFunction(x){
    activationFunction = x;
}

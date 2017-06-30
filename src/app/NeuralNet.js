/**
 * Created by Kyle on 6/23/2017.
 */
 export default class NeuralNet {
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
        console.log(this.hiddenLayer);

        // feed into the output layer
        this.outputLayer = dotProduct(this.hiddenLayer, this.syn1);
        for (let i = 0; i < this.outputLayer.length; i++){
            for (let j = 0; j < this.outputLayer[i].length; j ++){
                this.outputLayer[i][j] = sigmoid(this.outputLayer[i][j]);
            }
        }
        console.log(this.outputLayer);
    }

    calcError(){
        this.l2_error = [[],[],[],[]];
        for(let i = 0; i < this.expectedOutput.length; i++){
            for(let j = 0; j < this.expectedOutput[i].length; j++){
                this.l2_error[i][j] = this.expectedOutput[i][j] - this.outputLayer[i][j];
            }
        }
        console.log("l2_error");
        console.log(this.l2_error);

        console.log(this.outputLayer)


        this.outputDeriv = [[],[],[],[]];
        for(let i = 0; i < this.outputLayer.length; i++){
            for(let j = 0; j < this.outputLayer[i].length; j++){
                this.outputDeriv[i][j] = sigmoid(this.outputLayer[i][j], true);
            }
        }
        this.l2_delta = [[],[],[],[]];
        for(let i = 0; i < this.outputLayer.length; i++){
            for(let j = 0; j < this.outputLayer[i].length; j++){
                this.l2_delta[i][j] = this.l2_error[i][j] * this.outputDeriv[i][j];
            }
        }
        //this.l2_delta = this.l2_error * sigmoid(this.outputLayer, true);
        //this.l1_error = Math.dotMultiply(this.l2_delta, this.syn1);
        //this.l1_delta = this.l1_error * sigmoid(this.hiddenLayer, true);
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
            if((i % 10000) === 0)
                console.log(this.l2_error);
            this.updateWeights();
        }
    }
}


function dotProduct(A, B){
    let rowsA = A.length
    let colsA = A[0].length;
    let rowsB = B.length;
    let colsB = B[0].length;
    if(!(colsA === rowsB)){
        console.log("The Dimensions of your Matrices are off. ");
        return null;
    }else{
        let result = [];
        let tempRow = [];
        let sum = 0;
        for(let i = 0; i < rowsA; i++){

            for(let j = 0; j < colsB; j++){
                for(let k = 0; k < rowsB; k++){
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

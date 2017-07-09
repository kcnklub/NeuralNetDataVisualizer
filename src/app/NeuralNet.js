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
            [2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1],
            [2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1],
            [2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1]
        ];
        this.syn1 = [
            [2 * Math.random() - 1],
            [2 * Math.random() - 1],
            [2 * Math.random() - 1],
            [2 * Math.random() - 1]
        ];
        this.hiddenLayer = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.outputLayer = [[0],[0],[0],[0]];
        this.activationFucntion = activationFunction;
        //0 -> sig
        //1 -> tanh
        this.expectedOutput = expectedOutput;
    }

    feedForward(){
        //this is the process of feeding the data forward from input to the output of the graph.
        this.hiddenLayer = NeuralNet.dotProduct(this.inputLayer, this.syn0);
        for (let i = 0; i < this.hiddenLayer.length; i++){
            for (let j = 0; j < this.hiddenLayer[i].length; j ++){
                if(this.activationFucntion === 0){
                    this.hiddenLayer[i][j] = NeuralNet.sigmoid(this.hiddenLayer[i][j]);
                }else if(this.activationFucntion === 1){
                    this.hiddenLayer[i][j] = NeuralNet.tanh(this.hiddenLayer[i][j]);
                }
            }
        }

        // feed into the output layer
        this.outputLayer = NeuralNet.dotProduct(this.hiddenLayer, this.syn1);
        for (let i = 0; i < this.outputLayer.length; i++){
            for (let j = 0; j < this.outputLayer[i].length; j ++){
                if(this.activationFucntion === 0){
                    this.outputLayer[i][j] = NeuralNet.sigmoid(this.outputLayer[i][j]);
                }else if(this.activationFucntion === 1){
                    this.outputLayer[i][j] = NeuralNet.tanh(this.outputLayer[i][j]);
                }
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
                if(this.activationFucntion === 0){
                    this.outputDeriv[i][j] = NeuralNet.sigmoid(this.outputLayer[i][j], true);
                }else if(this.activationFucntion === 1){
                    this.outputDeriv[i][j] = NeuralNet.tanh(this.outputLayer[i][j], true);
                }
                this.l2_delta[i][j] = this.l2_error[i][j] * this.outputDeriv[i][j];
            }
        }

        this.l1_error = NeuralNet.dotProduct(this.l2_delta, NeuralNet.transposeMat(this.syn1));
        this.hiddenDeriv = [[],[],[],[]];
        this.l1_delta = [[],[],[],[]];
        for(let i = 0; i < this.hiddenLayer.length; i++){
            for(let j = 0; j < this.hiddenLayer[i].length; j++){
                if(this.activationFucntion === 0){
                    this.hiddenDeriv[i][j] = NeuralNet.sigmoid(this.hiddenLayer[i][j], true);
                }else if(this.activationFucntion === 1){
                    this.hiddenDeriv[i][j] = NeuralNet.tanh(this.hiddenLayer[i][j], true);
                }
                this.l1_delta[i][j] = this.l1_error[i][j] * this.hiddenDeriv[i][j];
            }
        }
    }

    updateWeights(){
        this.deltaSyn1 = NeuralNet.dotProduct(NeuralNet.transposeMat(this.l2_delta), this.hiddenLayer);
        this.deltaSyn0 = NeuralNet.dotProduct(NeuralNet.transposeMat(this.l1_delta), this.inputLayer);
        this.deltaSyn1 = NeuralNet.transposeMat(this.deltaSyn1);
        this.deltaSyn0 = NeuralNet.transposeMat(this.deltaSyn0);
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

    train(x){
        for(let i = 0; i < x; i++){
            this.feedForward();
            this.calcError();
            this.updateWeights();
        }
    }

    static dotProduct(A, B){
        if(!(A[0].length === B.length)){
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
    static transposeMat(A){
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

    static sigmoid(x, deriv = false) {
        if (deriv) {
            return x * (1 - x);
        }
        return 1 / (1 + Math.exp(-x));
    }

    static tanh(x, deriv = false) {
        if (deriv) {
            return Math.pow(1/(Math.cosh(x)), 2);
        }
        return Math.tanh(x);
    }
}
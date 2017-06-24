/**
 * Created by Kyle on 6/23/2017.
 */
 class NeuralNet {
    constructor(input, activationFunction, expectedOutput){
        this.inputLayer = input;
        this.syn0 = [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]
        ];
        this.syn1 = [
            [1],
            [1],
            [1],
            [1]
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
        console.log(this.hiddenLayer);
        console.log(this.syn1);
        this.outputLayer = dotProduct(this.hiddenLayer, this.syn1);
        //console.log(this.outputLayer);
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
            if((i % 10000) === 0)
                console.log(this.l2_error);
            this.updateWeights();
        }
    }
}
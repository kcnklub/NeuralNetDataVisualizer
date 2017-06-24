/**
 * Created by kylem on 6/7/2017.
 */

function sigmoid(x, deriv = false) {
    if (deriv) {
        return x * (1 - x);
    }
    return 1 / (1 + e ^ -x);
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


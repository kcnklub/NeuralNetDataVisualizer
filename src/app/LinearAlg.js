/**
 * Created by Kyle on 6/23/2017.
 */

function dotProduct(A, B){
    let rowsA = A[0].length;
    let colsB = B.length;
    let rowsB = B[0].length;
    if(!(rowsA === colsB)){
        console.log("The Dimensions of your Matrices are off. ");
        return null;
    }else{
        let result = [];
        let tempRow = [];
        let sum = 0;
        for(let i = 0; i < rowsA; i++){

            for(let j = 0; j < rowsB; j++){
                for(let k = 0; k < colsB; k++){
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
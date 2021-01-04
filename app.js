function add (left, right) {
	return left + right;
}

function subtract (left, right) {
	return left - right;
}

function multiply (left, right){
    return left * right;
}

function divide (left, right){
    return left / right;
}

function operate (op, left, right){
    switch(op){
        case "+":
            return add(left,right);
        case "-":
            return subtract(left,right);
        case "*":
            return multiply(left,right);
        case "/":
            return divide(left,right);
    }
}

const calculation = document.querySelector(".calculation p");
const buttons = document.querySelectorAll("button");
const answer = document.querySelector(".answer p");

let previousAns = 0;
let currentCalc = [];
let currentNum = [], currentOp = "", nextOp = "";
let num, op, firstNum = 0, secondNum = 0;

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        num = /[0-9]/;
        op = /[+-/*=]/;
        if(button.innerText.match(num)){
            currentCalc.push(button.innerText);
            currentNum.push(button.innerText);
        } else if(button.innerText.match(op)){
            currentCalc.push(` ${button.innerText} `);
            currentNum.push(button.innerText);
            if(firstNum == null){
                firstNum = currentNum.join("");
                firstNum = firstNum.split(`${button.innerText}`);
                firstNum = parseInt(firstNum[0]);
                currentOp = button.innerText;
                currentNum = [];
                console.log("firstNum: " + firstNum);
            } else if(secondNum == null){
                secondNum = currentNum.join("");
                secondNum = secondNum.split(`${button.innerText}`);
                nextOp = button.innerText;
                secondNum = parseInt(secondNum[0]);
                currentNum = [];
                previousAns = operate(currentOp, firstNum, secondNum);
                answer.innerText = previousAns;
                currentOp = nextOp;
                firstNum = previousAns;
                secondNum = null;
                console.log("secondNum: " + secondNum);
            }
        }
        
        calculation.innerText = currentCalc.join("");
    });
});


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
let num, op, amountOfNum = 0, firstNum = null, secondNum = null;

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        num = /[0-9]/;
        op = /[+-/*=]/;
        if(button.innerText.match(num)){
            currentCalc.push(button.innerText);
            currentNum.push(button.innerText);
        } else if(button.innerText.match(op)){
            if(!currentCalc[currentCalc.length-1].match(op)){
                currentCalc.push(` ${button.innerText} `);
                currentNum.push(button.innerText);
            }
            console.log(currentCalc);
            //check if a num was inputted before operation
            if(currentNum[0].match(op)){
                currentNum = [previousAns, button.innerText];
                amountOfNum++;
                console.log(currentCalc);
                if(currentCalc[0].match(op)){
                    currentCalc = [previousAns, ` ${button.innerText} `];
                }
            } else{
                amountOfNum++;
                if(amountOfNum == 1){
                    firstNum = currentNum.join("");
                    firstNum = firstNum.split(`${button.innerText}`);
                    firstNum = parseInt(firstNum[0]);
                    currentNum.push(firstNum);
                    currentNum.push(button.innerText);
                }
            }
                
                // currentNum = [];
                // console.log("firstNum: " + firstNum);
            
                // secondNum = currentNum.join("");
                // secondNum = secondNum.split(`${button.innerText}`);
                // nextOp = button.innerText;
                // secondNum = parseInt(secondNum[0]);
                // currentNum = [];
                // previousAns = operate(currentOp, firstNum, secondNum);
                // answer.innerText = previousAns;
                // currentOp = nextOp;
                // firstNum = previousAns;
                // secondNum = null;
                // console.log("secondNum: " + secondNum);
            
        }
        
        calculation.innerText = currentCalc.join("");
    });
});


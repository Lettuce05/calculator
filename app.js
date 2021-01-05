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

function adjustNumLength(num){
    if(String(num).length > 6){
        return num.toPrecision(6);
    }
    return num;
}

const calculation = document.querySelector(".calculation p");
const buttons = document.querySelectorAll("button");
const answer = document.querySelector(".answer p");

let previousAns = 0;
let currentCalc = [];
let currentNum = [], currentOp = "", nextOp = "";
let num, op, amountOfNum = 0, firstNum = null, secondNum = null, tempNum = null;

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        num = /[0-9]/;
        op = /[+-/*]/;
        if(button.innerText.match(num)){
            if(currentCalc.includes(" = ")){
                currentCalc = [];
                answer.textContent = 0;
                previousAns = 0;
            }
            currentCalc.push(button.innerText);
            currentNum.push(button.innerText);
        } else if(button.innerText.match(op)){
            if(currentCalc.includes(" = ")){
                currentCalc = [];
            }

            currentCalc.push(` ${button.innerText} `);
            currentNum.push(button.innerText);

            //check if a num was inputted before operation
            if(currentNum[0].match(op)){
                currentNum = [String(previousAns), button.innerText];
                amountOfNum++;
                if(currentCalc[0].match(op)){
                    currentCalc = [previousAns, ` ${button.innerText} `];
                }
                
            } else{
                if(currentCalc[currentCalc.length-2].match(op)){
                    //makes sure multiple signs arent entered concurrently
                    currentCalc.splice(currentCalc.length-1, 1);
                    currentNum.splice(currentNum.length-1, 1);
                } else {
                    amountOfNum++;
                    if(amountOfNum == 1){
                        firstNum = currentNum.join("");
                        firstNum = firstNum.split(`${button.innerText}`);
                        firstNum = firstNum[0];
                        console.log(firstNum);
                        currentNum = [firstNum, button.innerText];
                    } else if(amountOfNum == 2){
                        //calculate the first operation
                        console.log("made it here");
                        secondNum = currentNum.slice(2, currentNum.length-1);
                        secondNum = secondNum.join("");
                        console.log(currentNum);
                        console.log(secondNum);
                        tempNum = operate(currentNum[1], parseInt(currentNum[0]), parseInt(secondNum));
                        answer.innerText = adjustNumLength(tempNum);
                        //re-adjust the currentNum array
                        currentNum = [String(tempNum), button.innerText];
                        //decrement the amount of numbers
                        amountOfNum--;
                    }
                }

            }
            
        } else if(button.innerText == "="){
            if(amountOfNum == 1 && !currentCalc[currentCalc.length-1].match(op)){
                amountOfNum++;
                currentCalc.push(` ${button.innerText} `);
                currentNum.push(button.innerText);
                secondNum = currentNum.slice(2, currentNum.length-1);
                secondNum = secondNum.join("");
                console.log(secondNum);
                tempNum = operate(currentNum[1], parseInt(currentNum[0]), parseInt(secondNum));
                answer.innerText = adjustNumLength(tempNum);
                console.log(currentNum);
                currentNum = [];
                amountOfNum = 0;
                previousAns = tempNum;
            }
        } else if(button.innerText == "CE"){
            while(currentCalc.length > 0){
                if(currentCalc[currentCalc.length-1].match(num)){
                    currentCalc.splice(currentCalc.length-1, 1);
                } else {
                    break;
                }
                console.log(currentCalc);
                if(currentNum[currentNum.length-1].match(num)){
                    currentNum.splice(currentNum.length-1, 1);
                } else {
                    break;
                }
                console.log(currentNum);
            }
        } else if(button.innerText == "AC"){
            previousAns = 0;
            currentCalc = [];
            currentNum = []; currentOp = ""; nextOp = "";
            amountOfNum = 0; firstNum = null; secondNum = null; tempNum = null;
            answer.innerText = 0;
        }
        
        calculation.innerText = currentCalc.join("");
    });
});


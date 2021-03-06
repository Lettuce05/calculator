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

function modulo (left, right){
    return left % right;
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
            if(right == 0){
                return "Error";
            }
            return divide(left,right);
        case "%":
            if(right == 0){
                return "Error";
            }
            return modulo(left,right);
    }
}

function adjustNumLength(num){
    let length = String(num).length;
    let before = 0, after = 0,passed = false;
    console.log(num);
    if(length > 6){
        for(let i = 0; i < length; i++){
            if(String(num)[i] == "."){
                passed = true;
                break;
            }
            if(!passed){
                before++;
            }
        }
        if(before > 7){
            return num.toExponential(2);
        }
        if(String(num).includes("e")){
            return num.toExponential(2);
        }
        return num.toFixed(7-before);
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
        op = /\+|-|\/|\*|\%/;
        if(button.innerText == "."){
            if(currentCalc.includes(" = ")){
                currentCalc = [];
                answer.textContent = 0;
                previousAns = 0;
            } 
            if(answer.innerText == "Error"){
                console.log("CurrentNum includes Error");
                previousAns = 0;
                currentCalc = [];
                currentNum = []; currentOp = ""; nextOp = "";
                amountOfNum = 0; firstNum = null; secondNum = null; tempNum = null;
                answer.innerText = 0;
            }
            if(amountOfNum < 1){
                if(currentNum.length == 0){
                    currentCalc.push(button.innerText);
                    currentNum.push(button.innerText);
                } else {
                    for(let i = 0; i < currentNum.length; i++){
                        if(i == currentNum.length-1 && currentNum[i] != "."){
                            currentCalc.push(button.innerText);
                            currentNum.push(button.innerText);
                        } else if(currentNum[i] != "."){
                            continue;
                        } else{
                            break;
                        }
                    }
                }
            } else if(amountOfNum >= 1){
                for(let i = currentNum.length-1; i > 0; i--){
                    if(currentNum[i].match(op) && currentNum[i] != "."){
                        currentCalc.push(button.innerText);
                        currentNum.push(button.innerText);
                        break;
                    } else if(currentNum[i] != "."){
                        continue;
                    } else{
                        break;
                    }
                }
            }
        } else if(button.innerText.match(num)){
            if(currentCalc.includes(" = ")){
                currentCalc = [];
                answer.textContent = 0;
                previousAns = 0;
            }
            if(answer.innerText == "Error"){
                previousAns = 0;
                currentCalc = [];
                currentNum = []; currentOp = ""; nextOp = "";
                amountOfNum = 0; firstNum = null; secondNum = null; tempNum = null;
                answer.innerText = 0;
            }
            currentCalc.push(button.innerText);
            currentNum.push(button.innerText);
        } else if(button.innerText.match(op)){
            if(currentCalc.includes(" = ")){
                currentCalc = [];
            }
            if(answer.innerText == "Error"){
                previousAns = 0;
                currentCalc = [];
                currentNum = []; currentOp = ""; nextOp = "";
                amountOfNum = 0; firstNum = null; secondNum = null; tempNum = null;
                answer.innerText = 0;
            }

            currentCalc.push(` ${button.innerText} `);
            currentNum.push(button.innerText);

            //check if a num was inputted before operation
            if(currentNum[0].match(op)){
                currentNum = [String(previousAns), button.innerText];
                amountOfNum++;
                if(currentCalc[0].match(op)){
                    currentCalc = [String(adjustNumLength(previousAns)), ` ${button.innerText} `];
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
                        currentNum = [firstNum, button.innerText];
                    } else if(amountOfNum == 2){
                        //calculate the first operation
                        secondNum = currentNum.slice(2, currentNum.length-1);
                        secondNum = secondNum.join("");
                        tempNum = operate(currentNum[1], parseFloat(currentNum[0]), parseFloat(secondNum));
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
                tempNum = operate(currentNum[1], parseFloat(currentNum[0]), parseFloat(secondNum));
                answer.innerText = adjustNumLength(tempNum);
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
                if(currentNum[currentNum.length-1].match(num)){
                    currentNum.splice(currentNum.length-1, 1);
                } else {
                    break;
                }
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


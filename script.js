const precedence = {
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
}

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
}

let register = [];

function operate(a, b, operator) {
    if (operator in operations)
        return operations[operator](+a, +b);
}

const buttons = document.querySelectorAll("button");
const expression = document.querySelector(".expression");
const preview = document.querySelector(".preview");

buttons.forEach(btn => btn.addEventListener("click", updateCalculator))
document.addEventListener("keydown", updateCalculator)

function updateCalculator(e) {
    //update expression
    updateExpression(e);
    
    //evaluete expression
    const value = evalueteExp([...register]);
   
    //updatePreview
    preview.textContent = (register.length >= 3) ? value : "";
    expression.innerHTML = register.join(" ");
}

function updateExpression(e) { 
    const key =  e.key || e.target.dataset.key;
    
    register = expression.textContent
        .split(/\s+/)

    // prevent irregular operators
    if (!Number(register[0])) register.shift();

    switch (true) {
        case !isNaN(key): 
            addNumber(key); 
            break;      
        case key in operations: 
            addOperator(key); 
            break;
        case key == "Backspace":
            clear();
            break;
        case key == ".":
            addDecimalPoint();
            break;
        case key == "=":
            evaluete();
            break;
        case key == "clear":
            clearAll();
            break;
    }

    return register;
}

function evalueteExp(exp) {
    if (exp.length % 2 == 0) exp.pop();

    while (exp.length > 1) {
        //find highest operand
        let highestOp = exp.reduce((op, crr) => {
            if (Number(crr)) return op;
            return evalPrecedence(op, crr) ? op : crr;
        })

        //find first ocurrence
        let index = exp.indexOf(highestOp);

        let [op1, operator, op2] = exp.splice(index - 1, 3); 
        exp.splice(index - 1, 0, operate(op1, op2, operator));
    }

    return Number(exp) || [];
}

function evalPrecedence(op1, op2) {
    return precedence[op1] >= precedence[op2];
}

function clear() {
    if (register.length > 0) {
        let last = register.pop();
        last = last.slice(0, -1);

        if (last) register.push(last);
    }
}

function clearAll() {
    register = [];
}

function addOperator(key) {
    let last = register.slice(-1);
    last in operations || register.push(key);
}

function addNumber(key) {
    let last = register.pop(); 

    if (Number(last)) {
        register.push(last + key);
    } else {
        register.push(last);
        register.push(key);
    }    
}

function evaluete() {
    register = [evalueteExp(register)];
}

function addDecimalPoint() {
    let last = register.pop();
    last.includes(".") || register.push(last + ".");
}

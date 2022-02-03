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

function operate(a, b, operator) {
    return operations[operator](a, b);
}

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => btn.addEventListener("click", updateCalculator))

function updateCalculator(e) {

    const display = document.querySelector(".expression");
    const preview = document.querySelector(".preview");
    //update expression
    //updateExpression(e);
    //evaluete expression
    const value = evalueteExp(display.textContent);
    //updatePreview
    preview.textContent = value;
}

function updateExpression(e) {
    return 0;
}

function evalueteExp (exp) {
    let el = exp.split(/\s+/);

    //converting str to numbers
    el = el.map(num => Number(num) ? +num : num);
    
    while (el.length > 1) {
        //find highest operand
        let highestOp = el.reduce((op, crr) => {
            if (Number(crr)) return op;
            return evalPrecedence(op, crr) ? op : crr;
        })

        //find first ocurrence
        let index = el.indexOf(highestOp);

        //
        let [op1, operator, op2] = el.splice(index - 1, 3);  
        el.splice(index - 1, 0, operate(op1, op2, operator))
    }

    return el;
}

function evalPrecedence(op1, op2) {
    return precedence[op1] >= precedence[op2];
}
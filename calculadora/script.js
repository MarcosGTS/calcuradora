var el = function(element) {
    if (element.charAt(0) === "#") { // If passed an ID... SE PASSAREM UM ID
        return document.querySelector(element); // ... returns single element RETORNE UM UNICO ELEMENTO
    }

    return document.querySelectorAll(element); // Otherwise, returns a nodelist
};

var numbers = el(".number"); //  conjunto dos numeros 
var display = el("#display"); // area de display
var sinals = el(".operator")
var equal = el("#equals");
var numAtual = "";
var numSecundario = "";
var result  = "";
var sinalA = ""
var sinalS = ""


for(let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', function(){
        numAtual += this.getAttribute('data-num');
        display.innerHTML = `<p>${result}<br>${sinalA} ${numAtual}</p>`
    })    
}

for(let j = 0; j < sinals.length; j++){
    sinals[j].addEventListener('click', function(){
        sinalS = sinalA;
        sinalA = this.getAttribute('data-num');
        
        if(result == ""){
            result = numAtual;
        } else {
            switch(sinalS){
                case "+":
                    result = Number(result) + Number(numAtual)
                    break;
                case "-":
                    result = Number(result) - Number(numAtual)
                    break;
                case "/":
                    result = Number(result) / Number(numAtual)
                    break;
                case "*":
                    result = Number(result) * Number(numAtual)
                    break;
                default:
                    
            }
        }

        numAtual = "";
        console.log(result)
        display.innerHTML = `<p>${result}<br>${sinalA} ${numAtual}</p>`
    })
}

equal.addEventListener('click',function(){
    
    
    switch(sinalA){
        case "+":
            result = Number(result) + Number(numAtual)
            break;
        case "-":
            result = Number(result) - Number(numAtual)
            break;
        case "/":
            result = Number(result) / Number(numAtual)
            break;
        case "*":
            result = Number(result) * Number(numAtual)
            break;
        default:
            result ="error"
    }

    numAtual = "";
    sinalA = "";
    sinalS = "";
    
    display.innerHTML = `<p>${result}<br>${sinalA} ${numAtual}</p>`
})


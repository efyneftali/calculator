//cache  the DOM
const num_buttons = document.querySelectorAll('[data-num]')
const operation_buttons = document.querySelectorAll('[data-operations]')
const ac_button = document.querySelector('[data-all-clear]')
const delete_button = document.querySelector('[data-delete]')
const equals_button = document.querySelector('[data-equals]')
const historyDisplay_textElement = document.querySelector('[data-previous-operand]')
const liveDisplay_textElement = document.querySelector('[data-current-operand]')

//store user inputs
let num_1 = ''
let num_2  = ''
let currentOperation = null
shouldResetDisplay = false

///the equivalent of my main() function
num_buttons.forEach((button)=> {
    button.addEventListener('click', () => {
        if (historyDisplay_textElement.textContent.includes("=")){
            liveDisplay_textElement.textContent = ''
            historyDisplay_textElement.textContent = ''
            appendNum(button.textContent)
        }

        else appendNum(button.textContent)
    })
})
operation_buttons.forEach((button)=> 
    button.addEventListener('click', () => setOperation(button.textContent))
)

delete_button.addEventListener('click', del)
ac_button.addEventListener('click', allClear)
equals_button.addEventListener('click', evaluate)


function appendNum(number){
    if(liveDisplay_textElement.textContent === '0' ||  shouldResetDisplay) resetDisplay()
    if(number ==="." && liveDisplay_textElement.textContent.includes(".")) return //only one "." should be allowed!
    liveDisplay_textElement.textContent = liveDisplay_textElement.textContent.toString() + number.toString()
}

function del(){
    liveDisplay_textElement.textContent = liveDisplay_textElement.textContent.toString().slice(0,-1)
}
function allClear(){
    liveDisplay_textElement.textContent = '0'
    historyDisplay_textElement.textContent = ''
    num_1 = ''
    num_2 = ''
    currentOperation = null
}
function resetDisplay(){
    liveDisplay_textElement.textContent = ''
    shouldResetDisplay = false
}
function setOperation(operator){
    if (currentOperation !== null) evaluate()
    num_1 = liveDisplay_textElement.textContent
    currentOperation = operator
    historyDisplay_textElement.textContent = `${num_1} ${currentOperation}`
    shouldResetDisplay = true
}
function roundCalc(num){
    return Math.floor(num * 1000)/1000
}
function evaluate(){
    if(currentOperation === null) return
    if(currentOperation === '÷' && liveDisplay_textElement.textContent === '0'){
        alert("You can't divide by 0!")
        return
    }
    num_2 = liveDisplay_textElement.textContent
    liveDisplay_textElement.textContent = roundCalc(operate(currentOperation, num_1, num_2))
    historyDisplay_textElement.textContent = `${num_1} ${currentOperation} ${num_2} =`
    currentOperation = null
}
//to make x calculation between two nums
function operate(operator,a, b){
    //make sure a and b are numbers
    a = Number(a)
    b = Number(b)

    switch(operator){
        case '+':
            return add(a,b)
        case '-':
            return substract(a,b)
        case '÷':
            if (b === 0) return null
            else return divide(a,b)
        case 'x':
            return multiply(a,b)
    }
}

function add(a, b) {
    return a + b
} 
function substract(a, b) {
    return a - b
}
  
function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

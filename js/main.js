class Calculator
{
    constructor(previousOperationText,currentOperationText)
    {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.clearAllData()
    }
    clearAllData()
    {
        this.currentOperand = '';
        this.perviousOperand = '';
        this.operand = undefined;
    }
    appendNumber(num){
        if(num === '.' && this.currentOperand.includes(".")) return ;
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }
    chooseOperation(op){
        if(this.currentOperand === '') return ;
        if(this.perviousOperand !== '') this.compute() ;

        this.operand = op;
        this.perviousOperand = this.currentOperand;
        this.currentOperand = ''
    }
    updateDisplay(){
this.currentOperationText.textContent = this.getDisplayNumber(this.currentOperand)
if (this.operand != null) {
    this.previousOperationText.innerText =
      `${this.getDisplayNumber(this.perviousOperand)} ${this.operand}`
  } else {
    this.previousOperationText.textContent = ''
  }

    }
    compute()
    {
const current = parseFloat(this.currentOperand)
const previous = parseFloat(this.perviousOperand)
let computation ;
if(isNaN(current) || isNaN(previous)) return
switch(this.operand)
    {
        case '+':
            computation = previous + current
            break
          case '-':
            computation = previous - current
            break
          case '*':
            computation = previous * current
            break
          case '÷':
            computation = previous / current
            break
          default:
            return    
    }
    this.currentOperand = computation;
this.operand = undefined;
this.preOperand = ''


    }
    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    getDisplayNumber(num)
    {
        const stringNumber = num.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    

    }
}
const numberBtns = [...document.querySelectorAll('[data-number]')];
const operationBtns = [...document.querySelectorAll('[data-operation]')];
const clearAllDataBtn = document.querySelector("[data-all-clear]")
const deleteBtn = document.querySelector("[data-delete]")
const equalBtn = document.querySelector("[data-equals]")
const currentOperationText = document.querySelector("[data-current-operand]")
const previousOperationText = document.querySelector("[data-previous-operand]")

const calculator = new Calculator(previousOperationText,currentOperationText)
numberBtns.forEach((btn)=>{
btn.addEventListener("click",function(){
    calculator.appendNumber(btn.textContent)
    calculator.updateDisplay()
})
})
operationBtns.forEach((btn)=>{
    btn.addEventListener("click",function(){
        calculator.chooseOperation(btn.textContent)
        calculator.updateDisplay()

    })
    })
    equalBtn.addEventListener("click",function(){
        calculator.compute();
        calculator.updateDisplay()

    })
    clearAllDataBtn.addEventListener("click",function(){
        calculator.clearAllData();
        calculator.updateDisplay()

    })
    deleteBtn.addEventListener("click",function(){
        calculator.delete();
        calculator.updateDisplay()

    })
class Calculator {
  buttonSection = document.querySelector('.calc-body');
  result = 0;
  expression = '';
  resultDiv = document.getElementById('result');
  expressionDiv = document.getElementById('expression');result = 0;
  localHistory = [];
  constructor() {
    console.log('calc ready');
  }
  KeyPressNumber(number) {
    this.expression += number;
    this.expressionDiv.innerHTML = this.expression;
  }
  KeyPressMathSymbol(symbol) {
    this.expression += symbol;
    this.expressionDiv.innerHTML = this.expression;
  }
  KeyPressEqual() {
    this.expressionDiv.innerHTML = eval(this.expression);
  }
  KeyPressClean() {
    this.expression = '';
    this.result = 0;
  }
}


console.log(1+2+3*4);

let calc = new Calculator();
let dataType;
let targetValue;
calc.buttonSection.addEventListener('click', (e)=> {
  console.log(e.target);
  if(e.target.tagName != 'BUTTON') {
    dataType = e.target.parentElement.dataset.type;
    targetValue = e.target.parentElement.value;
  } else {
    dataType = e.target.getAttribute('data-type');
    targetValue = e.target.value;
  }
  if(dataType == 'number') {
    calc.KeyPressNumber(targetValue);
  }
  if(dataType == 'symbol') {
    calc.KeyPressMathSymbol(targetValue);
  }
  if(dataType == 'equal') {
    calc.KeyPressEqual();
  }

});

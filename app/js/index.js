class Calculator {
  buttonSection = document.querySelector('.calc-body');
  resultDiv = document.getElementById('result');
  expressionDiv = document.getElementById('expression');
  result = 0;
  expression = '';
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
    this.expression = this.result;
  }
  KeyPressClean() {
    this.expression = '';
    this.result = 0;
    this.CleanExpressionDiv();
    this.CleanResultDiv();
  }
  KeyPressBackspace() {
    this.expression = this.expression.slice(0,-1);
    this.expressionDiv.innerHTML = this.expression;
  }
  CleanExpressionDiv() {
    this.expressionDiv.innerHTML = "";
  }
  CleanResultDiv() {
    this.resultDiv.innerHTML = "";
  }

  TransitionalResult() {
    this.resultDiv.innerHTML = eval(this.expression);
  }
}


// console.log(1+2+3*4);

let calc = new Calculator();
let dataType;
let targetValue;
calc.buttonSection.addEventListener('click', (e)=> {
  // console.log(e.target);

  // if(e.target.tagName != 'BUTTON') {
  //   dataType = e.target.parentElement.dataset.type;
  //   targetValue = e.target.parentElement.value;
  // } else {
    dataType = e.target.getAttribute('data-type');
    targetValue = e.target.value;
  //}
  if(dataType == 'number') {
    calc.KeyPressNumber(targetValue);
  }
  if(dataType == 'symbol') {
    if (calc.expression[calc.expression.length-1] != "*" && calc.expression[calc.expression.length-1] != "+" && calc.expression[calc.expression.length-1] != "-" && calc.expression[calc.expression.length-1] != "/" && calc.expression[calc.expression.length-1] != "pow"  && calc.expression[calc.expression.length-1] != "%" && calc.expression[calc.expression.length-1] != "=")
    calc.KeyPressMathSymbol(targetValue);
  }
  if(dataType == 'equal') {
    calc.KeyPressEqual();
  }
  if(dataType == "clean") {
    calc.KeyPressClean();
  }
  if(dataType == "backspace") {
    calc.KeyPressBackspace();
  }
  if(dataType != null && dataType != "" && dataType != undefined) {
    if(calc.expression[calc.expression.length-1] != "*" && calc.expression[calc.expression.length-1] != "+" && calc.expression[calc.expression.length-1] != "-" && calc.expression[calc.expression.length-1] != "/" && calc.expression[calc.expression.length-1] != "pow"  && calc.expression[calc.expression.length-1] != "%" && calc.expression[calc.expression.length-1] != "=" && calc.expression[calc.expression.length-1] != "backspace") {
      calc.TransitionalResult();
    }
  }
});

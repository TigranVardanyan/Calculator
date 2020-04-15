class Calculator {
  buttonSection = document.querySelector('.calc-body');
  resultDiv = document.getElementById('result');
  expressionDiv = document.getElementById('expression');
  result = 0;
  expression = '';
  localHistory = [];
  operationDataTypes = ['clean','pow','symbol','backspace'];
  symbolTypes = ['*','/','+','-','%',];
  constructor() {
    console.log('calc ready');
  }
  IsLastCharacterSymbol(){
    let lastCaracter = this.expression.slice(-1);
    let isTrue = this.symbolTypes.indexOf(lastCaracter) >= 0;
    console.log(isTrue)
    return isTrue;
  }
  IsExpressionHasSymbol() {
    for (let i = 0; i < this.symbolTypes.length; i++) {
      if (this.expression.includes(this.symbolTypes[i])) {
        return true;
      }
    }
    return false;
  }
  KeyPressNumber(number) {
    this.expression += number;
    this.expressionDiv.innerHTML = this.expression;
  }
  KeyPressMathSymbol(symbol) {
    if(this.IsLastCharacterSymbol()) {
      this.expression = this.expression.slice(0,-1);
      this.expression += symbol;
      this.expressionDiv.innerHTML = this.expression;
    } else {
      this.expression += symbol;
      this.expressionDiv.innerHTML = this.expression;
    }
  }
  KeyPressEqual() {
    this.expressionDiv.innerHTML = eval(this.expression);
    this.expression = eval(this.expression).toString();
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
    if(calc.IsExpressionHasSymbol()) {
      if(this.IsLastCharacterSymbol()) {
        this.resultDiv.innerHTML = '';
      } else {
        this.resultDiv.innerHTML = eval(this.expression);
      }
    } else {
      this.resultDiv.innerHTML = '';
    }

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
    calc.TransitionalResult();
  }
});

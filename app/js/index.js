class Calculator {
  buttonSection = document.querySelector('.calc-body');
  resultDiv = document.getElementById('result');
  result = 0;
  expressionDiv = document.getElementById('expression');
  expression = '';
  historySection = document.getElementById('history');
  historyButton = document.getElementById('history-button');
  isHistoryButtonToggled = true;
  localHistory = [];
  operationDataTypes = ['clean','pow','symbol','backspace'];
  symbolTypes = ['*','/','+','-','%',];
  date;
  constructor() {
    this.date = new Date();
    if (localStorage.getItem("localHistory")) {
      this.localHistory = JSON.parse(localStorage.getItem('localHistory'))
    } else {
      localStorage.setItem('localHistory', JSON.stringify(this.localHistory));
    }
  }
  IsLastCharacterSymbol(){
    let lastCaracter = this.expression.slice(-1);
    let isTrue = this.symbolTypes.indexOf(lastCaracter) >= 0;
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
    this.result = eval(this.expression).toFixed(2);
    this.localHistory.push(
      {
          date: this.date.toLocaleTimeString(), expression: this.expression, result: this.result
      });
    localStorage.setItem("localHistory", JSON.stringify(this.localHistory));
    console.log(localStorage.getItem('localHistory'));
    this.expression = this.result.toString();
    this.expressionDiv.innerHTML = this.expression;
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
        this.resultDiv.innerHTML =  (eval(this.expression)).toFixed(2);
      }
    } else {
      this.resultDiv.innerHTML = '';
    }
  }
  ToggleHistorySection() {
    if (this.isHistoryButtonToggled) {
      this.isHistoryButtonToggled = !this.isHistoryButtonToggled;
      this.historySection.classList.add('animate');
      this.buttonSection.classList.add('animate');
      console.log("opened");
      console.log(this.localHistory);
      let historyBuffer = "";
      let reversedLocalHistory = this.localHistory.reverse();
      for (let i = 0; i < this.localHistory.length; i++) {
        historyBuffer +=
          `<div class="exp-res">
            <div class="row">
              <div class="history-time">${reversedLocalHistory[i].date}</div>
            </div>
            <div class="row">
              <div class="expression-history">${reversedLocalHistory[i].expression}</div>
            </div>
            <div class="row">
              <div  class="expression-history">${reversedLocalHistory[i].result}</div>
            </div>
           </div>
           <br>
`
      }
      this.historySection.innerHTML = historyBuffer
    } else {
      this.isHistoryButtonToggled = !this.isHistoryButtonToggled;
      this.historySection.classList.remove('animate');
      this.buttonSection.classList.remove('animate');
      console.log('closed')
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
calc.historyButton.addEventListener('click', ()=> {
  calc.ToggleHistorySection();
});



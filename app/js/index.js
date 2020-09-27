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
  //operationDataTypes = ['clean','pow','symbol','backspace']; //not used
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
    let lastCharacter = this.expression.slice(-1);
    let isTrue = this.symbolTypes.indexOf(lastCharacter) >= 0;
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
    if(this.expression.length != 0) {
      if(this.IsLastCharacterSymbol()) {
        this.expression = this.expression.slice(0,-1);
        this.expression += symbol;
        this.expressionDiv.innerHTML = this.expression;
      } else {
        this.expression += symbol;
        this.expressionDiv.innerHTML = this.expression;
      }
    } else {
    }
  }
  KeyPressEqual() {
    this.result = eval(this.expression).toFixed(2);
    this.localHistory.push(
      {
          date: this.date.toLocaleTimeString(), expression: this.expression, result: this.result
      });
    localStorage.setItem("localHistory", JSON.stringify(this.localHistory));
    //console.log(localStorage.getItem('localHistory'));
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
    }

  }
}

let calc = new Calculator();
let dataType;
let targetValue;
calc.buttonSection.addEventListener('click', (e)=> {
    dataType = e.target.getAttribute('data-type');
    targetValue = e.target.value;
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



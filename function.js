const inp = document.querySelector('input[type="text"]');
inp.style.zIndex = "0";
var op = ["+", "-", "*", "/", "."];
var filteredOP = op.filter((d)=> d !== '.') // contains every op except '.'
const decBtn = document.querySelector('input[value="."]')


//function to turn screen on and off
function turnOn() {
  const off = document.querySelector(".screenOff");
  if (inp.style.zIndex === "0") {
    inp.style.zIndex = "1";
    off.style.zIndex = "0";
    inp.value = "";
  } else {
    inp.style.zIndex = "0";
    off.style.zIndex = "1";
    inp.value = "";
  }
}

// to check if clicked button is operator or not
function isOperator(char) {
  return op.includes(char);
}

//to check if screen value is an error or not
function scrValue(scVal) {
  return ["undefined", "NaN", "Infinity"].includes(scVal);
}

// to check if decimal is already pressed
function screenDecimal(sc) {
  return sc.includes(".");
}

// to DISABLE decimal btn
function disableDecimal(){
  decBtn.disabled = true;
}

// to ENABLE decimal btn
function enableDecimal(){
    decBtn.disabled = false;
}


// to remove unwated operator press
function check(btnValue) {
  const secondLastChar = inp.value[inp.value.length - 2];
  if (isOperator(secondLastChar) && isOperator(btnValue)) {
    return (inp.value = inp.value.toString().slice(0, -1));
  }
  // when error occurs disabling all btns except AC and PW
  if (scrValue(inp.value)) {
    allBtns.forEach((button) => {
      if (button.value !== "AC" && button.value !== "PW") {
        button.disabled = true;
      }
    });
  }

  // check if sc value and pressed btn value are decimal
  if (screenDecimal(inp.value) && btnValue === '.'){
    allBtns.forEach((button)=>{
      if ( button.value === '.'){
        disableDecimal(); // if decimal is pressed, disable decimal btn
      }
      if (button.value.includes(filteredOP)){
        enableDecimal(); // if non decimal op is pressed, enable decimal btn
      }
    })
  }
}

// when AC and PW are clicked after error , enable all buttons
const acBtn = document.querySelector('.calculator input[value="AC"]');
acBtn.addEventListener("click", () => {
  allBtns.forEach((button) => {
    button.disabled = false;
  });
});

// when AC and PW are clicked after error , enable all buttons
const pwBtn = document.querySelector('.calculator input[value="PW"]');
pwBtn.addEventListener("click", () => {
  allBtns.forEach((button) => {
    button.disabled = false;
  });
});

// accessign all btns
const allBtns = document.querySelectorAll('.calculator input[type="button"]');
allBtns.forEach((button) => {
  button.addEventListener("click", () => {
    check(button.value); // to check clicked buttons values
  });
});

// to display calculate output
function equals() {
  inp.value = eval(inp.value);
}
inp.addEventListener("input", () => {
  const lastChar = inp.value[inp.value.length - 1];
  if (isOperator(lastChar)) {
    inp.scrollLeft = inp.scrollWidth;
  }
});

//making calculator come out when load
window.addEventListener("load", function () {
  var chPosition = document.getElementById("calc-box");
  chPosition.style.opacity = "1";
  chPosition.style.boxShadow = "1.5rem 1.5rem 2rem rgba(0, 0, 0, .5)";

  // making calculator glitch when the page loads
  const orignal = document.getElementById("calcText");
  const orignalText = orignal.innerHTML;
  let intervalId = undefined;

  function glitch() {
    const sym = ["!", "^", "<", ">", "$", "%", "&", "*", "+", "-", "="];
    const len = orignalText.length;
    let glitchText = "";
    for (i = 0; i < len; i++) {
      if (Math.random() < 0.5) {
        const randomNum = Math.floor(Math.random() * 10);
        glitchText += orignalText[i].replace(/[a-z]/gi, randomNum);
      } else {
        const randomSymbol = sym[Math.floor(Math.random() * sym.length)];
        glitchText += orignalText[i].replace(/[a-z]/gi, randomSymbol);
      }
    }
    orignal.innerHTML = glitchText;
  }

  function startGlitch() {
    intervalId = setInterval(glitch, 100);
  }

  function stopGlitch() {
    clearInterval(intervalId);
    orignal.innerHTML = orignalText;
  }

  setTimeout(() => {
    startGlitch();
    setTimeout(() => {
      stopGlitch();
    }, 2000);
  }, 10);
});

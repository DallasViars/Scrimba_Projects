const optionsDiv = document.getElementById("optionsdiv");
const oneEl = document.getElementById("one");
const twoEl = document.getElementById("two");
const threeEl = document.getElementById("three");
const fourEl = document.getElementById("four");
let validChars = [];
const lowercase = ["Lower-case","a","b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercase = ["Upper-case", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbers = ["Numbers", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const numberspecials = ["Special-Characters-1", "!", "@", "#", "$", "%", "^", "&", "(", ")"];
const otherspecials = ["Special-Characters-2", "<", ">", "+", "-", "_"];
const allArrays = [lowercase, uppercase, numbers, numberspecials, otherspecials];
let showOptions = false;

function renderOptions() {
  let optionsList = `<div id="alloptions">`;
  allArrays.map((x) => {
    optionsList += `
      <div class="quarterpadmarg col" style="background: #1f2937; border-radius: 10px;">
        <input type="checkbox" id="${x[0]}" name="${x[0]}" value="${x[0]}" checked oninput="generate()">
        <label for="${x[0]}">${x[0].replace("-", " ")}</label>
      </div>
    `;
  });
  optionsList += `
    <div class="quarterpadmarg col" style="background: #1f2937; border-radius: 10px;">
      <input id="pwlengthrange" type="range" value="8" min="8" max="20" oninput="generate()" style="width: 100%;">
      <p id="pwlengthvalue" style="text-align: center;"></p>
    </div>
    <p onclick="options()"><sup><em>Hide options</em></sup></p>
    <button class="margin-top-1rem btn-center" onclick="generate()">⚡ Generate passwords</button>
  `;
  optionsDiv.innerHTML = optionsList;
  pwLengthValue = document.getElementById("pwlengthvalue"); //this is a Public scope variable
  pwLengthRange = document.getElementById("pwlengthrange"); //this is a Public scope variable
  pwLengthValue.textContent = pwLengthRange.value;
}
renderOptions();

function getCharList() {
  validChars = [];
  for (let i = 0; i < allArrays.length; i++) {
    if (document.getElementById(allArrays[i][0]).checked) {
      let [, ...tempArr] = allArrays[i];
      validChars = validChars.concat(tempArr);
    }
  }
} 
function randNum(max = 8, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function options() {
  if (!showOptions) {
    showOptions = true;
    optionsDiv.style.display = "block";
  } else {
    showOptions = false;
    optionsDiv.style.display = "none";
  }
}

function copyToClipboard(x) {
  const content = document.getElementById(x);
  if (!content.value) {
    content.disabled = true;
    content.disabled = false;
    return;
  }
  content.select();
  document.execCommand("copy");
  content.disabled = true; //This clears the selection
  content.disabled = false;
  content.style.border = "1px solid white";
  alert("Copied!");
}

function generate() {
  const pwArr = [];
  pwLengthValue.textContent = pwLengthRange.value;
  getCharList();
  let pwLength = pwLengthRange.value;
  for (let i = 0; i < 4; i++) { //the 4 here is b/c this project creates 4 passwords
    let temp = [];
    for (let j = 0; j < pwLength; j++) {
      temp.push(validChars[randNum(validChars.length, 0)]);
    }
    temp = temp.join("");
    pwArr.push(temp);
  }
  renderPasswords(pwArr);
  const pwBoxes = ["one", "two", "three", "four"];
  pwBoxes.map((x) => {
    let pwContent = document.getElementById(x);
    pwContent.style.border = "none";
  }); //This clears the border selection for the passwords when a new password group is created
}
function renderPasswords(pwArr) {
  oneEl.value = pwArr[0];
  twoEl.value = pwArr[1];
  threeEl.value = pwArr[2];
  fourEl.value = pwArr[3];
}

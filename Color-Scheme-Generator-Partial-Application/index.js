const colorInput = document.getElementById("color-input")
const colorScheme = document.getElementById("color-scheme")
const toggleAnimationBtn = document.getElementById("toggle-animation-btn")
let toggleAnimationVar = false

function toggleAnimation() {
  toggleAnimationVar = !toggleAnimationVar;
  toggleAnimationVar ? toggleAnimationBtn.innerText = "Animations On" : toggleAnimationBtn.innerText = "Animations Off"
} //Turns animation of the color list on/off
toggleAnimationBtn.addEventListener("click", toggleAnimation)

function copyText() { 
  navigator.clipboard.writeText(event.target.innerText.split(/\n/)[1]);
  alert(`Copied ${event.target.innerText.split(/\n/)[1]}`)
} //Copies hex value from the color list element clicked on

function getData(baseURL) {
  return function(route) {
    return function(parameters="") {
      return function(callback="") {
        fetch(`${baseURL}${route}${parameters}`)
         .then(res => res.json())
         .then(data => callback(data));
      }
    }    
  }
}

const getColorScheme = getData(`https://www.thecolorapi.com`);
const getColorSchemePath = getColorScheme(`/scheme`);
const getColorSchemeParameters = () => {
  const color = colorInput.value.slice(1);
  const scheme = colorScheme.value
  return getColorSchemePath(`?hex=${color}&mode=${scheme}&count=5`);
}

function renderColorSchemeHtml() {
  const getColorSchemeHtml = getColorSchemeParameters()
  getColorSchemeHtml(data => {
    let html = "";
    for (let color of data.colors) {
      html += `
        <div class="color">
            <div class="display-color rotate-animation-${toggleAnimationVar}" style="background: ${color.hex.value};" onclick="copyText()">
              <h2 class="hex wideflex">${color.name.value}<br>
              ${color.hex.value}</h2>
            </div>
        </div>
      `
    }
    document.getElementById("colors").innerHTML = html;
  })//
}

document.getElementById("my-btn").addEventListener("click", renderColorSchemeHtml)
renderColorSchemeHtml()
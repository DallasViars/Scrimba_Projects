/* Global variable declarations */
const colorInput = document.getElementById("color-input")
const colorScheme = document.getElementById("color-scheme")
const toggleAnimationBtn = document.getElementById("toggle-animation-btn")
let toggleAnimationVar = false

/* Event Listeners */
toggleAnimationBtn.addEventListener("click", toggleAnimation)
document.getElementById("my-btn").addEventListener("click", getColors)

/* Functions */
function getColors() {
  let color = colorInput.value
  let scheme = colorScheme.value
  fetch(`https://www.thecolorapi.com/scheme?hex=${color.slice(1)}&mode=${scheme.toLowerCase()}&count=5`)
    .then(res => res.json())
    .then(colorList => {
      let resColors = colorList.colors.map(resp => {
        return {hex: resp.hex.value, name: resp.name.value }
      }) //Grabs the color list and retrieves hex code and color name
    colorHtml(resColors)
  })
} //Gets color hex code and color name from API
function colorHtml(resColors) {
  let html = ""
  for (color of resColors) {
    html += `
      <div class="color">
          <div class="display-color rotate-animation-${toggleAnimationVar}" style="background: ${color.hex};" onclick="copyText()">
            <h2 class="hex wideflex">${color.name}<br>
            ${color.hex}</h2>
          </div>
      </div>
    `
  }
  document.getElementById("colors").innerHTML = html;
} //Generates the HTML for the color list
function toggleAnimation() {
  toggleAnimationVar = !toggleAnimationVar;
  toggleAnimationVar ? toggleAnimationBtn.innerText = "Animations On" : toggleAnimationBtn.innerText = "Animations Off"
} //Turns animation of the color list on/off
function copyText() {
  navigator.clipboard.writeText(event.target.innerText.split(/\n/)[1]);
  alert(`Copied ${event.target.innerText.split(/\n/)[1]}`)
} //Copies hex value from the color list element clicked on

//Default function call
getColors()
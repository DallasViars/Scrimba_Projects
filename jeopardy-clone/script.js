const API = `https://jservice.io/api`;
const board = document.getElementById("board");
const categories = 5;
const answers = 5;
const offset = Math.floor(Math.random() * 1000);
const modal = document.getElementById("clue-modal");
let html = "";

async function getCategories() {
  const response = await fetch(`${API}/categories/?count=${categories}&offset=${offset}`);
  const data = await response.json();
  getCategoriesHTML(data);
  // console.log(data)
}

function getCategoriesHTML(data) {
  html = data.map(category => {
    return `<div class="board-category" data-category-id="${category.id}">${category.title}</div>`;
  }).join("");
  for (let category of data) {
    for (let k = 0; k < answers; k++) {
      html += `<div class="board-answer" style="grid-row: ${k+3}" data-category-id="${category.id}">$${(k+1)*2}00</div>` ;
    }
  }
  document.getElementById("board-header").innerText = "CATEGORIES";
  board.innerHTML += html;
  boardAnswers = document.getElementsByClassName("board-answer");
  for (let answer of boardAnswers) {
    answer.addEventListener("click", () => {
      const target = event.target;
      if (!modal.classList.contains("modal-hidden")) {
        
      } else {
        if (target.classList.contains("board-answer") && !target.classList.contains("board-answer-done")) {
          const categoryId = event.target.dataset.categoryId;
          const clueValue = event.target.innerText;
          getCluesModal(categoryId, clueValue);
          event.target.classList.add("board-answer-done");
          event.target.style.color = "rgba(100, 100 , 100 , 0.66)";
        }
      }
    })
  }
}

getCategories();

async function getCluesModal(categoryId, clueValue) {
  const response = await fetch(`${API}/clues/?category=${categoryId}&value=${clueValue.slice(1)}`);
  // console.log(response);
  const clues = await response.json();
  // console.log(clues);
  let modalHTML = `${clues[0].question}`;
  modal.innerHTML = modalHTML;
  modal.classList.toggle("modal-hidden");
}

modal.addEventListener("click", () => {
  modal.classList.add("modal-hidden");
})
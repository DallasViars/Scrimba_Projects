const homeEl = document.querySelector("#home");
const guestEl = document.querySelector("#guest");
const AllScoreBtn = document.querySelectorAll(".scoreboard-btn");
const gameOverEl = document.querySelector(".game-over");
const winMsgEl = document.querySelector(".win-msg");
const resetBtn = document.querySelector("#reset-game");
const homeTeamScore = handleScore(homeEl);
const guestTeamScore = handleScore(guestEl);

resetBtn.addEventListener("click", resetGame);

AllScoreBtn.forEach(button => button.addEventListener("click", event => {
  if (event.target.dataset.team === "home") {
    homeTeamScore(false, event);
  } else {
    guestTeamScore(false, event);
  }

  let home = parseInt(homeEl.textContent);
  let guest = parseInt(guestEl.textContent);

  updateScoreboard(home, guest);
  checkScore(home, guest);
   
}));

function handleScore(element) {
  let score = 0;
  return function addScore(reset, event) {
      if (reset) {
          score = 0;
          homeEl.textContent = String(score).padStart(2, '0');
          guestEl.textContent = String(score).padStart(2, '0');
          return;
      }

      const goalAmount = parseInt(event.target.dataset.score)
      score += goalAmount;
      element.textContent = String(score).padStart(2, '0');
  }
}

function updateScoreboard(home, guest) {
  if (home === guest) {
      homeEl.classList.add("leader");
      guestEl.classList.add("leader");
  } else if (home > guest) {
      homeEl.classList.add("leader");
      guestEl.classList.remove("leader");
  } else {
      guestEl.classList.add("leader");
      homeEl.classList.remove("leader");
  }
}

function checkScore(home, guest) {
  if (home >= 21 || guest >= 21) {
    home > guest ? endGame("Home") : endGame("Visiting")
  }
}

function endGame(winner) {
  AllScoreBtn.forEach(button => button.disabled = true);
  winMsgEl.textContent = `${winner} team wins!`;
  gameOverEl.style.display = "block";
}

function resetGame() {
  homeTeamScore(true);
  guestTeamScore(true);
  winMsgEl.textContent = "";
  gameOverEl.style.display = "none";
  AllScoreBtn.forEach(button => button.disabled = false);
  homeEl.classList.remove("leader");
  guestEl.classList.remove("leader");
}
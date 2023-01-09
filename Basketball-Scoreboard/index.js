const homeScore = document.querySelector("#home");
const guestScore = document.querySelector("#guest");
const scoreButtons = document.querySelectorAll(".scoreboard-btn");
const gameOverEl = document.querySelector(".game-over");
const winMsgEl = document.querySelector(".win-msg");
const resetBtn = document.querySelector("#reset-game");
let homeTeam = 0;
let guestTeam = 0;
const homeTeamScore = handleScore();
const guestTeamScore = handleScore();
resetBtn.addEventListener("click", resetGame);

function resetGame() {
  homeTeam = homeTeamScore(true);
  guestTeam = guestTeamScore(true);
  winMsgEl.textContent = "";
  updateScoreboard(homeTeam, guestTeam);
  gameOverEl.style.display = "none";
  scoreButtons.forEach(button => {
    button.disabled = false;
  });
  homeScore.classList.remove("leader");
  guestScore.classList.remove("leader");
}




scoreButtons.forEach(button => button.addEventListener("click", event => {
  
  if (event.target.dataset.team === "home") {
    homeTeam = homeTeamScore(false, event)
  } else {
    guestTeam = guestTeamScore(false, event)
  }

  updateScoreboard(homeTeam, guestTeam);
  checkScore(homeTeam, guestTeam);
   
}));

function handleScore(reset, event) {
  let score = 0;
  return function addScore(reset, event) {
      if (reset) {
          score = 0;
          return score;
      }
      const goalAmount = parseInt(event.target.dataset.score)
      score += goalAmount;
      return score;
  }
}

function updateScoreboard(home, guest) {
  homeScore.textContent = String(home).padStart(2, '0');
  guestScore.textContent = String(guest).padStart(2, '0');
  if (home === guest) {
      homeScore.classList.add("leader");
      guestScore.classList.add("leader");
  } else if (home > guest) {
      homeScore.classList.add("leader");
      guestScore.classList.remove("leader");
  } else {
      guestScore.classList.add("leader");
      homeScore.classList.remove("leader");
  }
}

function checkScore(home, guest) {
  if (home >= 21 || guest >= 21) {
    home > guest ? endGame("Home") : endGame("Visiting")
  }
}

function endGame(winner) {
    scoreButtons.forEach(button => {
        button.disabled = true;
    });
    winMsgEl.textContent = `${winner} team wins!`;
    gameOverEl.style.display = "block";
}


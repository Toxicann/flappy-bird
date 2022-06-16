let playerObj = document.querySelector("#player");

let score = 0;
let levelDifficulty = 5;

/* A setInterval function that is called every 25ms. It checks if the player is jumping and if the
player is not jumping it checks if the player is below the height of the screen. If the player is
below the height of the screen it calls the gravity function. If the player is not below the height
of the screen it sets the player to dead and clears the interval. */

var gravity = setInterval(() => {
  if (player.isJumping === false) {
    if (player.playerPos.top < HEIGHT - 50) {
      player.gravity();
    } else {
      player.isDead = true;
      clearInterval(gravity);
      playerObj.style.top = toPX(HEIGHT - 50);
    }
  }
}, 25);

/**
 * If the player is not dead, then if the player's top position is less than or equal to 0, then set
 * the player's top position to 0, otherwise subtract 55 from the player's top position, set the
 * player's gravity velocity to 0, and set the player's top position to the player's top position.
 */
const jump = () => {
  player.isJumping = true;
  console.log(player.isDead);
  if (player.isDead == false) {
    player.playerPos.top - 55 <= 0
      ? player.playerPos.top
      : (player.playerPos.top -= 55);
    player.gravityV = 0;
    playerObj.style.top = toPX(player.playerPos.top);
  }
  player.isJumping = false;
};

let obsArray = [];
let i = 0;
let obstacleSpawner = setInterval(startGame, 2000);

/**
 * If the player is starting a new game, then run the game.
 */
function runGame() {
  player.isNewGame = false;
}

/**
 * It's a function that starts the game.
 */
function startGame() {
  console.log("re");
  let score = document.getElementById("score");
  let start = document.getElementById("start");
  if (player.isNewGame == false) {
    if (start) {
      start.style.display = "none";
    }
    score.style.display = "block";
    const obstacles = new Obstacles(i, HEIGHT, WIDTH, GAP_HEIGHT);
    obsArray.push(obstacles);
    i++;
  }
}

/**
 * It's a function that displays the scoreboard and the scores.
 */

function scoreBoard() {
  const scoreBoard = document.querySelector("#scoreboard");
  scoreBoard.style.display = "block";
  const yourScore = document.querySelector("#yourscore");
  yourScore.innerHTML = `Your Score: ${player.score} `;
  const highScore = document.querySelector("#highscore");
  highScore.innerHTML = `HighScore: ${localStorage.HighCount}`;
}

/**
 * It stops the game when the player dies.
 */
function stop() {
  player.setPlayerAnimation();
  if (player.isDead == true) {
    clearInterval(obstacleSpawner);
    const window = document.querySelector("#window");
    const pillars = document.querySelectorAll(".pillar");
    const pillarsA = Array.from(pillars);
    pillarsA.forEach((pillar) => {
      window.removeChild(pillar);
    });
    obsArray = [];
    scoreBoard();
  }
}

/**
 * It loops through the array of obstacles and checks for collision.
 */
function play() {
  obsArray.forEach((obstacles) => {
    obstacles.checkCollision();
  });
  stop();
  window.requestAnimationFrame(() => {
    play();
  });
}

play();

/**
 * If the player is dead, remove the animation and rotate the player.
 */
const setPlayerAnimation = () => {
  if (player.isDead) {
    playerObj.style.animation = "none";
    playerObj.style.transform = "rotate(55deg)";
  }
};

setInterval(() => {
  obsArray.forEach((obstacles) => {
    obstacles.remove();
  });
}, 10000);

/**
 * Restart() is a function that clears the window, creates a new player, and starts the game.
 */
function restart() {
  const window = document.querySelector("#window");
  window.innerHTML = "";
  player = new Player(2.5, 2);
  playerObj = document.querySelector("#player");
  player.isNewGame = false;
  const scoreBoard = document.querySelector("#scoreboard");

  gravity = setInterval(() => {
    player.gravity();
  }, 25);

  scoreBoard.style.display = "none";
  let score = document.createElement("h1");
  score.setAttribute("id", "score");
  window.appendChild(score);
  score.innerHTML = `${0}`;

  obstacleSpawner = setInterval(startGame, 2000);
}

const playerObj = document.querySelector("#player");

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

function startGame() {
  const score = document.getElementById("score");
  const start = document.getElementById("start");
  if (player.isNewGame == false) {
    start.style.display = "none";
    score.style.display = "block";
    const obstacles = new Obstacles(i, HEIGHT, WIDTH, GAP_HEIGHT);
    obsArray.push(obstacles);
    i++;
  }
}

// let speedIncrease = setInterval(() => {
//   const level = document.querySelectorAll(".pillar");
//   const levelArr = Array.from(level);

//   levelDifficulty < 3 ? (levelDifficulty -= 1) : (levelDifficulty = 3);
//   levelArr.forEach((l) => {
//     l.style.animation = `movePillar ${levelDifficulty}s linear forwards`;
//     console.log(window.getComputedStyle(l).animation);
//   });
// }, 5000);

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

// function startGame() {}
// const startButton = {}

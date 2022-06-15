class Obstacles {
  constructor(id, HEIGHT, WIDTH, GAP_HEIGHT) {
    this.id = id;
    this.topTubeHeight;
    // this.bottomTubeHeight;
    this.height = HEIGHT;
    this.width = WIDTH;
    this.gap_height = GAP_HEIGHT;
    this.create();
  }

  topTubeHeightCalculator() {
    this.topTubeHeight = getRandonInt(0, this.height - this.gap_height);
    // console.log(this.topTubeHeight);
    return this.topTubeHeight;
  }

  create() {
    const window = document.querySelector("#window");

    const top_pillar = document.createElement("div");
    top_pillar.setAttribute("class", `pillar p${this.id}`);
    top_pillar.setAttribute("id", "pillar--top");
    top_pillar.style.height = toPX(this.topTubeHeightCalculator());
    top_pillar.style.top = toPX(0);

    window.appendChild(top_pillar);

    const bottom_pillar = document.createElement("div");
    bottom_pillar.setAttribute("class", `pillar p${this.id}`);
    bottom_pillar.setAttribute("id", "pillar--bottom");
    bottom_pillar.style.height = toPX(
      this.height - parseInt(top_pillar.style.height) - this.gap_height
    );
    // console.log(top_pillar.style.height);
    bottom_pillar.style.top = toPX(
      parseInt(top_pillar.style.height) + this.gap_height
    );

    window.appendChild(bottom_pillar);
  }

  // checkPos(object) {
  //   return {
  //     top: parseInt(window.getComputedStyle(object).top),
  //     bottom: parseInt(window.getComputedStyle(object).bottom),
  //     left: parseInt(window.getComputedStyle(object).left),
  //     right: parseInt(window.getComputedStyle(object).right),
  //   };
  // }

  remove() {
    const window = document.querySelector("#window");
    const pillar = document.querySelectorAll(`.p${this.id}`);
    const pillarArray = Array.from(pillar);
    // console.log(pillarArray);

    pillarArray.forEach((pillars) => {
      const pillarPos = checkPos(pillars);
      // console.log(pillarPos);
      if (pillarPos.left - this.width < -10) {
        window.removeChild(pillars);
        obsArray.shift();
      }
    });
  }

  // updatePositions() {
  //   const pillarTop = document.querySelector(`#pillar--top.p${this.id}`);
  //   const pillarBottom = document.querySelector(`#pillar--bottom.p${this.id}`);
  //   console.log(pillarTop);
  //   let playerPos = this.checkPos(playerObj);
  //   let topPillarPos = this.checkPos(pillarTop);
  //   let bottomPillarPos = this.checkPos(pillarBottom);
  // }

  checkCollision() {
    const pillarTop = document.querySelector(`#pillar--top.p${this.id}`);
    const pillarBottom = document.querySelector(`#pillar--bottom.p${this.id}`);
    const playerObj = document.querySelector("#player");
    // console.log(pillarTop);
    let playerPos = checkPos(playerObj);
    let topPillarPos = checkPos(pillarTop);
    let bottomPillarPos = checkPos(pillarBottom);
    if (
      (playerPos.top < topPillarPos.top + this.topTubeHeight &&
        playerPos.left + 50 > topPillarPos.left &&
        playerPos.left < topPillarPos.left + this.width) ||
      (playerPos.top + 50 > bottomPillarPos.top &&
        playerPos.left + 50 > bottomPillarPos.left &&
        playerPos.left < bottomPillarPos.left + this.width)
    ) {
      // console.log("collisison");
      player.isDead = true;
    } else if (playerPos.left + 50 > topPillarPos.left && !player.isDead) {
      if (this.id == player.score) {
        player.score += 1;
        console.log("ree");
      }
      const scoreboard = document.querySelector("#score");
      scoreboard.innerHTML = `${player.score}`;
      if (player.score > localStorage.HighCount) {
        localStorage.HighCount = player.score;
      }
    }
  }
}

let obsArray = [];
let i = 0;
let obstacleSpawner = setInterval(startGame, 2000);

function startGame() {
  const score = document.getElementById("score");
  const start = document.getElementById("start");
  if (player.isNewGame == false) {
    start.style.display = "none";
    score.style.display = "block";
    const obstacles = new Obstacles(i, HEIGHT, WIDTH, GAP_HEIGHT);
    obsArray.push(obstacles);
    i++;
  } else {
  }
}

function scoreBoard() {
  const scoreBoard = document.querySelector("#scoreboard");
  scoreBoard.style.display = "block";
  const yourScore = document.querySelector("#yourscore");
  yourScore.innerHTML = `Your Score: ${player.score} `;
  const highScore = document.querySelector("#highscore");
  highScore.innerHTML = `HighScore: ${localStorage.HighCount}`;
}

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

function play() {
  // player.setPlayerAnimation();
  obsArray.forEach((obstacles) => {
    obstacles.checkCollision();
    // obstacles.remove();
  });
  stop();
  window.requestAnimationFrame(() => {
    play();
  });
}

play();

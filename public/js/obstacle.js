class Obstacles {
  constructor(id, HEIGHT, WIDTH, GAP_HEIGHT) {
    this.id = id;
    this.topTubeHeight;
    this.height = HEIGHT;
    this.width = WIDTH;
    this.gap_height = GAP_HEIGHT;
    this.create();
  }

  /**
   * This function returns a random integer between 0 and the height of the canvas minus the height of
   * the gap.
   * @returns The topTubeHeight value is being returned.
   */
  topTubeHeightCalculator() {
    this.topTubeHeight = getRandonInt(0, this.height - this.gap_height);
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
    bottom_pillar.style.top = toPX(
      parseInt(top_pillar.style.height) + this.gap_height
    );

    window.appendChild(bottom_pillar);
  }

  remove() {
    const window = document.querySelector("#window");
    const pillar = document.querySelectorAll(`.p${this.id}`);
    const pillarArray = Array.from(pillar);

    pillarArray.forEach((pillars) => {
      const pillarPos = checkPos(pillars);
      // console.log(pillarPos);
      if (pillarPos.left - this.width < -10) {
        window.removeChild(pillars);
        obsArray.shift();
      }
    });
  }

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

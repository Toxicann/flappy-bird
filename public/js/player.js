class Player {
  constructor(gravityV, fallSpeed) {
    this.isNewGame = true;
    this.score = 0;
    this.fallSpeed = fallSpeed;
    this.gravityV = gravityV;
    this.playerPos = {};
    this.isJumping = false;
    this.isDead = false;

    this.create();
    this.getPlayerCords();

    localStorage.HighCount =
      localStorage.HighCount === undefined ? 0 : localStorage.HighCount;
  }

  create() {
    const window = document.querySelector("#window");
    this.element = document.createElement("div");
    this.element.setAttribute("id", "player");
    window.appendChild(this.element);
  }

  //   checkPos(object) {
  //     return {
  //       top: parseInt(window.getComputedStyle(object).top),
  //       bottom: parseInt(window.getComputedStyle(object).bottom),
  //       left: parseInt(window.getComputedStyle(object).left),
  //       right: parseInt(window.getComputedStyle(object).right),
  //     };
  //   }

  getPlayerCords() {
    const player = document.querySelector("#player");
    this.playerPos = {
      top: parseInt(window.getComputedStyle(player).top),
      left: parseInt(window.getComputedStyle(player).left),
    };
    // console.log(this.playerPos);
  }

  gravity() {
    if (this.isNewGame == false) {
      this.element = document.querySelector("#player");
      this.playerPos.top += this.fallSpeed * this.gravityV;
      this.element.style.top = toPX(this.playerPos.top);
      this.gravityV += 0.4;
    }

    // console.log(this.fallSpeed * this.gravityV);
  }

  setPlayerAnimation() {
    const playerObj = document.querySelector("#player");
    if (this.isDead) {
      playerObj.style.animation = "none";
      playerObj.style.transform = "rotate(55deg)";
    }
  }
}

const player = new Player(2.5, 2);

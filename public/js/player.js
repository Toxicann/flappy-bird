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

  /**
   * It creates a div element with the id of "player" and appends it to the div element with the id of
   * "window".
   */
  create() {
    const window = document.querySelector("#window");
    this.element = document.createElement("div");
    this.element.setAttribute("id", "player");
    window.appendChild(this.element);
  }

  /**
   * It gets the player's position and stores it in the playerPos object.
   */
  getPlayerCords() {
    const player = document.querySelector("#player");
    this.playerPos = {
      top: parseInt(window.getComputedStyle(player).top),
      left: parseInt(window.getComputedStyle(player).left),
    };
  }

  /**
   * It moves the player down the screen.
   */
  gravity() {
    if (this.isNewGame == false) {
      this.element = document.querySelector("#player");
      this.playerPos.top += this.fallSpeed * this.gravityV;
      this.element.style.top = toPX(this.playerPos.top);
      this.gravityV += 0.4;
    }
  }

  /**
   * "If the player is dead, remove the animation and rotate the player."
   *
   * The problem is that the player is not rotating.
   *
   * I've tried using the following code:
   */
  setPlayerAnimation() {
    const playerObj = document.querySelector("#player");
    if (this.isDead) {
      playerObj.style.animation = "none";
      playerObj.style.transform = "rotate(55deg)";
    }
  }
}

const player = new Player(2.5, 2);

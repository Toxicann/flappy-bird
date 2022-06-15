const playerObj = document.querySelector("#player");
let score = 0;

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

const jump = () => {
  player.isNewGame = false;
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

// setInterval(() => {
//   for (let i = 0; i < obsArray.length; i++) {
//     const pillarTop = document.querySelector(`#pillar--top.p${obsArray[1].id}`);
//     const pillarBottom = document.querySelector(
//       `#pillar--bottom.p${obsArray[1].id}`
//     );
//     console.log(pillarTop);
//     let playerPos = checkPos(playerObj);
//     let topPillarPos = checkPos(pillarTop);
//     let bottomPillarPos = checkPos(pillarBottom);

//     if (
//       (playerPos.top < topPillarPos.top + obsArray[i].topTubeHeight &&
//         playerPos.left + 50 > topPillarPos.left &&
//         playerPos.left < topPillarPos.left + obsArray[i].width) ||
//       (playerPos.top + 50 > bottomPillarPos.top &&
//         playerPos.left + 50 > bottomPillarPos.left &&
//         playerPos.left < bottomPillarPos.left + obsArray[i].width)
//     ) {
//       playerObj.style.backgroundColor = "red";
//       player.isDead = true;
//       // setPlayerAnimation();
//     } else {
//       playerObj.style.backgroundColor = "green";
//     }
//   }
// }, 10);

// const collision = () => {
//   for (let i = 0; i < obsArray.length; i++) {
//     const pillarTop = document.querySelector(`#pillar--top.p${obsArray[i].id}`);
//     const pillarBottom = document.querySelector(
//       `#pillar--bottom.p${obsArray[i].id}`
//     );
//     // console.log(pillarTop);
//     let playerPos = checkPos(playerObj);
//     let topPillarPos = checkPos(pillarTop);
//     let bottomPillarPos = checkPos(pillarBottom);

//     if (
//       (playerPos.top < topPillarPos.top + obsArray[i].topTubeHeight &&
//         playerPos.left + 50 > topPillarPos.left &&
//         playerPos.left < topPillarPos.left + obsArray[i].width) ||
//       (playerPos.top + 50 > bottomPillarPos.top &&
//         playerPos.left + 50 > bottomPillarPos.left &&
//         playerPos.left < bottomPillarPos.left + obsArray[i].width)
//     ) {
//       playerObj.style.backgroundColor = "red";
//       player.isDead = true;
//       // setPlayerAnimation();
//     } else {
//       playerObj.style.backgroundColor = "green";
//     }
//   }
// };

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

// function play() {
//   // setInterval(() => {
//   //   ballArray.forEach((balls) => {
//   //     balls.element.style.backgroundColor = COLOR;
//   //   });
//   // }, 4000);
//   collision();
//   window.requestAnimationFrame(() => {
//     play();
//   });
// }

// play();

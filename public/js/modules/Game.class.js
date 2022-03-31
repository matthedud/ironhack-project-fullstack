import { Bullet } from "./Bullet.class.js";
import {
  colors,
  floorValue,
  endValue,
  startValue,
  wallValue,
  playerSize,
} from "./Constants.js";

export class Game {
  constructor(
    id,
    grid2D = [],
    player = {},
    historic = [],
    recordRate = 100,
    historicBulletServer = [],
    isServer = false,
    sendGame
  ) {
    this.id = id;
    this.grid2D = grid2D;

    this.gameInterval = null;
    this.frameRate = 30;
    this.bullets = [];
    this.nextBulletId = historicBulletServer.length;
    this.historicBullets = [...historicBulletServer];
    this.newHistoricBullet = [...historicBulletServer];
    this.player = player;
    this.historic = historic;
    this.ranking = [];
    this.recordRate = recordRate;
    this.isServer = isServer;
    this.sendGame = sendGame;
    this.dimention = null;
    this.chronometer = null;
  }
  drawMaze(ctx) {
    const xOffset = this.player.position.x - this.dimention.viewColumnNum / 2;
    const yOffset = this.player.position.y - this.dimention.viewLineNum / 2;
    for (let y = 0; y < this.dimention.viewLineNum + 1; y++) {
      for (let x = 0; x < this.dimention.viewColumnNum + 1; x++) {
        const lineInd = Math.floor(y + yOffset);
        const cellInd = Math.floor(x + xOffset);
        const canvasIndX = x - (this.player.position.x % 1);
        const canvasIndY = y - (this.player.position.y % 1);
        this.drawCell(ctx, cellInd, lineInd, canvasIndX, canvasIndY);
      }
    }
    this.player.draw(ctx);
    const ind = this.getHistoricInd();
    this.historic.forEach((otherPlayer) => {
      const coord = otherPlayer.playerMove[ind];
      if (coord) {
        if (
          this.isInView(Number(coord.x), Number(coord.y), this.player.position)
        ) {
          this.drawOtherPlayer(
            ctx,
            Number(coord.x) - xOffset,
            Number(coord.y) - yOffset,
            otherPlayer
          );
        }
        this.checkVictory({ ...otherPlayer, position: coord });
      }
    });
    this.bullets.forEach((bullet) => {
      if (
        this.isInView(
          bullet.position.x,
          bullet.position.y,
          this.player.position
        )
      ) {
        bullet.draw(
          ctx,
          xOffset,
          yOffset,
          this.dimention.cellWidth,
          this.dimention.cellheight
        );
      }
    });
    this.drawBulletCount(ctx);
  }

  drawCell(ctx, cellInd, lineInd, canvasIndX, canvasIndY) {
    if (this.isWall(cellInd, lineInd)) {
      ctx.fillStyle = colors.wall;
    } else {
      switch (this.grid2D[lineInd][cellInd]) {
        case floorValue:
          ctx.fillStyle = colors.floor;
          break;
        case startValue:
          ctx.fillStyle = colors.start;
          break;
        case endValue:
          ctx.fillStyle = colors.end;
          break;
      }
    }
    const x =
      canvasIndX * this.dimention.cellWidth +
      this.dimention.canvasWidth / 2 -
      this.dimention.canvasWidth / 2;
    const y = canvasIndY * this.dimention.cellheight;
    ctx.beginPath();
    ctx.fillRect(x, y, this.dimention.cellWidth, this.dimention.cellheight);
  }

  drawBulletCount(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "48px jaapokkisubtractregularRg";
    ctx.fillText(this.player.bullets, 10, 50);
  }

  //-----------------------------------------------------
  drawMazeBIG(context) {
    const cellWidth = this.dimention.canvasWidth / this.grid2D[0].length;
    const cellheight = this.dimention.canvasHeight / this.grid2D.length;
    this.grid2D.forEach((line, lineInd) => {
      line.forEach((cell, cellInd) => {
<<<<<<< HEAD
        this.drawCellBIG(context, cell, cellInd, lineInd, cellWidth, cellheight)
      })
    })
    this.player.drawBIG(context, this.player.position.x, this.player.position.y, cellWidth, cellheight)
    const ind = this.getHistoricInd()
=======
        this.drawCellBIG(cell, cellInd, lineInd, cellWidth, cellheight);
      });
    });
    this.player.drawBIG(
      this.player.position.x,
      this.player.position.y,
      cellWidth,
      cellheight
    );
    const ind = this.getHistoricInd();
>>>>>>> 24175356688f7519f8a922e44b0397c340d4ab95
    this.historic.forEach((otherPlayer) => {
      const coord = otherPlayer.playerMove[ind];
      if (coord) {
        this.player.drawBIG(
          context,
          Number(coord.x),
          Number(coord.y),
          cellWidth,
          cellheight
        );
      }
    });
  }
  drawCellBIG(context, cell, cellInd, lineInd, cellWidth, cellheight) {
    if (context) {
      switch (cell) {
        case wallValue:
          context.fillStyle = colors.wall;
          break;
        case floorValue:
          context.fillStyle = colors.floor;
          break;
        case startValue:
          context.fillStyle = colors.start;
          break;
        case endValue:
          context.fillStyle = colors.end;
          break;
      }
      const x =
        cellInd * cellWidth +
        this.dimention.canvasWidth / 2 -
        this.dimention.canvasWidth / 2;
      const y = lineInd * cellheight;
      context.beginPath();
      context.fillRect(x, y, cellWidth, cellheight);
    }
  }
  //-----------------------------------------------------

  isInView(x, y, playerPosition) {
    return (
      x > playerPosition.x - this.dimention.viewColumnNum / 2 &&
      x < playerPosition.x + this.dimention.viewColumnNum / 2 &&
      y > playerPosition.y - this.dimention.viewLineNum / 2 &&
      y < playerPosition.y + this.dimention.viewLineNum / 2
    );
  }

  drawOtherPlayer(ctx, x, y, player) {
    const playerWidth = playerSize * this.dimention.cellWidth;
    ctx.fillStyle = player?.user?.color ? player.user.color : colors.playerGost;
    ctx.beginPath();
    ctx.arc(
      x * this.dimention.cellWidth,
      y * this.dimention.cellheight,
      playerWidth,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.fill();
  }

  isWall(x, y) {
    if (x < 0 || y < 0 || y >= this.grid2D.length || x >= this.grid2D[0].length)
      return true;
    return this.grid2D[Math.floor(y)][Math.floor(x)] === wallValue;
  }

  isPlayer(xBullet, yBullet) {
    const { x, y } = this.player.position;
    const touchPlayer =
      xBullet > x - playerSize &&
      xBullet < x + playerSize &&
      yBullet > y - playerSize &&
      yBullet < y + playerSize;
    if (touchPlayer) {
      this.player.stopLogs();
      this.player.stopMove();
      this.player.color = "rgba(36, 39, 41, 0)";
      // this.endGame()
    }
    const ind = this.getHistoricInd();
    const deadPlayerInd = this.historic.findIndex((otherPlayer) => {
      const coord = otherPlayer.playerMove[ind];
      return (
        xBullet > Number(coord?.x) - playerSize &&
        xBullet < Number(coord?.x) + playerSize &&
        yBullet > Number(coord?.y) - playerSize &&
        yBullet < Number(coord?.y) + playerSize
      );
    });
    if (deadPlayerInd > -1) {
      const rankInd = this.ranking.findIndex(
        (el) => el.playerIND === this.historic[deadPlayerInd].playerIND
      );
      if (rankInd > -1) this.ranking.splice(rankInd, 1);
      this.historic.splice(deadPlayerInd, 1);
      return true;
    }
    return false;
  }

  runGameLoop(ctx, context) {
    this.chronometer.start();
    if (!this.isServer) {
      this.player.startLogs(this.recordRate);
      this.player.startMove(this);
    }
    this.gameInterval = setInterval(() => {
      if (!this.isServer) {
<<<<<<< HEAD
        this.clearCanvas(ctx)
        if (context) this.drawMazeBIG(context)
        this.drawMaze(ctx)
=======
        this.clearCanvas(ctx);
        // this.drawMazeBIG(context)
        this.drawMaze(ctx);
>>>>>>> 24175356688f7519f8a922e44b0397c340d4ab95
      }
      this.checkBulletHistory();
      this.checkEndGame();
    }, this.frameRate);
  }

  getHistoricInd() {
    const index = Math.floor(
      (this.chronometer.currentTime * 10) / this.recordRate
    );
    return index;
  }

  checkBulletHistory() {
    const currentTime = this.chronometer.currentTime;
    let lastBullet = this.historicBullets[this.historicBullets.length - 1];
    while (lastBullet?.time < currentTime) {
      const playerAlive = this.historic.find(
        (el) => Number(el.playerIND) === Number(lastBullet.playerIND)
      );
      if (playerAlive) {
        const newBullet = new Bullet({
          position: lastBullet.position,
          id: lastBullet._id,
          playerIND: lastBullet.playerIND,
          time: lastBullet.time,
        });
        this.bullets.push(newBullet);
        newBullet.move(this);
      }
      this.historicBullets.pop();
      lastBullet = this.historicBullets[this.historicBullets.length - 1];
    }
  }

  clearCanvas(ctx) {
    ctx.clearRect(
      0,
      0,
      this.dimention.canvasWidth,
      this.dimention.canvasHeight
    );
  }

  pauseGame() {
    if (!this.isServer) {
      this.player.stopLogs();
      this.player.stopMove();
    }
    this.chronometer.stop();
    clearInterval(this.gameInterval);
    this.gameInterval = null;
  }

  placePlayer() {
    for (let y = 0; y < this.grid2D.length; y++) {
      let x = this.grid2D[y].indexOf(10);
      if (x > -1) {
        this.player.position = { y: y + 0.5, x: x + 0.5 };
      }
    }
  }
  checkVictory(player) {
    const cell =
      this.grid2D[Math.floor(player.position.y)][Math.floor(player.position.x)];
    const isInVictoryInd = this.ranking.findIndex(
      (el) => el.playerIND === player.playerIND
    );
    if (isInVictoryInd > -1) {
      if (cell !== endValue) {
        this.ranking.splice(isInVictoryInd, 1);
      }
    } else {
      if (cell === endValue) {
        this.ranking.push({ ...player, time: this.chronometer.currentTime });
      }
    }
  }
  checkEndGame() {
    if (this.chronometer.timeLeft < 0) this.endGame();
  }

  async endGame() {
<<<<<<< HEAD
    this.pauseGame()
    const ranking = this.ranking.map((el) => ({ name: el.name, user: el.userID, time: el.time }))
=======
    this.pauseGame();
    console.log({ player: this.player });
    const ranking = this.ranking.map((el) => ({
      name: el.name,
      user: el.userID,
      time: el.time,
    }));
>>>>>>> 24175356688f7519f8a922e44b0397c340d4ab95
    try {
      if (!this.isServer) {
        const historic = {
          playerIND: this.player.playerIND,
          user: this.player.user,
          playerName: this.player.name,
          map: this.id,
          playerMove: this.player.logs,
<<<<<<< HEAD
        }
        const bullets = [...this.newHistoricBullet].sort((a, b) => b.time - a.time)
        await this.sendGame({ historic, ranking, historicBullets: bullets })
=======
        };
        const bullets = [...this.newHistoricBullet].sort(
          (a, b) => b.time - a.time
        );
        console.log({ bullets });

        await this.sendGame({ historic, ranking, historicBullets: bullets });
>>>>>>> 24175356688f7519f8a922e44b0397c340d4ab95
      } else {
        await this.sendGame(ranking, this.id);
      }
    } catch (error) {
      console.log({ error });
    }
    console.log("game end");
  }
}

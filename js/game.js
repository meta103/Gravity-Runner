class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.player = new Player(100, 450, this.canvas.height, this.ctx);
    this.bullet = new Obstacle();
    this.Bullets = [];
    this.disabledBullets = [];
    this.points = 0;
    this.level = 1;
    this.secondsForBulletsInterval = 2500;
    this.currentSecondsForBulletInterval = this.secondsForBulletsInterval;
    this.intervalGame = undefined;
    this.generateBulletsInterval = undefined;
    this.gameStatus = "PLAYING";
    this.character = new Image();
    this.background = new Background();
    //Audio effects
    this.music = new Audio();
    this.music.src = "music /ES_City Night Drive 4 - Håkan Eriksson (2).mp3";

    this.disabledRocketAudio = new Audio();
    this.disabledRocketAudio.src = "music /ES_Beep Tone Signal 55 - SFX Producer.mp3";

    this.explosion = new Audio();
    this.explosion.src = "music /ES_Explosion Heavy 4 - SFX Producer.mp3";
  
  }

  //Pantalla de inicio
  welcomeScreen() {
    document.onkeyup = e => {
      switch (e.keyCode) {
        case 32:
          //document.querySelector(".startScreen").style = "display: none";
          document.querySelector(".startScreen").classList.add("hide");
          document.querySelector(".stadistics").classList.remove("hide");
          document.querySelector(".canvasContainer").classList.remove("hide");
          this.music.play();
          this.start();
          break;
      }
    };
  }

  //Start
  start() {
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    this.switchGravity();
    //this.startGeneratingBullets();
    //this.bullet.move();
    this.startGeneratingBullets();
  }

  drawBackground() {
    this.ctx.drawImage(this.background.img, this.background.x, 0);
    if (this.background.speed < 0) {
      this.ctx.drawImage(
        this.background.img,
        this.background.x + this.background.width,
        0
      );
    } else {
      this.ctx.drawImage(
        this.background.img,
        this.background.x - this.background.width,
        0
      );
    }
  }

  moveBackground() {
    // Infinite backgroun loop
    this.background.x += this.background.speed;
    this.background.x %= this.background.width;
  }

  switchGravity() {
    document.onkeyup = e => {
      switch (e.keyCode) {
        case 32:
          this.player.move();
          this.player.switchGravityAudio.play();
          break;
        case 80:
          this.pause();
          break;
      }
    };
  }

  _drawPlayer() {
    // this.ctx.fillRect(this.player.x, this.player.y, this.player.playerWidth, this.player.playerHeight);
    // this.ctx.fillStyle = 'blue';
    this.ctx.drawImage(
      this.player.character,
      this.player.srcX,
      this.player.srcY,
      this.player.widthFrame,
      this.player.heightFrame,
      this.player.x,
      this.player.y,
      this.player.playerWidth,
      this.player.playerHeight
    );
    this.player.getPlayerCoordinates();
  }
  // =====================BULLETS===============================================//
  startGeneratingBullets() { 
    this.generateBulletsInterval = setInterval(function(){this.generateBullets();}.bind(this), this.currentSecondsForBulletInterval);
  }

  generateBullets (){
    this.Bullets.push(new Obstacle());
    
  }

  _drawBullet() {
    //this.ctx.fillRect(this.bullet.x, this.bullet.y, this.bullet.bulletWidth, this.bullet.bulletHeight);
    this.Bullets.forEach((bullet) => {
      bullet.getBulletCoordinates();
      if (this.gameStatus !== "GAMEOVER") {
          this.ctx.drawImage(
          bullet.rocket,
          bullet.srcX,
          bullet.srcY,
          bullet.widthFrame,
          bullet.heightFrame,
          bullet.x,
          bullet.y,
          bullet.bulletWidth,
          bullet.bulletHeight
        )};
      });

    // if (this.gameStatus !== "GAMEOVER") {
    //   this.ctx.drawImage(
    //   this.bullet.rocket,
    //   this.bullet.srcX,
    //   this.bullet.srcY,
    //   this.bullet.widthFrame,
    //   this.bullet.heightFrame,
    //   this.bullet.x,
    //   this.bullet.y,
    //   this.bullet.bulletWidth,
    //   this.bullet.bulletHeight
    // )};
    
  }

  deleteBullets (){
    this.Bullets.forEach((bullet) =>{
      if (bullet.x < -100){
        this.Bullets.splice(bullet.index, 1); 
        //setTimeout(this.generateBullets(), 1000);
        this.generateBullets();
      }
    });
  }

  drawDisabledBullet(){
    this.disabledBullets.forEach((disabledBullet) =>{
      this.ctx.drawImage(
        this.bullet.rocket,
        this.bullet.srcX,
        this.bullet.srcY,
        this.bullet.widthFrame,
        this.bullet.heightFrame,
        disabledBullet.x,
        disabledBullet.y,
        disabledBullet.width,
        disabledBullet.height
      )
    });
  }

  checkCollision() {
    this.Bullets.forEach((bullet) => {
      if (
        this.player.left < bullet.right &&
        this.player.right-10 > bullet.left
      ) {
        if (
          this.player.left > bullet.left &&
          this.player.top+10 < bullet.top &&
          this.player.bottom- 10 > bullet.top
        ) {
          this.disabledRocketAudio.load();
          this.disabledRocketAudio.play();
          this.bullet.status = "disabled";
          this.disabledBullets.push({x: bullet.x, y: bullet.y, width: bullet.bulletWidth, height: bullet.bulletHeight});
          setTimeout(() => {
            this.disabledBullets.splice([0],1);
          }, 200);
          console.log("TOP COLLISION");
          this.Bullets.splice(bullet.index, 1);
          this.checkPoint();
        } else if (
          this.player.left > bullet.left &&
          this.player.top+10 < bullet.bottom &&
          this.player.bottom-10 > bullet.bottom
        ) {
          this.disabledRocketAudio.load();
          this.disabledRocketAudio.play();
          this.bullet.status = "disabled";
          this.disabledBullets.push({x: bullet.x, y: bullet.y, width: bullet.bulletWidth, height: bullet.bulletHeight});
          setTimeout(() => {
            this.disabledBullets.splice([0],1);
          }, 200);
          console.log("BOTTOM COLLISION");
          this.Bullets.splice(bullet.index, 1);
          this.checkPoint();
        } else if (
          this.player.top +10< bullet.bottom &&
          this.player.bottom -10 > bullet.top && 
          this.player.right-10 > bullet.left
        ) {
          console.log("COLLISION");
          this.music.pause();
          this.explosion.play();
          this.player.status = "DEAD";
          this.bullet.status = "exploded";
          this.gameStatus = "GAMEOVER";
          this.disabledBullets.push({x: bullet.x, y: bullet.y, width: bullet.bulletWidth, height: bullet.bulletHeight});
          setTimeout(() => {
            this.disabledBullets.splice([0],1);
          }, 200);
          this.Bullets.splice(bullet.index, 1);
          this.Bullets.forEach((bullet) => {
            bullet.stopBulLetInterval();
            });
          setTimeout(() => {
            this.gameOver();
          }, 400);
        }
      }
    });

  }
  //DOM
  checkPoint() {
    this.points += 1;
    let pointsScreen = document.querySelector("h2");
    pointsScreen.textContent = `SCORE: ${this.points}`;
    this.checkLevel();
  }

  checkLevel() {
    if (this.points % 5 === 0 && this.points > 1) {
      this.level += 1;
      let levelScreen = document.querySelector("h3");
      levelScreen.textContent = `LEVEL: ${this.level}`;
      clearInterval(this.generateBulletsInterval);
      this.currentSecondsForBulletInterval = this.secondsForBulletsInterval / this.level;
      this.startGeneratingBullets();
    }
  }

  stopAnimationFrame() {
    window.cancelAnimationFrame(this.intervalGame);
    this.intervalGame = undefined;
  }

  //PAUSE
  pause() {
    if (this.gameStatus === "PLAYING") {
      this.stopAnimationFrame();
      this.player.stopPlayerInterval();
      this.Bullets.forEach((bullet) => {
        bullet.stopBulLetInterval();
        });
      clearInterval(this.generateBulletsInterval);
      document.querySelector(".opasity").classList.remove("hide");
      document.querySelector(".pauseScreen").classList.remove("hide");
      this.gameStatus = "STOPPED";
    } else if (this.gameStatus === "STOPPED") {
      document.querySelector(".opasity").classList.add("hide");
      document.querySelector(".pauseScreen").classList.add("hide");
      this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
      this.Bullets.forEach((bullet) => {
        bullet.move();
        });
      this.player.resumePlayerInterval();
      this.startGeneratingBullets();
      this.gameStatus = "PLAYING";
    }
  }

  //GAME OVER Screen
  gameOver() {
    this.stopAnimationFrame();
    clearInterval(this.generateBulletsInterval);
    //this.player.stopPlayerInterval();
    document.querySelector(".opasity").classList.remove("hide");
    document.querySelector(".gameOverScreen").classList.remove("hide");
    document.onkeyup = e => {
      switch (e.keyCode) {
        case 32:
          document.location.reload();
          break;
      }
    };
  }

  //Bucle
  _update() {
    this.ctx.clearRect(0, 0, 1020, 550);
    this.drawBackground();
    this.moveBackground();
    this._drawPlayer();
    this._drawBullet();
    this.drawDisabledBullet();
    this.deleteBullets();
    this.checkCollision();
    if (this.intervalGame !== undefined) {
      this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    }
  }
}

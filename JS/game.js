  class Game {
  constructor (ctx, canvas){
    this.ctx=ctx;
    this.canvas = canvas;
    this.player = new Player(100, 450, this.canvas.height, this.ctx);
    this.bullet = new Obstacle ();
    this.points = 0;
    this.level = 1;
    this.intervalGame = 0;
    this.gameStatus = "PLAYING";
    this.character = new Image ();
    this.background = new Background ();
  }
  
//Pantalla de inicio
  welcomeScreen (){
    this.ctx.fillText("PRESS SPACE BAR TO START", 510, 275);
    console.log("PRESS SPACE BAR TO START");
    document.onkeyup = (e) => {
      switch (e.keyCode){
        case 32:
        this.start();
        break;
      }
    }
  }

  //Start
  start (){
    this._update();
    this.switchGravity();
    this.bullet.move();
  }
  drawBackground (){
    this.ctx.drawImage(this.background.img, this.background.x, 0);
    if (this.background.speed < 0) {
      this.ctx.drawImage(this.background.img, this.background.x + this.background.width, 0);
    } else {
      this.ctx.drawImage(this.background.img, this.background.x - this.background.width, 0);
    }
  }

  moveBackground(){
    // Infinite backgroun loop
    this.background.x += this.background.speed; 
    this.background.x %= this.background.width;
  }

  switchGravity (){
    document.onkeyup = (e) => {
      switch (e.keyCode){
        case 32:
        this.player.move();
        break;
        case 80:
        this.pause();
        break;
      }
    }
  }

  _drawPlayer (){
    // this.ctx.fillRect(this.player.x, this.player.y, this.player.playerWidth, this.player.playerHeight);
    // this.ctx.fillStyle = 'blue';
    this.ctx.drawImage(this.player.character, this.player.srcX, this.player.srcY, this.player.widthFrame, this.player.heightFrame, this.player.x, this.player.y, this.player.playerWidth, this.player.playerHeight);
    this.player.getPlayerCoordinates();
  }
  _drawBullet (){
    //this.ctx.fillRect(this.bullet.x, this.bullet.y, this.bullet.bulletWidth, this.bullet.bulletHeight);
    this.ctx.drawImage(this.bullet.rocket, this.bullet.srcX, this.bullet.srcY, this.bullet.widthFrame, this.bullet.heightFrame, this.bullet.x, this.bullet.y, this.bullet.bulletWidth, this.bullet.bulletHeight);
    this.bullet.getBulletCoordinates();
  }
  
 
  checkCollision (){
  //   if (this.player.top < this.bullet.bottom && this.player.bottom > this.bullet.top){
  //     if (this.player.right == this.bullet.left) {
  //       console.log ("COLLISION!!!!!!!!");
  //       }
  //     } else if (this.player.left < this.bullet.right && this.player.right > this.bullet.left){
  //       if (this.player.bottom == this.bullet.top){
  //         console.log("TOP COLLISION");
  //       } else if (this.player.top == this.bullet.bottom){
  //         console.log("BOTTOM COLLISION");
  //       }
  //   }
    if (this.player.left < this.bullet.right && this.player.right > this.bullet.left){
      if (this.player.left > this.bullet.left && this.player.top < this.bullet.top && this.player.bottom > this.bullet.top) {
        console.log("TOP COLLISION");
        this.bullet.x = -100;
        this.checkPoint();
      } else if (this.player.left > this.bullet.left && this.player.top < this.bullet.bottom && this.player.bottom > this.bullet.bottom){
        console.log("BOTTOM COLLISION");
        this.bullet.x = -100;
        this.checkPoint ();
      } else if (this.player.top < this.bullet.bottom && this.player.bottom > this.bullet.top){
        console.log("COLLISION");
        this.gameOver();
      
      }
    }

  }
  //DOM 
  checkPoint (){
    this.points+=1;
    let pointsScreen = document.querySelector("h2");
    pointsScreen.textContent = `SCORE: ${this.points}`;
    this.checkLevel();
  }

  checkLevel(){
    if (this.points % 2 === 0 && this.points > 1){
      this.level+=1;
      let levelScreen = document.querySelector("h3");
      levelScreen.textContent = `LEVEL: ${this.level}`;
      this.bullet.moveFaster();
      //PARA LLAMAR A UN NUEVO BULLET????? Habria que hacer un array me dijo manu!! 
      // if (this.points % 4 === 0){
      //   //this.arrayBullets.push(new Obstacle())
      //   this.bullet.move();
      // }
    } 
  }

 stopAnimationFrame(){
  window.cancelAnimationFrame(this.intervalGame);
 }

  //PAUSE
  pause(){
    if (this.gameStatus === "PLAYING"){
      this.stopAnimationFrame();
      this.player.stopPlayerInterval();
      this.bullet.stopBulLetInterval();
      this.ctx.fillText("PRESS P TO CONTINUE", 510, 275);
      this.gameStatus = "STOPPED";
    } else if (this.gameStatus === "STOPPED") {
      this._update();
      //this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
      this.bullet.move();
      this.player.resumePlayerInterval();
      this.gameStatus = "PLAYING";
    }
  }

  //NO FUNCIONA LA LINEA 133!!
  gameOver(){
    this.stopAnimationFrame();
    this.player.stopPlayerInterval();
    this.bullet.stopBulLetInterval();
    this.gameStatus = "STOPPED";
    this.player.status = "DEAD";
    this.ctx.fillText("GAME OVER", 510, 275);
  }


  //Bucle
   _update(){
    this.ctx.clearRect(0,0, 1020, 550);
    this.drawBackground();
    this.moveBackground ();
    this._drawPlayer ();
    this._drawBullet ();
    this.checkCollision ();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

  
}
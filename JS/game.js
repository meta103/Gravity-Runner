class Game {
  constructor (ctx, canvas){
    this.ctx=ctx;
    this.canvas = canvas;
    this.player = new Player(100, 500, this.canvas.height);
    this.bullet = new Obstacle ();
    // this.coordinatesPlayer = undefined;
    // this.coordinatesBullet = undefined;
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
    //Llamar a la bullet 
    this.bullet.move();
  }

  switchGravity (){
    document.onkeyup = (e) => {
      switch (e.keyCode){
        case 32:
        this.player.move();
        break;
      }
    }
  }

  _drawPlayer (){
    this.ctx.fillRect(this.player.x, this.player.y, this.player.playerWidth, this.player.playerHeight);
    this.ctx.fillStyle = 'green';
    this.player.getPlayerCoordinates();
  }
  _drawBullet (){
    this.ctx.fillRect(this.bullet.x, this.bullet.y, this.bullet.bulletWidth, this.bullet.bulletHeight);
    this.bullet.getBulletCoordinates();
  }
  
  //Bucle
  _update(){
    this.ctx.clearRect(0,0, 1020, 550);
    this._drawPlayer();
    this._drawBullet();
    this.checkCollision();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

  checkCollision(){
    if (this.player.top < this.bullet.bottom && this.player.bottom > this.bullet.top){
      if (this.player.right == this.bullet.left) {
        console.log ("COLLISION!!!!!!!!");
        }
      } else if (this.player.left < this.bullet.right && this.player.right > this.bullet.left){
        if (this.player.bottom == this.bullet.top){
          console.log("TOP COLLISION");
        } else if (this.player.top == this.bullet.bottom){
          console.log("BOTTOM COLLISION");
        }
    }
    
  }

}
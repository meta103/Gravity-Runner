class Game {
  constructor (ctx, canvas){
    this.ctx=ctx;
    this.canvas = canvas;
    this.player = new Player(20, 500, this.canvas.height);
    this.bullet = new Obstacle ();
    this.bulletArray = [];
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
    this.ctx.fillRect(this.player.x, this.player.y, 40, 40);
    this.ctx.fillStyle = 'green';
  }
  _drawBullet (){
    this.ctx.fillRect(this.bullet.x, this.bullet.y, 40, 40);
    if (this.bulletArray.length < 93) {
      this.bulletArray.push({x: this.bullet.x, y:this.bullet.y});
    } else {
      this.bulletArray = [];
    }
  }
  
  //Bucle
  _update(){
    this.ctx.clearRect(0,0, 1020, 550);
    this._drawPlayer();
    this._drawBullet();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

}
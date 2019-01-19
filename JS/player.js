class Player {
  constructor (x, y, canvasHeight, ctx){
    this.ctx = ctx;
    this.gravity = "down";
    this.x = x;
    this.y = y;
    this.intervalId = undefined;
    this.intervalIdSprites = undefined;
    this.canvasHeight = canvasHeight;
    this.playerWidth = 100;
    this.playerHeight = 100;
    //this.coordinatesPlayer = {};
    this.top = 0;
    this.bottom = 0;
    this.right = 0;
    this.left = 0;
    this.playerVelocity = 15;
    this.status = "STOPPED";
    //SPRITES
    this.character = new Image();
    this.character.src = "SPRITES/player.png";

    this.spriteWidth = 6000;
    this.spriteHeight = 2400;
    this.rows = 4;
    this.cols = 10;
    //Creo que esto no hace falta
    // this.runStandard = 0;
    // this.runUpsideDown = 1;
    // this.jump = 2;
    // this.die = 3;

    this.widthFrame = this.spriteWidth/this.cols;
    this.heightFrame = this.spriteHeight/this.rows;

    this.currentFrame = 0;
    this.frameCount = 10;

    this.srcX = 0;
    this.srcY = this.heightFrame*0 ;

    this.velocityFrame = 50;

    this._updateFrame();

  }



  move (){
    if (this.status === "STOPPED"){
      this.intervalId = setInterval(this.changeGravity.bind(this), this.playerVelocity);
      this.status = "MOVING";
    }
  }

  stopPlayerInterval(){
    clearInterval(this.intervalId);
  }

  resumePlayerInterval(){
    if (this.status === "MOVING"){
      this.intervalId = setInterval(this.changeGravity.bind(this), this.playerVelocity);
    }
    
  }

  changeGravity (){
    if (this.gravity === "down" && this.status === "MOVING") {
      this.y-=10;
      this.status = "MOVING";
      if (this.y < 30 ){
        clearInterval(this.intervalId);
        this.status = "STOPPED";
        this.gravity ="up";
      }
    } else if (this.gravity ==="up" && this.status === "MOVING"){
      this.y+=10;
      this.status = "MOVING";
      if (this.y > (this.canvasHeight-120)){
        clearInterval(this.intervalId);
        this.status = "STOPPED";
        this.gravity ="down";
      }
    }
  }

  getPlayerCoordinates (){
    this.top = this.y;
    this.bottom = this.y + this.playerHeight;
    this.right = this.x + this.playerWidth;
    this.left = this.x;
  }

  //SPRITES

  _updateFrame(){
    this.intervalIdSprites = clearInterval(this.intervalIdSprites);
    this.intervalIdSprites = setInterval(()=>{
      this.currentFrame = ++this.currentFrame % this.frameCount;
      this.srcX = this.currentFrame * this.widthFrame;
      this._changeFrames();
      if (this.status === "DEAD" && this.currentFrame === 8){
        clearInterval(this.intervalIdSprites);
      }
    },this.velocityFrame)
  }

  _changeFrames(){
    if (this.status === "STOPPED"){
      if (this.gravity === "down"){
        this.srcY = this.heightFrame*0;
        this.frameCount = 10;
      } else if (this.gravity === "up"){
        this.srcY = this.heightFrame*1;
      }
    } else if (this.status === "MOVING"){
      this.srcY = this.heightFrame*2;
      this.frameCount = 8;
    } else if (this.status === "DEAD"){
      this.character.src="SPRITES/explosion.png"
      this.velocityFrame = 20;
      this.spriteWidth = 4017;
      this.spriteHeight = 600;
      this.rows = 1;
      this.cols = 7;
      this.srcY = 0;
      this.frameCount = 8;
      
    } 
  }
}
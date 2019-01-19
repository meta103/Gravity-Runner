class Obstacle {
  constructor (){
    this.x = 1020;
    this.y = this.generatePosition();
    this.intervalId = undefined;
    this.bulletWidth = 250;
    this.bulletHeight = 60;
    //this.coordinatesBullet = undefined;
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;

    //SPRITES
    this.rocket = new Image();
    this.rocket.src = "SPRITES/rockets.png";

    this.spriteWidth = 1689;
    this.spriteHeight = 226;
    this.rows = 1;
    this.cols = 3;

    this.widthFrame = this.spriteWidth/this.cols;
    this.heightFrame = this.spriteHeight/this.rows;

    this.currentFrame = 0;
    this.frameCount = 3;

    this.srcX = 0;
    this.srcY = this.heightFrame*0 ;
    
    this._updateFrame();
    this.move();
  }
  
  move (){
    this.intervalId = setInterval(this.moveToTheLeft.bind(this), 17);
  }

  stopBulLetInterval(){
    clearInterval(this.intervalId);
  }
  

  moveToTheLeft(){
    this.x-=10;
    this.getBulletCoordinates();
    // if (this.x > -100) {
    //   this.x-=10;
    // } else {
    //   this.x=1020; 
    //   this.y = this.generatePosition();
    // }
  }
  generatePosition (){
    let newY = Math.floor(Math.random() * (480 - 30)+30);
    return newY;
  }

  getBulletCoordinates (){
    this.top = this.y;
    this.bottom = this.y + this.bulletHeight;
    this.left= this.x;
    this.right = this.x + this.bulletWidth;
  }
  

  //SPRITES
  _updateFrame(){
    this.intervalId = clearInterval(this.intervalId);
    this.intervalId = setInterval(()=>{
      this.currentFrame = ++this.currentFrame % this.frameCount;
      this.srcX = this.currentFrame * this.widthFrame;
    },50)
  }

}
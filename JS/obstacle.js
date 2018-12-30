class Obstacle {
  constructor (){
    this.x = 1020;
    this.y = this.generatePosition();
    this.intervalId = undefined;
    this.bulletWidth = 100;
    this.bulletHeight = 40;
    //this.coordinatesBullet = undefined;
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;
  }
  move (){
    this.intervalId = setInterval(this.moveToTheLeft.bind(this), 15);
  }

  moveToTheLeft(){
    if (this.x > 0) {
      this.x-=10;
    } else {
      this.x=1020;
      this.y = this.generatePosition();
    }
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

}
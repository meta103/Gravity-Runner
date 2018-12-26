class Obstacle {
  constructor (){
    this.x = 1020;
    this.y = this.generatePosition();
    this.intervalId = undefined;
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
}
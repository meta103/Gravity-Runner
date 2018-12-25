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
    this.x-=10;
  }
  generatePosition (){
    let newY = Math.floor(Math.random() * 550);
    return newY;
  }
}
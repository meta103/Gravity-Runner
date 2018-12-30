class Player {
  constructor (x, y, canvasHeight){
    this.gravity = "down";
    this.x = x;
    this.y = y;
    this.intervalId = undefined;
    this.canvasHeight = canvasHeight;
    this.playerWidth = 40;
    this.playerHeight = 40;
    //this.coordinatesPlayer = {};
    this.top = 0;
    this.bottom = 0;
    this.right = 0;
    this.left = 0;
  }
  move (){
    this.intervalId = setInterval(this.changeGravity.bind(this), 15);
  }

  changeGravity (){
    if (this.gravity === "down") {
      this.y-=10;
      if (this.y < 30 ){
        clearInterval(this.intervalId);
        this.gravity ="up";
      }
    } else if (this.gravity ==="up"){
      this.y+=10;
      if (this.y > (this.canvasHeight-70)){
        clearInterval(this.intervalId);
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


}
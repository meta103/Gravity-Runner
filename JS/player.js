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
    this.playerVelocity = 15;
    this.status = "STOPPED";
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
      if (this.y > (this.canvasHeight-70)){
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


}
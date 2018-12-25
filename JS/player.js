class Player {
  constructor (x, y, canvasHeight){
    this.gravity = "down";
    this.x = x;
    this.y = y;
    this.intervalId = undefined;
    this.canvasHeight = canvasHeight;
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
      //this.gravity ="up";
      console.log("GRAVITY IS UP")
    } else if (this.gravity ==="up"){
      this.y+=10;
      if (this.y > (this.canvasHeight-70)){
        clearInterval(this.intervalId);
        this.gravity ="down";
      }
      //this.gravity = "down";
      console.log("GRAVITY IS DOWN")
    }
  }
}
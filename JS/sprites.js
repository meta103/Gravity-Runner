class Sprites {
  constructor (){
    this.character = new Image();
    this.character.src = "/Users/marcostagliabue/Ironhack/WDPT2018/Modulo 1/PROYECTO/Gravity-Runner/SPRITES/SPRITE.png";

    this.spriteWidth = 3600;
    this.spriteHeight = 3600;
    this.rows = 6;
    this.cols = 6;

    this.die = 0;
    this.jump = 1;
    this.runStandard = 2;
    this.runUpsideDown = 4;

    this.widthFrame = spriteWidth/cols;
    this.heightFrame = spriteHeight/rows;

    this.currentFrame = 0;
    this.frameCount = 6;

    this.x = 0;
    this.y = 0;

    this.srcX = 0;
    this.srcY = 0;

    this.intervalID = undefined;
  }


  updateFrame(){
    ctx.clearRect(x, y, widthFrame, heightFrame);
    currentFrame = ++currentFrame % frameCount;
    srcX = currentFrame * widthFrame;
  }

  draw() {
    this.updateFrame();
    ctx.drawImage(character, srcX, srcY, widthFrame, heightFrame, x, y, widthFrame, heightFrame);
  }

  callInterval (){
    this.intervalID = setInterval(this.draw(), 100);
  }
   





}
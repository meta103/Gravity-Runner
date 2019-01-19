document.onload = function (){
  const canvas = document.getElementById('gravityRunner');
  const ctx = canvas.getContext('2d');
  // const background = new Image();
  // background.src = "/Users/marcostagliabue/Ironhack/WDPT2018/Modulo 1/PROYECTO/Gravity-Runner/FondoCanvas2.jpg";
  // ctx.drawImage(background,0,0);

  //document.getElementById("gravityRunner").style.background = "url('/Users/marcostagliabue/Ironhack/WDPT2018/Modulo 1/PROYECTO/Gravity-Runner/FondoCanvas3.png')"
  
  ctx.font = '50px Arial';
  ctx.textAlign = "center"; 
  ctx.fillStyle = 'blue';

  const game = new Game(ctx, canvas);

  game.welcomeScreen();
}();



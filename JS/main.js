document.onload = function (){
  const canvas = document.getElementById('gravityRunner');
  const ctx = canvas.getContext('2d');

  ctx.font = '50px Arial';
  ctx.textAlign = "center"; 

  const game = new Game(ctx, canvas);

  game.welcomeScreen();
}();



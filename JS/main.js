document.onload = function (){
  const canvas = document.getElementById('gravityRunner');
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx, canvas);

  game.start();
}();



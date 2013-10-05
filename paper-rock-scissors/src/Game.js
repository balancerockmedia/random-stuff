var Game = function() {
  
  this.choices = ['rock', 'paper', 'scissors'];
  this.your_score = 0;
  this.computer_score = 0;
  
  this.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  this.takeTurn = function() {
    var you = prompt('rock, paper or scissors?');
    you = this.choices.indexOf(you);

    var computer = this.getRandomInt(0, 2);

    if (you === computer) {
      return this.takeTurn();
    } else {
      return {
        'you': you,
        'computer': computer
      };
    }
  }
  
  this.compare = function(turn) {
    switch (turn.you) {
    case 0:
      if (turn.computer === 1) {
        return 'computer';
      } else if (turn.computer === 2) {
        return 'you';
      }
      break;

    case 1:
      if (turn.computer === 0) {
        return 'you';
      } else if (turn.computer === 2) {
        return 'computer';
      }
      break;

    case 2:
      if (turn.computer === 0) {
        return 'computer';
      } else if (turn.computer === 1) {
        return 'you';
      }
      break;
    }
  }
  
}
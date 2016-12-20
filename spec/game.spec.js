import Game from 'app/models/game';
import GameBoard from 'app/models/game_board';

describe('Game', function() {
  var testGame = new Game();
  var testBoard = new GameBoard();

  it("should create a gameBoard when initialized", function() {
    expect(testGame.board).toBeDefined();
    // expect(testGame.board).toEqual(testBoard.board);
    expect(testGame.board.gameBoard).toEqual(jasmine.any(Array));
  });

  it('should initialize the correct Player for player1', function() {
    expect(testGame.get('player1').marker).toEqual("X");
    expect(testGame.get('player1').turnId).toEqual(true);
  });

  it('should initialize the correct Player for player2', function() {
    expect(testGame.get('player2').marker).toEqual("O");
    expect(testGame.get('player2').turnId).toEqual(false);
  });

  describe('whichPlayer', function() {
    var testGame2 = new Game();
    testGame2.gameCounter = false;

    it('should return Player1 for a new game because counter equals true', function(){
      expect(testGame.whichPlayer()).toEqual(testGame.get('player1'));
    });

    it('should return Player2 if gameCounter equals false', function(){
      expect(testGame2.whichPlayer()).toEqual(testGame.get('player2'));
    });
  });

  describe('valid', function() {
    var testGame3 = new Game();
    testGame3.board.gameBoard[0][2] = "X";

    it('should handle an invalid location entry appropriately', function() {
      expect(testGame3.valid(4,4)).toEqual(false);
    });

    it('should return true if a location is unoccupied(still equal to null)', function() {
      expect(testGame3.valid(0,0)).toEqual(true);
    });

    it('should return false if a location is occupied by either an X or O', function() {
      expect(testGame3.valid(0,2)).toEqual(false);
    });
  });

  describe('playTurn', function() {
    var testGame4 = new Game();

    it('should add a player1 marker (X) if the space is open', function() {
      expect(testGame4.board.gameBoard[0][0]).toEqual(null);
      expect(testGame4.gameCounter).toEqual(true);
      expect(testGame4.turnCounter).toEqual(0);


      testGame4.playTurn(0,0);
      expect(testGame4.gameCounter).toEqual(false);
      expect(testGame4.turnCounter).toEqual(1);
      expect(testGame4.board.gameBoard[0][0]).toEqual('X');
    });

    it('should not add a players marker if the space is taken', function() {
      expect(testGame4.board.gameBoard[0][0]).toEqual('X');
      expect(testGame4.gameCounter).toEqual(false);

      testGame4.playTurn(0,0);
      expect(testGame4.gameCounter).toEqual(false);
      expect(testGame4.turnCounter).toEqual(1);
      expect(testGame4.board.gameBoard[0][0]).toEqual('X');
    });

    it('should add player2 marker (O) if the space is open', function() {
      expect(testGame4.board.gameBoard[2][2]).toEqual(null);
      expect(testGame4.gameCounter).toEqual(false);
      // expect(testGame4.turnCounter).toEqual(1);
      console.log(">>>>>>>>>>>>>>>>" + testGame4.turnCounter);

      testGame4.playTurn(2,2);
      console.log(">>>>>>>>>>>>>>>>" + testGame4.turnCounter);
      expect(testGame4.gameCounter).toEqual(true);
      expect(testGame4.turnCounter).toEqual(2);
      expect(testGame4.board.gameBoard[2][2]).toEqual('O');
    });

    var testWinner = new Game();
    testWinner.turnCounter = 4;
    testWinner.board.gameBoard[0][0] = "X";
    testWinner.board.gameBoard[0][1] = "X";

    it('should return a winner if someone has won after their turn', function() {
      // console.log("********" + testWinner.winner);
      // console.log(testWinner.board.gameboard;
      testWinner.playTurn(0,2);
      expect(testWinner.winner).toEqual(testWinner.get('player1'));
      // console.log("********" + testWinner.winner);
    });

    it('should return a Game Over if game is already won and you try to play a turn', function() {
      expect(testWinner.playTurn(2,2)).toEqual("Game is Over " + testWinner.winner.name + " won.");
    });
  });
});

describe('GameBoard', function() {
  describe('hasWon', function() {
    //Rows
    var testRow0 = new Game();
    testRow0.board.gameBoard[0][0] = "X";
    testRow0.board.gameBoard[0][1] = "X";
    testRow0.board.gameBoard[0][2] = "X";

    it('should return true if a player has won Row0', function() {
      expect(testRow0.board.hasWon()).toEqual(true);
    });

    var testRow1 = new Game();
    testRow1.board.gameBoard[1][0] = "X";
    testRow1.board.gameBoard[1][1] = "X";
    testRow1.board.gameBoard[1][2] = "X";

    it('should return true if a player has won Row1', function() {
      expect(testRow1.board.hasWon()).toEqual(true);
    });

    var testRow2 = new Game();
    testRow2.board.gameBoard[2][0] = "X";
    testRow2.board.gameBoard[2][1] = "X";
    testRow2.board.gameBoard[2][2] = "X";

    it('should return true if a player has won Row2', function() {
      expect(testRow2.board.hasWon()).toEqual(true);
    });

    //Columns
    var testColumn0 = new Game();
    testColumn0.board.gameBoard[0][0] = "X";
    testColumn0.board.gameBoard[1][0] = "X";
    testColumn0.board.gameBoard[2][0] = "X";

    it('should return true if a player has won Column0', function() {
      expect(testColumn0.board.hasWon()).toEqual(true);
    });

    var testColumn1 = new Game();
    testColumn1.board.gameBoard[0][1] = "X";
    testColumn1.board.gameBoard[1][1] = "X";
    testColumn1.board.gameBoard[2][1] = "X";

    it('should return true if a player has won Column1', function() {
      expect(testColumn1.board.hasWon()).toEqual(true);
    });

    var testColumn2 = new Game();
    testColumn2.board.gameBoard[0][2] = "X";
    testColumn2.board.gameBoard[1][2] = "X";
    testColumn2.board.gameBoard[2][2] = "X";

    it('should return true if a player has won Column2', function() {
      expect(testColumn2.board.hasWon()).toEqual(true);
    });

    //>>>>
    var test3Nulls = new Game();
    test3Nulls.playTurn(1,2);
    test3Nulls.playTurn(0,0);
    test3Nulls.playTurn(2,0);
    test3Nulls.playTurn(1,2);
    test3Nulls.playTurn(0,2);
    test3Nulls.playTurn(2,2);
    it('should return false if a player has not won but there have been 5 rounds and there are 3 nulls in a row', function() {
      expect(test3Nulls.winner).toEqual(null);
      expect(test3Nulls.board.hasWon()).toEqual(false);
    });

    //Diagonals
    var testDiag1 = new Game();
    testDiag1.board.gameBoard[0][0] = "X";
    testDiag1.board.gameBoard[1][1] = "X";
    testDiag1.board.gameBoard[2][2] = "X";

    it('should return true if a player has won Diag1', function() {
      expect(testDiag1.board.hasWon()).toEqual(true);
    });

    var testDiag2 = new Game();
    testDiag2.board.gameBoard[0][2] = "X";
    testDiag2.board.gameBoard[1][1] = "X";
    testDiag2.board.gameBoard[2][0] = "X";

    it('should return true if a player has won Diag2', function() {
      expect(testDiag2.board.hasWon()).toEqual(true);
    });

    //Buggy situation
    var findBug = new Game();
    findBug.board.gameBoard[0][0] = "O";
    findBug.board.gameBoard[0][2] = "O";
    findBug.board.gameBoard[2][0] = "X";
    findBug.board.gameBoard[2][2] = "X";
    findBug.board.gameBoard[1][2] = "X";

    it('should return false when a player hasnt won', function() {
      expect(findBug.board.hasWon()).toEqual(false);
    });

    var hasNotWonGame = new Game();
    hasNotWonGame.board.gameBoard[0][2] = "X";
    hasNotWonGame.board.gameBoard[1][1] = "X";
    hasNotWonGame.board.gameBoard[2][0] = "O";

    it("should return false if a player hasn't won", function() {
      expect(hasNotWonGame.board.hasWon()).toEqual(false);
    });

    var testReturnsTie = new Game();
    testReturnsTie.board.gameBoard[0][0] = "X";
    testReturnsTie.board.gameBoard[0][1] = "X";
    testReturnsTie.board.gameBoard[0][2] = "O";
    testReturnsTie.board.gameBoard[1][0] = "O";
    testReturnsTie.board.gameBoard[1][1] = "X";
    testReturnsTie.board.gameBoard[1][2] = "X";
    testReturnsTie.board.gameBoard[2][0] = "X";
    testReturnsTie.board.gameBoard[2][1] = "O";
    testReturnsTie.board.gameBoard[2][2] = "O";

    it("should return tie if gameboard is full and no winner", function() {
      expect(testReturnsTie.board.hasWon()).toEqual("tie");
    });

  });

  describe('aTie', function() {
    var testYesATie = new Game();
    testYesATie.board.gameBoard[0][0] = "X";
    testYesATie.board.gameBoard[0][1] = "X";
    testYesATie.board.gameBoard[0][2] = "O";
    testYesATie.board.gameBoard[1][0] = "O";
    testYesATie.board.gameBoard[1][1] = "X";
    testYesATie.board.gameBoard[1][2] = "X";
    testYesATie.board.gameBoard[2][0] = "X";
    testYesATie.board.gameBoard[2][1] = "O";
    testYesATie.board.gameBoard[2][2] = "O";

    it("should return true if no location has a value of null therefor the gameboard is full", function() {
      expect(testYesATie.board.aTie()).toEqual(true);
    });

    var testNotATie = new Game();
    testNotATie.board.gameBoard[0][0] = "X";
    testNotATie.board.gameBoard[0][1] = "X";
    testNotATie.board.gameBoard[0][2] = null;


    it("should return true if no location has a value of null therefor the gameboard is full", function() {
      expect(testNotATie.board.aTie()).toEqual(false);
    });
  });
});

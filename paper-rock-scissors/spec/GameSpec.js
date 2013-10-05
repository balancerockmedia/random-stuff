describe('Game', function() {
    var game;
    
    beforeEach(function() {
        game = new Game();
    });
              
    it('you should win if you have a rock and the computer has scissors', function() {
        var winner = game.compare({
          'you': 0,
          'computer': 2
        })
        
        expect(winner).toEqual('you');
    });
    
    it('computer should win if the computer has a rock and you have scissors', function() {
        var winner = game.compare({
          'you': 2,
          'computer': 0
        })
        
        expect(winner).toEqual('computer');
    });
    
    it('you should win if you have paper and the computer has a rock', function() {
        var winner = game.compare({
          'you': 1,
          'computer': 0
        })
        
        expect(winner).toEqual('you');
    });
    
    it('computer should win if the computer has paper and you have a rock', function() {
        var winner = game.compare({
          'you': 0,
          'computer': 1
        })
        
        expect(winner).toEqual('computer');
    });
});
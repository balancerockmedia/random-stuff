class WrongNumberOfPlayersError < StandardError ; end
class NoSuchStrategyError < StandardError ; end

def rps_result(m1, m2)  
  raise NoSuchStrategyError unless m1[1].downcase.match(/[rps]/) && m2[1].downcase.match(/[rps]/)
  
  winning_combos = ['rr', 'pp', 'ss', 'pr', 'sp', 'rs']
  
  return winning_combos.include?(m1[1].downcase + m2[1].downcase) ? m1 : m2
end

def rps_game_winner(game)
  raise WrongNumberOfPlayersError unless game.length == 2
  
  return rps_result(game[0], game[1]);
end

def rps_tournament_winner(tournament)
  if tournament[0][0].is_a?(String)
    tournament = rps_game_winner(tournament)
  else
    rps_game_winner([rps_tournament_winner(tournament[0]), rps_tournament_winner(tournament[1])])
  end
end

puts rps_tournament_winner([
  ["Armando", "s"], ["Dave", "r"]
])

puts rps_tournament_winner([
  [ ["Armando", "P"], ["Dave", "S"] ],
  [ ["Richard", "R"],  ["Michael", "S"] ],
])

puts rps_tournament_winner([
  [
    [ ["Armando", "P"], ["Dave", "S"] ],
    [ ["Richard", "R"],  ["Michael", "S"] ],
  ],
  [
    [ ["Allen", "S"], ["Omer", "P"] ],
    [ ["David E.", "R"], ["Richard X.", "P"] ]
  ]
])

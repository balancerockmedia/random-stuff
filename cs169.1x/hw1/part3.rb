def combine_anagrams(words)
  anagrams = []
  
  words.each do |word1|
    temp = []
    
    sorted1 = word1.downcase.chars.sort.join
    
    unless anagrams.flatten.include?(word1)
      words.each do |word2|
        sorted2 = word2.downcase.chars.sort.join
      
        if sorted1 == sorted2
          temp << word2
        end
      end
    
      anagrams << temp
    end
  end
  
  return anagrams
end

puts combine_anagrams(['cars', 'for', 'potatoes', 'racs', 'four','scar', 'creams', 'scream'])
def palindrome?(str)
  str = str.downcase.gsub(/[^a-z]/, '')
  
  return str == str.reverse
end

puts palindrome?("A man, a plan, a canal -- Panama")
puts palindrome?("Madam, I'm Adam!")
puts palindrome?("Abracadabra")

def count_words(str)
  words = Hash.new
  
  str = str.downcase.gsub(/[a-z]+\b/) { |item|
    if words.has_key?(item)
      words[item] += 1
    else
      words[item] = 1
    end
  }
  
  return words
end

count_words("A man, a plan, a canal -- Panama")
count_words "Doo bee doo bee doo"

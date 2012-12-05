class Numeric
  @@currencies = {:dollar => 1, :yen => 0.013, :euro => 1.292, :rupee => 0.019}

  def in(currency)
    singular_currency = currency.to_s.gsub(/s$/, '').to_sym
    
    puts self / @@currencies[singular_currency]
  end
  
  def method_missing(method_id, *args, &block)
    singular_currency = method_id.to_s.gsub(/s$/, '').to_sym
    
    if @@currencies.has_key?(singular_currency)
      self * @@currencies[singular_currency]
    else
      super
    end
  end
end

2.rupee.in(:dollar)
#3.yen.in(:dollar)
#6.euro.in(:dollar)
#2.rupees.in(:dollars)
#3.yen.in(:dollars)
#6.euros.in(:dollars)
#5.rupees.in(:yen)

class String
  def palindrome?
    str = self.downcase.gsub(/[^a-z]/, '')
  
    return str == str.reverse
  end
end

# puts "Madam, I'm Adam!".palindrome?

module Enumerable
  def palindrome?
    return false unless self.respond_to? :each
    
    temp = []
    temp2 = []
    
    self.each do |item|
      temp << item
      temp2.insert 0, item
    end
    
    return temp == temp2
  end
end

puts [1,2,3,2,1].palindrome?

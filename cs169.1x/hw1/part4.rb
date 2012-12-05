class Dessert
  attr_accessor :name, :calories
  
  def initialize(name, calories)
    @name = name
    @calories = calories
  end
  
  attr_accessor :name, :calories
  
  def healthy?
    return @calories < 200
  end
  
  def delicious?
    return true
  end
end

class JellyBean < Dessert
  def initialize(name, calories, flavor)
    @flavor = flavor
  end
  
  attr_accessor :flavor
  
  def delicious?
    return true unless @flavor == 'black licorice'
  end
end

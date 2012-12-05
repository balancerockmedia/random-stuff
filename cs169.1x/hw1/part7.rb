class CartesianProduct
  include Enumerable
  
  def initialize(collection1, collection2)
    @collection1 = collection1
    @collection2 = collection2
  end
  
  def each
    @collection1.each do |item1|
      @collection2.each do |item2|
        yield [item1, item2]
      end
    end
  end
end

c = CartesianProduct.new([:a,:b], [4,5])
c.each { |item| puts item.inspect }
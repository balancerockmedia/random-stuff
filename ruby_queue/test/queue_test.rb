require 'test/unit'
require_relative '../queue_item.rb'
require_relative '../queue.rb'

class TestApp < Test::Unit::TestCase
  
  def setup
    @my_queue = Queue.new
  end
  
  def teardown
    @my_queue = nil
  end
  
  def test_empty_queue
    assert @my_queue.isEmpty?
  end
  
  def test_enqueue_one_item
    assert @my_queue.isEmpty?
    
    @my_queue.enQueue(1)
    
    assert !@my_queue.isEmpty?
    
    assert_equal(@my_queue.head.data, 1)
    assert_equal(@my_queue.tail.data, 1)
  end
  
  def test_enqueue_three_items
    assert @my_queue.isEmpty?
    
    @my_queue.enQueue(1)
    @my_queue.enQueue(2)
    @my_queue.enQueue(3)
    
    assert !@my_queue.isEmpty?
    
    assert_equal(@my_queue.head.data, 1)
    assert_equal(@my_queue.tail.data, 3)
  end
  
  def test_full_queue
    Queue::MAX_ITEMS.times do |i|
      @my_queue.enQueue(i+1)
    end
    
    assert @my_queue.isFull?
  end
  
  def test_not_full_queue
    num = Queue::MAX_ITEMS - 1
    
    num.times do |i|
      @my_queue.enQueue(i+1)
    end
    
    assert !@my_queue.isFull?
  end
  
  def test_queue_size
    100.times do |i|
      @my_queue.enQueue(i)
    end
    
    assert_equal(@my_queue.size(), 100)
    
    50.times do |i|
      @my_queue.deQueue
    end
    
    assert_equal(@my_queue.size(), 50)
  end
  
  def test_queue_max_items
    105.times do |i|
      @my_queue.enQueue(i)
    end
    
    assert @my_queue.size() != 105
    assert @my_queue.size() == 100
  end
  
end
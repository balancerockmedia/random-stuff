require_relative './queue_item.rb'

class Queue
  MAX_ITEMS = 100
  
  attr_accessor :head, :tail
  
  def initialize()
    @head = nil
    @tail = nil
  end
  
  def enQueue(value)
    temp = QueueItem.new(value)
    
    if self.isFull?
      return
    elsif self.isEmpty?
      @head = temp
      @tail = temp
    else
      @tail.next = temp
      @tail = temp
    end
  end
  
  def deQueue
    if self.isEmpty?
      return nil
    else
      temp = @head
      @head = @head.next
      
      return temp
    end
  end
  
  def isEmpty?
    return @head == nil
  end
  
  def isFull?
    if !self.isEmpty? && self.size() == MAX_ITEMS
      return true
    else
      return false
    end
  end
  
  def size
    num_items = 0
    
    if self.isEmpty?
      return num_items
    else
      pointer = @head
      
      while pointer.next != nil
        num_items += 1
        pointer = pointer.next
      end
      
      return num_items + 1
    end
  end
end


public class CircularArrayQueue<T> {
	private final int DEFAULT_CAPACITY = 5;
  	private int front, rear;
  	private T[] queue; 

  	@SuppressWarnings("unchecked")
	public CircularArrayQueue() {
  		front = rear = 0;
  		queue = (T[]) (new Object[DEFAULT_CAPACITY]);
  	}
  
  	@SuppressWarnings("unchecked")
	public CircularArrayQueue (int initialCapacity) {
  		front = rear = 0;
  		queue = ((T[])(new Object[initialCapacity]));
  	}
  
  	public void enqueue (T element) {
  		if (size() + 1 == queue.length) {
  			expandCapacity();
  		}
    
  		queue[rear] = element;
    	rear = (rear+1) % queue.length;
  	}
  
  	public T dequeue() throws EmptyCollectionException {
  		if (isEmpty()) {
  			throw new EmptyCollectionException("queue");
  		}
    
  		T result = queue[front];
  		queue[front] = null;
    	front = (front+1) % queue.length;
    
    	return result;
  	}

  	public T first() throws EmptyCollectionException {
  		if (isEmpty()) {
  			throw new EmptyCollectionException("queue");
  		}
    
  		return queue[front];
  	}
  
  	public boolean isEmpty() {
  		return this.size() == 0;
  	}
  
  	public int size() {
  		if (rear < front) {
  			return queue.length - (front - rear);
  		} else {
  			return rear - front;
  		}
  	}
  
  	@Override
	public String toString() {
  		String result = "";
    	int scan = 0;
    
    	while (scan < this.size()) {
    		if (queue[scan] != null) {
    			result += queue[scan].toString()+" ";
    		}
    		
    		scan++;
    	}
    
    	return result;
  	}

  	@SuppressWarnings("unchecked")
	public void expandCapacity() {
  		int new_length = queue.length * 2;
  		
  		T[] larger = (T[])(new Object[new_length]);
  		
  		System.out.println("expanding to: " + new_length);
    
  		for(int scan=0; scan < this.size(); scan++) {
  			larger[scan] = queue[scan];
  		}
  		
  		front = 0;
  		rear = this.size();
  		queue = larger;
  	}
}

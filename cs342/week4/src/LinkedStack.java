public class LinkedStack<T> {
	
	private int count;
	private LinearNode<T> top;
	
	public LinkedStack() {
		count = 0;
	    top = null;
	}
	
	public void push(T element) {
		LinearNode<T> temp = new LinearNode<T> (element);

	    temp.next = top;
	    top = temp;
	    count++;
	}
	
	public T pop() throws EmptyCollectionException {
		if (isEmpty()) {
			throw new EmptyCollectionException("Stack");
		}

	    T result = top.element;
	    top = top.next;
	    count--;
	 
	    return result;
	}
	
	public boolean isEmpty() {
		return (count == 0);
	}
	
	public String toString() {
		String result = "";
	    LinearNode<T> current = top;

	    while (current != null) {
	      	result = result + (current.element).toString() + "\n";
	      	current = current.next;
	    }

	    return result;
	}
	
	private class LinearNode<T1> {
		private LinearNode<T1> next;
		private T1 element;
		
		public LinearNode(T1 elem) {
		    next = null;
		    element = elem;
		}
	}
	
}

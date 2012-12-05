import java.util.Iterator;

public class LinkedOrderedList<T> {
	
	private int count;
	private LinearNode<T> head, tail;
	
	public LinkedOrderedList() {
		count = 0;
		head = tail = null;
	}
	
	@SuppressWarnings("unchecked")
	public void add(T element) {
	    LinearNode<T> temp = new LinearNode<T>(element);
		
		// if the list is empty
		if (isEmpty()) {
			head = tail = temp;
			
		// if the list has one item
		} else if (size() == 1) {			
			// get comparable version of the current element
			Comparable<T> ctemp = (Comparable<T>)temp.element;
			
			// if the new element comes before the head element
	      	if (ctemp.compareTo(head.element) < 0) {
	      		temp.next = head;
	      		head = temp;
	      		
	      	// if the new element is equal or greater than the head
	      	} else {
	      		head.next = temp;
	      		tail = temp;
	      	}
	      	
	    // if the list has multiple items
		} else {
			LinearNode<T> current = head;
			boolean found = false;
			
			while (current.next != null && !found) {
				try {
					// get comparable version of the current element
					Comparable<T> ctemp = (Comparable<T>)temp.element;
					
					// if the new element comes before the head element
			      	if (ctemp.compareTo(head.element) < 0) {
			      		temp.next = head;
			      		head = temp;
			      		
			      		found = true;
			      		
			      	// if the new element is equal to an item in the list or
			      	// if the new element goes between two items in the list
			      	} else if (temp.element.equals(current.element) || 
			      			ctemp.compareTo(current.next.element) < 0) {
			      		temp.next = current.next;
			      		current.next = temp;
			      		
			      		found = true;
			      	}
			      	
			      	current = current.next;
				} catch(ClassCastException e) {
					e.printStackTrace();
				}
		    }
			
			// other wise it must go at the end
			if (!found) {
				tail.next = temp;
	      		tail = temp;
			}
		}
		
		count++;
	}
	
	public T remove(T element) {
		if (isEmpty()) {
			return null;
		}
		
		boolean found = false;
		LinearNode<T> previous = null;
		LinearNode<T> current = head;
		
		while (current != null && !found) {
			if (element.equals(current.element)) {
				found = true;
			} else {
				previous = current;
				current = current.next;
			}
		}
		
		if (!found) {
			return null;
		}
		
		if (count == 1) {
			head = tail = null;
		} else if (element.equals(head.element)) {
			head = current.next;
		} else if (element.equals(tail.element)) {
			tail = previous;
			tail.next = null;
		} else {
			previous.next = current.next;
		}
		
		count--;
		
		return current.element;
	}
	
	public boolean isEmpty() {
		return count == 0;
	}
	
	public int size() {
		return count;
	}
	
	public ListIterator<T> iterator() {
		return new ListIterator<T>(head);
	}
	
	private class LinearNode<T1> {
		private LinearNode<T1> next;
		private T1 element;
		
		public LinearNode(T1 elem) {
		    next = null;
		    element = elem;
		}
		
		public T1 getElement() {
			return this.element;
		}
	}
	
	private class ListIterator<T2> implements Iterator<T2> {
		private LinearNode<T2> head;
		private LinearNode<T2> current;
		private int count = 0;
		
		public ListIterator(LinearNode<T2> head) {
			if (head == null) {
				count = -1;
			} else {
				this.head = head;
				this.current = head;
			}
		}
		
		public boolean hasNext() {
			if (count == -1) {
				return false;
			} else if (count == 0) {
				return true;
			} else {
				return current.next != null;
			}
		}
		
		public T2 next() {
			if (count == 0) {
				count++;
				
				return head.element;
			} else {
				LinearNode<T2> next = current.next;
				
				current = next;
				
				count++;
				
				return next.element;
			}
		}
		
		public void remove() throws UnsupportedOperationException {
			throw new UnsupportedOperationException();
		}
	}

	public String toString() {
		String result = "";
	    LinearNode<T> current = head;

	    while (current != null) {
	      	result = result + (current.element).toString() + "\n";
	      	current = current.next;
	    }

	    return result;
	}
}
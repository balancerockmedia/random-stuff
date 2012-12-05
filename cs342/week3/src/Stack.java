public class Stack<T> {
	
	private int top;
	
	private int CAPACITY = 5;
	
	private T[] stack;
	
	@SuppressWarnings("unchecked")
	public Stack() {
		top = -1;
		
		stack = (T[])(new Object[CAPACITY]);
	}
	
	public void push(T data) {
		if (this.size() == CAPACITY - 1) {
			this.doubleSize();
		}
		
		stack[++top] = data;
	}
	
	public T pop() {
		T result = stack[top--];
		stack[top+1] = null;
		
		return result;
	}
	
	public T peek() {
		return stack[top];
	}
	
	public boolean isEmpty() {
		return (top == -1);
	}
	
	public int size() {
		return top;
	}
	
	@SuppressWarnings("unchecked")
	private void doubleSize() {
		CAPACITY = stack.length * 2;
		
		T[] temp = (T[])(new Object[CAPACITY]);
		
		System.arraycopy(stack, 0, temp, 0, stack.length);
		
		this.stack = temp;
	}
	
}

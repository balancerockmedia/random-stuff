import static org.junit.Assert.*;

import org.junit.Test;

public class StackTest {

	@Test
	public void testEmptyStack() {
		Stack<Integer> stack = new Stack<Integer>();
		
		assertEquals("Stack size", -1, stack.size());
		
		assertTrue("Stack is empty", stack.isEmpty());
	}
	
	@Test
	public void testPush() {
		Stack<Integer> stack = new Stack<Integer>();
		
		stack.push(82);
		
		assertEquals("Stack peek", 82, stack.peek().intValue());
		
		assertEquals("Stack size", 0, stack.size());
	}
	
	@Test
	public void testPop() {
		Stack<Integer> stack = new Stack<Integer>();
		
		stack.push(82);
		
		assertEquals("Stack peek", 82, stack.peek().intValue());
		
		stack.pop();
		
		assertEquals("Stack size", -1, stack.size());
		
		assertTrue("Stack is empty", stack.isEmpty());
	}
	
	@Test
	public void testMultiplePushPop() {
		Stack<Integer> stack = new Stack<Integer>();
		
		stack.push(100);
		
		assertEquals("Stack peek", 100, stack.peek().intValue());
		
		assertEquals("Stack size", 0, stack.size());
		
		stack.push(101);
		
		assertEquals("Stack peek", 101, stack.peek().intValue());
		
		assertEquals("Stack size", 1, stack.size());
		
		stack.push(102);
		
		assertEquals("Stack peek", 102, stack.peek().intValue());
		
		assertEquals("Stack size", 2, stack.size());
		
		int popped = stack.pop();
		
		assertEquals("Popped value", 102, popped);
		
		assertEquals("Stack size", 1, stack.size());
		
		stack.pop();
		
		assertEquals("Stack size", 0, stack.size());
		
		stack.pop();
		
		assertEquals("Stack size", -1, stack.size());
	}
	
	@Test
	public void increaseStackSize() {
		Stack<Integer> stack = new Stack<Integer>();
		
		for (int i = 0; i < 100; i++) {
			stack.push(i);
		}
	}

}

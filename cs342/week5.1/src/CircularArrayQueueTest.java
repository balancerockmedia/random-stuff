import static org.junit.Assert.*;

import org.junit.Test;

public class CircularArrayQueueTest {

	@Test
	public void testEnqueue() {
		CircularArrayQueue<Integer> q = new CircularArrayQueue<Integer>();
		
		assertEquals("Queue size", 0, q.size());
		
		q.enqueue(0);
		q.enqueue(1);
		q.enqueue(2);
		q.enqueue(3);
		q.enqueue(4);
		q.enqueue(5);
		q.enqueue(6);
		q.enqueue(7);
		
		assertEquals("Queue size", 8, q.size());
		
		assertEquals("Queue first", 0, q.first().intValue());
	}
	
	@Test
	public void testDequeue() {
		CircularArrayQueue<Integer> q = new CircularArrayQueue<Integer>();
		
		assertEquals("Queue size", 0, q.size());
		
		q.enqueue(0);
		q.enqueue(1);
		q.enqueue(2);
		q.enqueue(3);
		q.enqueue(4);
		q.enqueue(5);
		q.enqueue(6);
		q.enqueue(7);
		
		assertEquals("Queue size", 8, q.size());
		
		assertEquals("Queue first", 0, q.first().intValue());
		
		q.dequeue();
		
		assertEquals("Queue size", 7, q.size());
		
		assertEquals("Queue first", 1, q.first().intValue());
		
		q.dequeue();
		
		assertEquals("Queue size", 6, q.size());
		
		assertEquals("Queue first", 2, q.first().intValue());
		
		q.dequeue();
		q.dequeue();
		
		assertEquals("Queue size", 4, q.size());
		
		assertEquals("Queue first", 4, q.first().intValue());
		
		q.enqueue(8);
		q.enqueue(9);
		q.enqueue(10);
		
		assertEquals("Queue size", 7, q.size());
		
		assertEquals("Queue first", 4, q.first().intValue());
		
		q.enqueue(11);
		
		assertEquals("Queue size", 8, q.size());
		
		assertEquals("Queue first", 4, q.first().intValue());
		
		q.dequeue();
		q.dequeue();
		q.dequeue();
		q.dequeue();
		q.dequeue();
		q.dequeue();
		q.dequeue();
		q.dequeue();
		
		assertEquals("Queue size", 0, q.size());
	}

}
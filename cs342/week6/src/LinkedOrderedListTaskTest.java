import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class LinkedOrderedListTaskTest {

	private LinkedOrderedList<Task> list;
	
	@Before
    public void setUp() throws Exception {
		list = new LinkedOrderedList<Task>();
    }
	
	@After
    public void tearDown() throws Exception{
		list = null;
    }

	@Test
	public void testAdd() {
		list.add(new Task("Clean", 2));
		list.add(new Task("Cook", 1));
		list.add(new Task("Sleep", 3));
		
		assertEquals("list size", 3, list.size());
		
		// System.out.println(list.toString());
	}
	
	@Test
	public void testRemove() {
		list.add(new Task("Cook", 1));
		list.add(new Task("Clean", 2));
		list.add(new Task("Sleep", 3));
		
		assertEquals("list size", 3, list.size());
		
		list.remove(new Task("Cook", 0));
		
		assertEquals("list size", 2, list.size());
		
		// System.out.println(list.toString());
	}
}

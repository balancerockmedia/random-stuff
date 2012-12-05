import static org.junit.Assert.*;

import java.util.Iterator;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class LinkedOrderedListTest {
	
	private LinkedOrderedList<Integer> list;
	
	@Before
    public void setUp() throws Exception {
		list = new LinkedOrderedList<Integer>();
    }
	
	@After
    public void tearDown() throws Exception{
		list = null;
    }

	@Test
	public void testIsEmpty() {
		assertTrue("is empty", list.isEmpty());
		
		list.add(10);
		
		assertFalse("is not empty", list.isEmpty());
	}
	
	@Test
	public void testAdd() {
		list.add(10);
		list.add(20);
		list.add(30);
		list.add(40);
		list.add(400);
		list.add(5);
		list.add(30);
		
		assertEquals("list size", 7, list.size());
		
		//System.out.println(list.toString());
	}
	
	@Test
	public void testRemoveStart() {
		list.add(10);
		list.add(20);
		list.add(30);
		
		int removed = list.remove(10);
		
		assertEquals("removed item", 10, removed);
		
		assertEquals("list size", 2, list.size());
	}
	
	@Test
	public void testRemoveMiddle() {
		list.add(10);
		list.add(20);
		list.add(30);
		
		int removed = list.remove(20);
		
		assertEquals("removed item", 20, removed);
		
		assertEquals("list size", 2, list.size());
	}
	
	@Test
	public void testRemoveEnd() {
		list.add(10);
		list.add(20);
		list.add(30);
		
		int removed = list.remove(30);
		
		assertEquals("removed item", 30, removed);
		
		assertEquals("list size", 2, list.size());
	}
	
	@Test
	public void testIterator0() {
		Iterator<Integer> i = list.iterator();
		
		assertFalse("has next", i.hasNext());
	}
	
	@Test
	public void testIterator1() {
		list.add(10);
		
		Iterator<Integer> i = list.iterator();
		
		assertTrue("has next", i.hasNext());
	}
	
	@Test
	public void testIterator2() {
		list.add(10);
		list.add(20);
		
		Iterator<Integer> i = list.iterator();
		
		assertTrue("has next", i.hasNext());
	}
	
	@Test
	public void testIterator3() {
		list.add(10);
		list.add(20);
		list.add(30);
		
		Iterator<Integer> i = list.iterator();
		
		assertEquals("item", 10, i.next().intValue());
		assertTrue("more items", i.hasNext());
		
		assertEquals("item", 20, i.next().intValue());
		assertTrue("more items", i.hasNext());
		
		assertEquals("item", 30, i.next().intValue());
		assertFalse("no more items", i.hasNext());
	}
}

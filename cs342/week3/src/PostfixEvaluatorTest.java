import org.junit.*;
import static org.junit.Assert.*;

import org.junit.Test;

public class PostfixEvaluatorTest {
	
	public PostfixEvaluator evaluator;
	
	@Before
    public void setUp() {
		evaluator = new PostfixEvaluator();
    }
	
	@Test
	public void testExpressions() {
		assertEquals(13.0, evaluator.evaluate("11.5 1.5 +"), 0);
		
		assertEquals(-40.5, evaluator.evaluate("11.5 2 + (-3) *"), 0);
		
		assertEquals(1.6, evaluator.evaluate("4 3 3 2 + / 4 * -"), 0);
	}
	
	@Test
	public void testOK() {
		evaluator.evaluate("1 1 +");
		
		assertTrue("Expression is OK", evaluator.isOK());
	}
	
	@Test
	public void testNotOK() {
		evaluator.evaluate("1 + 1");
		
		assertFalse("Expression is not OK", evaluator.isOK());
	}
	
	@After
    public void tearDown() {
		evaluator = null;
    }

}

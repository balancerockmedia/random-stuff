import java.util.Scanner;

public class Postfix {
	
	public static void main(String[] args) {
		String expression, again;
		double result;
		
		try {
			Scanner in = new Scanner(System.in);
			
			do {
				PostfixEvaluator evaluator = new PostfixEvaluator();
				
				System.out.println("Enter a valid postfix expression: ");
				
				expression = in.nextLine();
				
				result = evaluator.evaluate(expression);
				
				if (evaluator.isOK()) {
					System.out.println("That expression equals: " + result);
				} else {
					System.out.println(evaluator.getERROR());
				}
				
				System.out.println();
				
				System.out.println("Evaluate another expression [Y/N]?");
				
				again = in.nextLine();
				
				System.out.println();	
			} while (again.equalsIgnoreCase("y"));
		} catch (Exception IOException) {
			System.out.println("I missed an error condition!!");
		}
	}
    
}
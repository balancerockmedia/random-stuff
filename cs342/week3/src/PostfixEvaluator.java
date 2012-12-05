import java.util.StringTokenizer;

public class PostfixEvaluator {
	private final char ADD = '+';
	private final char SUBTRACT = '-';
	private final char MULTIPLY = '*';
	private final char DIVIDE = '/';
	
	private Stack<Double> stack;
	
	private enum STATUS {
	    OK, EXTRA_OPERATOR, BAD_OPERAND, WRONG_ORDER
	}
	
	private STATUS status = STATUS.OK;
	
	public PostfixEvaluator() {
		stack = new Stack<Double>();
	}
	
	public double evaluate(String expr) {
		double op1, op2, result = 0;
		String token;
		StringTokenizer tokenizer = new StringTokenizer(expr);
		
		while (tokenizer.hasMoreTokens()) {
			token = tokenizer.nextToken();
			
			if (isOperator(token)) {
				try {
					op2 = (stack.pop()).doubleValue();
					op1 = (stack.pop()).doubleValue();
					result = evalSingleOp(token.charAt(0), op1, op2);
					stack.push(new Double(result));
				} catch (Exception ArrayIndexOutOfBoundsException) {
					this.status = STATUS.EXTRA_OPERATOR;
				}
			} else {
				if (isPositive(token)) {
					try {
						stack.push(new Double(Double.parseDouble(token)));
					} catch (Exception ArrayIndexOutOfBoundsException) {
						this.status = STATUS.WRONG_ORDER;
					}
				} else if (isNegative(token)) {
					try {
						stack.push(new Double(Double.parseDouble(extractNegative(token))));
					} catch (Exception ArrayIndexOutOfBoundsException) {
						this.status = STATUS.WRONG_ORDER;
					}
				} else {
					this.status = STATUS.BAD_OPERAND;
					break;
				}
			}
		}
		
		return result;
	}
	
	private boolean isPositive(String token) {
		String pattern = "\\d+(\\.\\d+)?";
		
		return token.matches(pattern);
	}
	
	private boolean isNegative(String token) {
		String pattern = "\\(\\-\\d+(\\.\\d+)?\\)";
		
		return token.matches(pattern);
	}
	
	private String extractNegative(String token) {
		String temp = token.replaceAll("\\(", "");
		
		return temp.replaceAll("\\)", "");
	}
	
	private boolean isOperator(String token) {
		return (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/"));
	}
	
	private double evalSingleOp(char operation, double op1, double op2) {
		double result = 0;
		
		switch (operation) {
			case ADD:
			result = op1 + op2;
			break;
			
			case SUBTRACT:
			result = op1 - op2;
			break;
			
			case MULTIPLY:
			result = op1 * op2;
			break;
				
			case DIVIDE:
			result = op1 / op2;
			break;
		}
		
		return result;
	}
	
	public boolean isOK() {
		return status == STATUS.OK;
	}
	
	public String getERROR() {
		String message = "";
		
		switch (this.status) {
			case EXTRA_OPERATOR:
			message = "Error: Extra Operator";
			break;
			
			case BAD_OPERAND:
			message = "Error: Bad Operand";
			break;
			
			case WRONG_ORDER:
			message = "Error: Make sure the operators come after the operands";
			break;
		}
		
		return message;
	}
}
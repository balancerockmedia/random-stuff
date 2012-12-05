import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Palindrome {
	
	public Palindrome() {
		InputFile input_file = new InputFile();
		
		List<String> palindromes = input_file.getData();
		
		for (String palindrome : palindromes) {
			if (valid(palindrome)) {
				System.out.println(palindrome + " - valid palindrome");
			} else {
				System.out.println(palindrome + " - not a valid palindrome");
			}
		}
	}
	
	private boolean valid(String palindrome) {
		List<Character> stack = new ArrayList<Character>();
		
		// strip out everything that ins't lower case alpha
		String temp = palindrome.toLowerCase().replaceAll("[^a-z]", "");
		
		// split into an array of characters
		char[] chars = temp.toCharArray();
		
		// add each to the stack
		for (int i = 0; i < chars.length; i++) {
			stack.add(chars[i]);
		}
		
		String temp2 = "";
		
		// reverse loop to build up a string in the reverse order
		for (int i = stack.size()-1; i >= 0; i--) {
			temp2 += stack.get(i);
		}
		
		// if the two are equal, it's a palindrome
		return temp.equals(temp2);
	}
	
	public static void main(String[] args) {
		new Palindrome();
	}
	
}

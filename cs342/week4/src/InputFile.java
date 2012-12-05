import java.io.*;
import java.util.Scanner;
import java.util.Stack;

public class InputFile {
	
	private RandomAccessFile raf;
	
	public boolean openFile() {		
		int count = 0;
		boolean retval = true;
		
		do {
			System.out.println("Enter a file name:");
			
			Scanner input = new Scanner(System.in);
			
			String filename = input.nextLine();
			
			try {
				raf = new RandomAccessFile(filename, "r");
			} catch (FileNotFoundException e) {
				count++;
			}
		} while (raf == null && count < 3);
		
		if (count == 3) {
			retval = false;
			terminate("You did not enter a valid filename!");
		}
		
		return retval;
	}
	
	public int[][] getData() {
		int [][] grid;
		int rows = 0;
		int cols = 0;
		Stack<String> stack = new Stack<String>();
		
		if (openFile()) {
			String line = null;
			
			try {
				System.out.println("");
				
				while ((line = raf.readLine()) != null) {
					// this will get the line with the most chars
					if (cols != 0 && cols != line.length()) {
						terminate("The columns are not equal in length!");
					} else {
						cols = line.length();
					}
					
					stack.push(line.trim());
					
					rows++;
				}
			} catch (Exception e) {
				terminate("Error reading file!");
			}
		}
		
		grid = new int[rows][cols];
		
		for (int i = stack.size() - 1; i >= 0; i--) {
			String line = stack.pop();
			
			for (int j = 0; j < cols; j++) {
				// is there a better way to do this? Working around ASCII values seems too complex.
				grid[i][j] = line.charAt(j) - '0';
			}
		}
		
		return grid;
	}
	
	private void terminate(String message) {
		System.out.println(message);
		System.exit(0);
	}
	
}

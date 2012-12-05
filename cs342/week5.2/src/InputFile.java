import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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
	
	public List<String> getData() {
		List<String> palindromes = new ArrayList<String>();
		
		if (openFile()) {
			String line = null;
			
			try {
				while ((line = raf.readLine()) != null) {
					palindromes.add(line);
				}
			} catch (Exception e) {
				terminate("Error reading file!");
			}
		}
		
		return palindromes;
	}
	
	private void terminate(String message) {
		System.out.println(message);
		System.exit(0);
	}
	
}

import java.util.Iterator;
import java.util.Scanner;

public class PalmPilot {
	
	private LinkedOrderedList<Task> list;
	
	public PalmPilot() {
		list = new LinkedOrderedList<Task>();
		
		boolean run_program = true;
		
		while (run_program) {
			System.out.println("Enter a(dd), r(emove), p(rint) or q(uit):");
			
			Scanner input = new Scanner(System.in);
			
			String line = input.nextLine();
			
			if (line.equals("a")) {
				doAdd();
			} else if (line.equals("r")) {
				doRemove();
			} else if (line.equals("p")) {
				doPrint();
			} else if (line.equals("q")) {
				run_program = false;
				
				list = null;
				
				System.out.println("Done");
			}
		}
	}
	
	public void doAdd() {
		System.out.println("Enter task description:");
		
		Scanner input1 = new Scanner(System.in);
		String line1 = input1.nextLine();
		
		System.out.println("Enter task priority (from 1 to 9):");
		
		Scanner input2 = new Scanner(System.in);
		
		String line2 = input2.nextLine();
		
		if (line2.matches("[1-9]")) {			
			Task task = new Task(line1, Integer.parseInt(line2));
			
			list.add(task);
			
			System.out.println("Task has been added");
		} else {
			System.out.println("Task has not been added, priority must be between 1 and 9");
			
			return;
		}
	}
	
	public void doRemove() {
		if (list.size() == 0) {
			System.out.println("The task list is empty");
		} else {
			System.out.println("Enter task description:");
			
			Scanner input = new Scanner(System.in);
			String line = input.nextLine();
			
			Task task = new Task(line, 0);
			
			Task removed = list.remove(task);
			
			if (removed == null) {
				System.out.println("This task does not exist");
			} else {
				System.out.println(removed.contents + " has been removed");
			}
		}
	}
	
	public void doPrint() {
		System.out.println("List size: " + list.size());
		
		if (list.size() > 0) {
			Iterator<Task> i = list.iterator();
			
			do {
				System.out.println("    " + i.next());
			} while(i.hasNext());
		}
	}
	
	public static void main(String[] args) {
		new PalmPilot();
	}

}

public class Task implements Comparable<Task> {
	public String contents;
	public int priority;
	
	public Task(String contents, int priority) {
		this.contents = contents;
		this.priority = priority;
	}
	
	@Override
	public boolean equals(Object other) {
		boolean result = false;
		
		if (other instanceof Task) {
			result = ((Task) other).contents.equalsIgnoreCase(this.contents);
		}
		
		return result;
	}
	
	@Override
	public int compareTo(Task other) {
		if (other.priority < this.priority) {
    		return 1;
    	} else if (other.priority > this.priority) {
    		return -1;
    	} else {
    		return 0;
    	}
	}
	
	@Override
	public String toString() {
		return this.priority + " " + this.contents;
	}
}

public class Maze {
	
	private Position[][] matrix;
	LinkedStack<Position> ls = new LinkedStack<Position>();
	
	public Maze(int[][] grid) {
		// get the array size (is there a better way assuming that the rows widths might be different?)
		int rows = 0;
		int cols = 0;
		
		for (int i=0; i<grid.length; i++) {
			rows++;
			
			int temp_cols = 0;
			
			for (int j=0; j<grid[i].length; j++) {
				temp_cols++;
           	}
			
			if (temp_cols > cols) {
				cols = temp_cols;
			}
		}
		
		// init the matrix array
		matrix = new Position[rows][cols];
		
		// populate the matrix with Position objects
		for (int i=0; i<grid.length; i++) {
			for (int j=0; j<grid[i].length; j++) {
				
				Position position;
				
				if (grid[i][j] == 0) {
					position = new Position(i, j, Status.BLOCKED, null);
				} else {
					position = new Position(i, j, Status.FREE, null);
				}
				
				matrix[i][j] = position;
           	}
		}
	}
	
	public boolean traverse() {
		boolean done = false;
		Position position;
		
		// make sure the entry point isn't blocked
		if (matrix[0][0].status == Status.BLOCKED) {
			done = true;
		} else {
			ls.push(matrix[0][0]);
		}
		
		while (!done) {
			position = ls.pop();
			position.status = Status.TRIED;
			
			StringBuilder line = new StringBuilder();
			
			for (int i=0; i<matrix.length; i++) {
				for (int j=0; j<matrix[i].length; j++) {
					line.append(matrix[i][j].status + " ");
	           	}
				
				line.append("\n");
			}
		    
		    if (position.x == matrix.length-1 && position.y == matrix[0].length-1) {
		        done = true;
		        markPath(position);
		    } else {
		    	if (position.x - 1 >= 0) {
		    		push_new_pos(matrix[position.x - 1][position.y], position);
		    	}
		    	
		    	if (position.x + 1 < matrix.length) {
		    		push_new_pos(matrix[position.x + 1][position.y], position);
		    	}
		    	
		    	if (position.y - 1 >= 0) {
		    		push_new_pos(matrix[position.x][position.y - 1], position);
		    	}
		    	
		    	if (position.y + 1 < matrix[position.x].length) {
		    		push_new_pos(matrix[position.x][position.y + 1], position);
		    	}
		    }
		}
		
		return done;
	}
	
	public void push_new_pos(Position position, Position previous) {
		if (valid(position)) {
			position.previous = previous;
			
			ls.push(position);
		}
	}
	
	public boolean valid(Position position) {
		boolean result = false;
		
		if (position.x >= 0 && position.x < matrix.length && position.y >= 0 && position.y < matrix[position.x].length) {
			if (matrix[position.x][position.y].status == Status.FREE) {
				result = true;
			}
		}
		
		return result;
	}
	
	public void markPath(Position position) {
		Position current = position;
		
		// go back up and set the path
		while (current.previous != null) {
			current.status = Status.PATH;
			current = current.previous;
		}
		
		// set the entry point
		matrix[0][0].status = Status.PATH;
	}
	
	@Override
	public String toString() {
		StringBuilder line = new StringBuilder();
		
		for (int i=0; i<matrix.length; i++) {
			for (int j=0; j<matrix[i].length; j++) {
				line.append(matrix[i][j]);
           	}
			
			line.append("\n");
		}
		
		return line.toString();
	}
	
	public enum Status {
		FREE, BLOCKED, TRIED, PATH
	}
	
	private class Position {
		public int x; 
		public int y;
		public Status status;
		public Position previous;
		
		public Position (int x, int y, Status status, Position previous) {
			this.x = x;
		    this.y = y;
		    this.status = status;
		    this.previous = previous;
		}
		
		@Override
		public String toString() {
			String retval = "";
			
			switch (this.status) {
				case FREE:
				retval = "1";
				break;
				
				case BLOCKED:
				retval = "0";
				break;
				
				case TRIED:
				retval = ".";
				break;
				
				case PATH:
				retval = "P";
				break;
			}
			
			return retval;
		}
	}
	
}
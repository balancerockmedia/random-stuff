public class MazeSearch {
	
	public static void main(String[] args) {
		InputFile input_file = new InputFile();
		int[][] grid = input_file.getData();

		if (grid.length == 0) {
			return;
		} else {
			Maze maze = new Maze(grid);
			
			System.out.println(maze.toString());
			
			if (maze.traverse()) {
				System.out.println("The maze was successfully traversed!\n");
				System.out.println(maze.toString());
			}
		}
		
	}
	
}

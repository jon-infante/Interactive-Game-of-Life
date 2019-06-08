// [Bonus 2]
// https://github.com/inv0w/Interactive-Game-of-Life
var grid;
var mouseColumn;
var mouseRow;
var gridSize = 8;

function setup () {
  createCanvas(400, 400);
   grid = new Grid(gridSize);
   grid.randomize(); //This randomizes the grid. (Was missing this piece in my code for so long and for some reason I just overlooked it in the instructions. Obviouisly this is the basis for how the entire program works, and finally understanding what the problem was really helped me not to skip over any small details looking forward.)

   // Step 4
  //print(' > The most challenging part of one of my customizations was the dragging function. As I"m typing this response up at the top I dont even have it completed but I am determined to make it work.');
  //print(' > I pushed myself outside of my comfort zone by forcing myself to do things that I dont fully understand yet, and I realize that if I dont learn them now it will be much harder later. Accepting that not everything is going to come naturally all the time is something I still have trouble with sometimes.');
  //print(' > I would be happy because it is a small step, but a necessary one to remember that my future successes wont always be so clear during the beginning stages.');
}


//[Step 3] Randomizes when you press Shift.
function keyPressed() {
  if (keyCode === SHIFT) {
    grid.randomize();
  }
}

function mousePressed(){
  //  grid.randomize(); //Randomizes the grid when the mouse is pressed (Wasn't sure to leave this enabled before submitting. I always kept it enabled as I liked re-randomizing the grid mid code.) 
// I guess looking back this is one of the two challeneges haha. 
// Pressing down the middle mouse button will now re-randomize instead.

  var randomColumn = floor(random(grid.numberOfColumns));
  var randomRow = floor(random(grid.numberOfRows));
  var randomCell = grid.cells[randomColumn][randomRow];
  var neighborCount = grid.getNeighbors(randomCell).length;
  
  //print("cell at " + randomCell.column + ", " + randomCell.row + " has " + neighborCount + " neighbors");
  //print(grid.isValidPosition(0, 0)); // Is true
  //print(grid.isValidPosition(-1, -1)); // Is False
 
  // Add an example for all of the possible ways that it should return false
  //print(grid.isValidPosition(0,1));
  grid.updateNeighborCounts();
  grid.updatePopulation();
  //print(grid.cells);
}

//Draws the cells and updates Population and Neighbor Counts
function draw () {
  background(250);
  grid.updateNeighborCounts();
  grid.updatePopulation();
  grid.comeAlive(); //[Step 3]
  grid.draw();
    
  //[Step 3] Defining Columns and Rows based off mouse location and grid size
  mouseColumn = floor(mouseX / gridSize);
  mouseRow = floor(mouseY / gridSize); 
 
class Cell {
  constructor(column, row, size) {
    this.column = column;
    this.row = row;
    this.size = size;
    this.isAlive = false;
    this.liveNeighborCount = 0;
  }
  //fills the squares with different valued colors
  draw() {
    if(this.isAlive === true) {
      fill(0, 200, 0, 150); //Green Alpha Color
    }
    else if(this.isAlive === false){ 
      fill(255, 20, 40, 180); //Red Alpha Color
    }
    noStroke();
      rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
  }
  
  //Alive or Dead
  setIsAlive(value){
    if(value){
      this.isAlive = true;
    }
    else {
      this.isAlive = false;
    }
  }
  //Chooses whether or not a Cell dies based on it's neighbours
  liveOrDie(){
    if (this.isAlive){
      if (this.liveNeighborCount == 2 || this.liveNeighborCount == 3){
        this.isAlive = true;
      }
      else {
        this.isAlive = false;
      }
    }
    if (!this.isAlive) {
      if(this.liveNeighborCount === 3){ //If cell count around a certain cell is 3, then set alive to true
        this.isAlive = true;
      }
      else{
        this.isAlive = false;
      }
    }
  }
}

//Entirity of what is shown in result
class Grid {
  constructor (cellSize) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    this.cellSize = cellSize;
    this.numberOfRows = height/cellSize;
    this.numberOfColumns = width/cellSize;
    
    //defines a new array
    var cells;
    this.cells = new Array(this.numberOfColumns);
    for (var i = 0; i < this.numberOfColumns; i ++) {
      this.cells[i] = new Array(this.numberOfRows);
    }
      for (var column = 0; column < this.numberOfColumns; column ++) {
        for (var row = 0; row < this.numberOfRows; row++) {
          this.cells[column][row] = new Cell(column, row, cellSize);
      }
    }
    print(this.cells);
 
  }
   draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        cell.draw();
      }
    }
  }
 //[Step 3]If Mouse is pressed at a certain location, that cell will come alive.
  comeAlive(){
  if (mouseIsPressed) {
    var cell = this.cells[mouseColumn][mouseRow];
    cell.isAlive = true;
  }
}
  //Initial random seed
  randomize(){
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        cell.setIsAlive(floor(random(2)));
      }
    }
  }
  //Keeps population count
  updatePopulation(){
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        cell.liveOrDie();
      }
    }
  }
  getNeighbors(currentCell) {
  var neighbors = [];

  // Get neighbors and add to array. This code is big on determining local relativity of each cell compared to each other.
  for (var xOffset = -1; xOffset <= 1; xOffset++) {
    for (var yOffset = -1; yOffset <= 1; yOffset++) {
      var neighborColumn = currentCell.column + xOffset;
      var neighborRow = currentCell.row + yOffset;
  //Checks for if the cell is in a Valid Position. Checks for edges of the array and when neighbors don't always have 8.
    if(this.isValidPosition(neighborColumn, neighborRow) && this.cells[neighborColumn][neighborRow] != this.cells[currentCell.column][currentCell.row]){
        neighbors.push(this.cells[neighborColumn][neighborRow]);
      }
    }
  }
  return neighbors;
 }
 
  isValidPosition (column, row) {
  // add logic that checks if the column and row exist in the grid
      if(column < this.numberOfColumns && column >= 0 && row < this.numberOfRows && row >= 0){
        return true;
      }
      else{
        return false;
      }
  }
  updateNeighborCounts(){
    // for each cell in the grid
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
    // reset if neighbor count is 0
        cell.liveNeighborCount = 0;
    // set's the cell's neighbor count
       var n = this.getNeighbors(cell);
       cell.neighborCount = n.length;
    // increase the count by 1 for each neighbor that is alive
        for(var i = 0; i < n.length; i++){
          if(n[i].isAlive){
            cell.liveNeighborCount++;
          }
        }
      }
    }
  }
}

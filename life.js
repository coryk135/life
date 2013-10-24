/*

2d array of cells
 -a cell has two states
  ->alive
  ->dead

game loop
 -two operations
  ->collect outcome of next iteration
  ->update board

use an interval

Rules
1.  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
      if(cells[i][j].alive && cells[i][j].neighbors < 2){
        cells[i][j].alive = false;
      }

2.  Any live cell with two or three live neighbours lives on to the next generation.
      if(cells[i][j].alive && cells[i][j].neighbors == 2 || 3){
        cells[i][j].alive = true;
      }
3.  Any live cell with more than three live neighbours dies, as if by overcrowding.
      if(cells[i][j].alive && cells[i][j].neighbors > 3){
        cells[i][j].alive = false;
      }
4.  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if(!cells[i][j].alive && cells[i][j].neighbors == 3){
        cells[i][j].alive = true;
      }

*/


var createCellArray = function(rows, columns){
  var cells = [];
  for(var i = 0; i<rows; i+=1){
    cells.push([]);
    for(var j = 0; j<columns; j+=1){
      cells[i].push(cell());
    }
  }
  return cells;
}

var cell = function(){return {alive: false, neighbors: 0}};
var rows = 100;
var columns = 100;
var mainCells = createCellArray(rows, columns);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(200,0,0)";
//ctx.fillRect (10, 10, 55, 50);

//sctx.fillStyle = "rgba(0, 0, 200, 0.5)";
//ctx.fillRect (30, 30, 55, 50);



var countNeighbors = function(x,y,cells,rows,columns){
  var numNeighbors = 0;
  for(var i = -1; i<=1; i+=1){
    for(var j = -1; j<=1; j+=1){
      if(!(x+i < 0 || x+i >= rows || y+j < 0 || y+j >= columns || (i == 0 && j == 0)) && cells[i+x][j+y].alive){
        numNeighbors += 1;
      }
    }
  }
  return numNeighbors;
}

var getNextBoard = function(cells){
  var nextCells = createCellArray(rows, columns);

  for(var i = 0; i<rows; i+=1){
    for(var j = 0; j<columns; j+=1){
      cells[i][j].neighbors = countNeighbors(i,j,cells,rows,columns);
      if(cells[i][j].alive && cells[i][j].neighbors < 2){
        nextCells[i][j].alive = false;
      } else if(cells[i][j].alive && cells[i][j].neighbors > 3){
        nextCells[i][j].alive = false;
      } else if(!cells[i][j].alive && cells[i][j].neighbors == 3){
        nextCells[i][j].alive = true;
      } else {
        nextCells[i][j].alive = cells[i][j].alive;
      }
    }
  }
  return nextCells;

}

var drawCells = function(cells, width, height){
  //ctx.clearRect(0,0,ctx.width, ctx.height);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.clearRect(0,0,1000, 1000);
  ctx.fillStyle = "rgb(200,0,0)";
  for(var i = 0; i<width; i+=1){
    for(var j = 0; j<height; j+=1){
      if(cells[i][j].alive){
        ctx.fillRect(i*10,j*10, 10, 10);
      }
    }
  }
}

var main = function(){
  var cells = mainCells;
  drawCells(cells, rows,columns);
  cells = getNextBoard(cells);
  console.log('hi')
  mainCells = cells;
  //return cells;
  //setTimeout(main(cells), 500);
}

//ctx.fillRect(15,15,20,20);
mainCells[0][0].alive = true;
mainCells[0][1].alive = true;
mainCells[1][0].alive = true;
mainCells[1][1].alive = true;

mainCells[2][2].alive = true;
mainCells[2][3].alive = true;
mainCells[3][2].alive = true;
mainCells[3][3].alive = true;


mainCells[10][10].alive = true;
mainCells[11][10].alive = true;
mainCells[10][11].alive = true;
mainCells[11][11].alive = true;



var id = setInterval(main, 500);
console.log(id);

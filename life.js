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

//R-pentomino
/*
mainCells[51][50].alive = true;
mainCells[50][51].alive = true;
mainCells[50][52].alive = true;
mainCells[51][51].alive = true;
mainCells[52][51].alive = true;
*/

//Diehard
/*
mainCells[50][56].alive = true;
mainCells[51][50].alive = true;
mainCells[51][51].alive = true;
mainCells[52][51].alive = true;
mainCells[52][55].alive = true;
mainCells[52][56].alive = true;
mainCells[52][57].alive = true;
*/

//acorn
/*
mainCells[50][51].alive = true;
mainCells[51][53].alive = true;
mainCells[52][50].alive = true;
mainCells[52][51].alive = true;
mainCells[52][54].alive = true;
mainCells[52][55].alive = true;
mainCells[52][56].alive = true;
*/

//Gosper gun
//uhh x and y are backwards
var sx = 0;
var sy = 0;
mainCells[sx+4][sy].alive = true;
mainCells[sx+5][sy].alive = true;
mainCells[sx+4][sy+1].alive = true;
mainCells[sx+5][sy+1].alive = true;

mainCells[sx+4][sy+10].alive = true;
mainCells[sx+5][sy+10].alive = true;
mainCells[sx+6][sy+10].alive = true;
mainCells[sx+3][sy+11].alive = true;
mainCells[sx+7][sy+11].alive = true;
mainCells[sx+2][sy+12].alive = true;
mainCells[sx+8][sy+12].alive = true;
mainCells[sx+2][sy+13].alive = true;
mainCells[sx+8][sy+13].alive = true;

mainCells[sx+5][sy+14].alive = true;
mainCells[sx+3][sy+15].alive = true;
mainCells[sx+7][sy+15].alive = true;
mainCells[sx+4][sy+16].alive = true;
mainCells[sx+5][sy+16].alive = true;
mainCells[sx+6][sy+16].alive = true;
mainCells[sx+5][sy+17].alive = true;

mainCells[sx+2][sy+20].alive = true;
mainCells[sx+3][sy+20].alive = true;
mainCells[sx+4][sy+20].alive = true;
mainCells[sx+2][sy+21].alive = true;
mainCells[sx+3][sy+21].alive = true;
mainCells[sx+4][sy+21].alive = true;

mainCells[sx+1][sy+22].alive = true;
mainCells[sx+5][sy+22].alive = true;

mainCells[sx+0][sy+24].alive = true;
mainCells[sx+1][sy+24].alive = true;
mainCells[sx+5][sy+24].alive = true;
mainCells[sx+6][sy+24].alive = true;

mainCells[sx+2][sy+34].alive = true;
mainCells[sx+3][sy+34].alive = true;
mainCells[sx+2][sy+35].alive = true;
mainCells[sx+3][sy+35].alive = true;


var id = setInterval(main, 50);
console.log(id);

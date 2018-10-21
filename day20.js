let GRID = [
      ["", "", "", "^", "", "", "", "", "", ""],
      ["", "", "v", "", "~", "", "", "", "", ""],
      ["", "v", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "v", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "^", "~", "~", "", "", "", "^", "", ""],
      ["", "^", "", "~", "~", "", "", "", "", ""],
      ["", "^", "", "", "~", "~", "", "", "", ""],
    ];

function countRows(){
  return GRID.length;
}

function countColumns(){
  return GRID[0].length;
}

function gridSize(){
  var columns = countColumns().toString();
  var rows = countRows().toString();
  return columns + " x " + rows;
}

function totalCells(){
  return countRows() * countColumns();
}

function convertColumn(str){
  return str.charCodeAt(0) - 65;
}

function lightCell(cell){
  var row = parseInt(cell.substring(1)) -1;
  
  if (cell[0] == cell[0].toUpperCase() && row >= 0 && row < 11){
      return GRID[row][convertColumn(cell)];
  }
  else {
    return false;
  }
}

function isRock(cell){
  if (lightCell(cell) == '^'){
    return true;
  }
  return false;
}

function isCurrent(cell){
  if (lightCell(cell) == '~'){
    return true;
  }
  return false;
}

function isShip(cell){
  if (lightCell(cell) == 'v'){
    return true;
  }
  return false;
}
function lightRow(row){
  var returnRow = [];
  var length = countColumns();
  
  for (var i =0; i<length; i++){
    
    // set cell string
    var cell = String.fromCharCode(i + 65);
    cell += row.toString();
    
    if (isRock(cell)){
      returnRow.push('^');
    } else if (isCurrent(cell)){
      returnRow.push('~');
    } else if (isShip(cell)){
      returnRow.push('v');
    } else{
      returnRow.push('');
    }
    
  }
  return returnRow;
}

function lightColumn(col){
  var returnCol = [];
  var length = countRows();
  var column = convertColumn(col);
  
  for (i = 0; i < length; i++){
    returnCol.push(GRID[i][column]);
  }
  return returnCol;
}

function cellToString(row, col){
  var str = String.fromCharCode(col + 65);
  str += (row+1);
  return str;
}

function allRocks(){
  var rockList = [];
  for (var i = 0, n = countRows(); i<n; i++){
    for (var j = 0, m = countColumns(); j<m; j++){
      if (GRID[i][j] == '^'){
        rockList.push(cellToString(i, j));
      }
    }
  }
  return rockList;
}

function allCurrents(){
  var currentList = [];
  for (var i=0, n=countRows(); i<n; i++){
    for (var j=0, m=countColumns(); j<m; j++){
      if (GRID[i][j] == '~'){
        currentList.push(cellToString(i, j));
      }
    }
  }
  return currentList;
}

function allShips(){
  var shipList = [];
  for (var i=0, n=countRows(); i<n; i++){
    for (var j=0, m=countColumns(); j<m; j++){
      if (GRID[i][j] == 'v'){
        shipList.push(cellToString(i, j));
      }
    }
  }
  return shipList;
}

function firstRock(){
  return allRocks()[0];
}

function firstCurrent(){
  return allCurrents()[0];
}


function shipReport(){
  var west = "";
  var east = "";
  var n = countRows();
  var m = countColumns();
  var firstC = m;
  var firstR = 0;
  var lastC = 0;
  var lastR = 0;

  for (var i=0; i<n; i++){
  
    for (var j=0; j<m; j++){
      if (GRID[i][j]=='v'){
        if (j < firstC){
          firstC=j;
          firstR=i;
        }
        if(j>lastC){
          lastC=j;
          lastR=i;
        }
      }
    }
  }
  return [cellToString(firstR, firstC), cellToString(lastR, lastC)];
}

function howDangerous(cell){
  var danger = 0;
  if(isRock(cell)){
    danger = 100;
  } else if (isCurrent(cell)){
    danger = 50;
  }
  return danger;
}

function percentageReport(){
  var percentRocks = Number((100 * allRocks().length / totalCells()).toFixed(2));
  var percentCurrents = Number((100 * allCurrents().length / totalCells()).toFixed(2));
  return [percentRocks, percentCurrents];
}

function dangerLevel(ch){
  if (ch == '^'){
    return 100;
  } else if (ch == '~'){
    return 50;
  }
  return 0;
}

function safetyReport(){
  var safetyGrid = [];
  for (var i = 0, n = countRows(); i<n; i++){
    var row = [];
    for (var j = 0, m = countColumns(); j<m; j++){
      var danger = howDangerous(cellToString(i, j));
      row.push(danger);
    }
    safetyGrid.push(row);
  }
  return safetyGrid; 
  
  /*
  var safetyGrid = [];
  for (var i = 0; i<countRows(); i++){
    safetyGrid.push(GRID.map(dangerLevel()));
  }
  return safetyGrid;
  */
}

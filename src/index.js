let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.width = 500;
c.height = 500;
let rows, cols, grid;
let cellsize = 10;
rows = c.width / cellsize;
cols = c.width / cellsize;
let gameSpeed = 50;
let running = false;
let runGame;

let newMapBtn = document.getElementById("button");
let playBtn = document.getElementById("stop");
let randoBtn = document.getElementById("random");
// console.log(randomGrid());
newMapBtn.addEventListener("click", () => {
  newGrid();
  draw();
});
randoBtn.addEventListener("click", () => {
  randomGrid();
  draw();
});
playBtn.addEventListener("click", () => {
  playPause();
  if (running === false) {
    runGame = setInterval(nextCycle, gameSpeed);
    running = true;
  } else {
    clearInterval(runGame);
    running = false;
  }
});

randomGrid();
draw();
// setInterval(nextCycle, 500);
// console.log(areaCheck(5, 6));
//making the grid.
function createGrid(cols, rows) {
  let arr = new Array(cols);
  for (let x = 0; x < arr.length; x++) {
    arr[x] = new Array(rows);
  }
  return arr;
}

function randomGrid() {
  grid = createGrid(rows, cols);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (Math.random() < 0.5) {
        grid[x][y] = true;
      } else {
        grid[x][y] = false;
      }
    }
  }
  return grid;
}

function newGrid() {
  grid = createGrid(rows, cols);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y] = false;
    }
  }
  return grid;
}

function draw() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let xCell = x * cellsize,
        yCell = y * cellsize;
      if (grid[x][y] === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(xCell, yCell, cellsize, cellsize);
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(xCell, yCell, cellsize, cellsize);
        // ctx.strokeStyle = "black";
        // ctx.strokeRect(xCell, yCell, cellsize, cellsize);
      }
    }
  }
}

c.addEventListener("click", (e) => {
  if (running === true) {
    clearInterval(runGame);
    running = false;
    playPause();
  }
  let bound = c.getBoundingClientRect();
  const pos = {
    x: e.clientX - bound.left,
    y: e.clientY - bound.top
  };
  // console.log(pos.x, pos.y);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let xCell = x * cellsize,
        yCell = y * cellsize;
      if (
        pos.x > xCell &&
        pos.x <= xCell + cellsize &&
        pos.y > yCell &&
        pos.y <= yCell + cellsize
      ) {
        // console.log(grid[x][y]);
        if (grid[x][y]) {
          grid[x][y] = false;
        } else {
          grid[x][y] = true;
        }
      }
    }
  }
  draw();
});

function areaCheck(x, y) {
  let numAlive = 0;
  for (let h = -1; h < 2; h++) {
    for (let v = -1; v < 2; v++) {
      if (h === 0 && v === 0) continue;
      if (h + x < 0 || x + h > cols - 1) continue;
      if (y + v < 0 || y + v > rows - 1) continue;
      if (grid[x + h][y + v]) {
        numAlive++;
      }
    }
  }
  return numAlive;
}

function nextCycle() {
  let newMap = createGrid(cols, rows);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let neighbors = areaCheck(x, y);
      if (grid[x][y] && neighbors >= 2 && neighbors <= 3) {
        newMap[x][y] = true;
      } else if (!grid[x][y] && neighbors === 3) {
        newMap[x][y] = true;
      }
    }
  }
  grid = newMap;
  draw();
}

//Slider stuffs
let slider = document.getElementById("slider");
let speed = document.getElementById("speed");
speed.innerHTML = slider.value;

slider.oninput = function () {
  speed.innerHTML = this.value / 1000;
  gameSpeed = this.value;
};

function playPause() {
  // no ';' here
  if (playBtn.innerHTML === "Play") playBtn.innerHTML = "Pause";
  else playBtn.innerHTML = "Play";
}

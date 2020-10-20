// setting up the canvas
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let ratio = document.getElementById("ratio")
c.width = +ratio.value;
c.height = +ratio.value;
let grid, size;
let cellsize = 10;
size = c.width / cellsize;
let arr1 = [];
let arr2 = [];
let buffer = [arr1, arr2]
let bufferNum = 0

//determining the functions of the canvas
let state = "random"
let gameSpeed = 50;
let running = false;
let runGame;
let genCount = 0;

// grabbing dom elements
let gen = document.getElementById("gen")
gen.innerText = genCount;
let newMapBtn = document.getElementById("button");
let playBtn = document.getElementById("stop");
let randoBtn = document.getElementById("random");


//event listeners
ratio.addEventListener("change", changeSize)
newMapBtn.addEventListener("click", () => {
  newGrid();
  state = "new"
  genCount = 0;
  gen.innerText = genCount;
  draw();
});
randoBtn.addEventListener("click", () => {
  randomGrid();
  state = "random"
  genCount = 0;
  gen.innerText = genCount;
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
c.addEventListener("click", handleClick);

//Slider stuffs
let slider = document.getElementById("slider");
let speed = document.getElementById("speed");
speed.innerHTML = slider.value;

slider.oninput = function () {
    if (running === true) {
        clearInterval(runGame);
        running = false;
        playPause();
      }
  speed.innerHTML = this.value
  gameSpeed = this.value;
};


//initializing map
randomGrid();
draw()

//all our functions
function createGrid(size) {
  let arr = new Array(size);
  for (let x = 0; x < arr.length; x++) {
    arr[x] = new Array(size);
  }
  return arr;
}

function randomGrid() {
  grid = createGrid(size)
  console.log("rand", bufferNum)
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (Math.random() < 0.5) {
        grid[x][y] = true;
      } else {
        grid[x][y] = false;
      }
    }
  }
  buffer[bufferNum] = grid;
  buffer[1-bufferNum] = createGrid(size)
}

function newGrid() {
    grid = createGrid(size)
  console.log("newb", bufferNum)
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      grid[x][y] = false;
    }
  }
  buffer[bufferNum] = grid;
  buffer[1-bufferNum] = createGrid(size)
}

function initFill() {
    ctx.fillStyle = "white"
    ctx.fillRect(0,0, c.width, c.height)
}

function draw() {
  initFill();
  
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      let xCell = x * cellsize,
        yCell = y * cellsize;
      if (grid[x][y] === true) {
        ctx.fillStyle = "black";
        ctx.fillRect(xCell, yCell, cellsize, cellsize);
    }
    }
  }
}


function handleClick(e) {
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
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
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
};

function areaCheck(x, y) {
  let numAlive = 0;
  for (let h = -1; h < 2; h++) {
    for (let v = -1; v < 2; v++) {
      if (h === 0 && v === 0) continue;
      if (h + x < 0 || x + h > size - 1) continue;
      if (y + v < 0 || y + v > size - 1) continue;
      if (grid[x + h][y + v]) {
        numAlive++;
      }
    }
  }
  return numAlive;
}

function nextCycle() {
    
  let newMap = buffer[1-bufferNum];
  
  bufferNum = 1 - bufferNum;
  console.log("next", bufferNum)
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      let neighbors = areaCheck(x, y);
      if (grid[x][y] && neighbors >= 2 && neighbors <= 3) {
        newMap[x][y] = true;
      } else if (!grid[x][y] && neighbors === 3) {
        newMap[x][y] = true;
      } else {
        newMap[x][y] = false;
      }
    }
  }
  grid = newMap;
  genCount+= 1
  gen.innerText = genCount
  draw();

}



function playPause() {
  // no ';' here
  if (playBtn.innerHTML === "Play") playBtn.innerHTML = "Pause";
  else playBtn.innerHTML = "Play";
}

function changeSize() {
    c.width = +ratio.value;
    c.height = +ratio.value;
    size = c.width / cellsize;
    state === "random" ? randomGrid() : newGrid()
    draw()
}

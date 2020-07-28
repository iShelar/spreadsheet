
let canvas, ctx, height, width, noOfRows, noOfColumns, preciseMouseClick = 13, fieldWidth = 90, fieldHeight = 30, cell,
topPadding = -15, leftPadding = 10;
let pos = [];
let alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','W','X','Y','Z'];

const input = document.getElementById("inputText");
const ovelay = document.getElementById("overlay");

let data = [];

// draw rows depending on height of canvas
const drawRows = () => {
  let x = 0,y = fieldHeight;
    for(let i = 0; i < (height / fieldHeight) - 1; i++){
      ctx.moveTo(x,y);
      ctx.lineTo(width,y);
      ctx.strokeStyle = "#808080";
      ctx.stroke();
      y += fieldHeight;
    }
}

// draw columns depending on width of canvas
const drawColoums = () => {
  let x = fieldWidth,y = 0;
    for(let i = 0; i < (width / fieldWidth) - 2; i++){
      ctx.moveTo(x,y);
      ctx.lineTo(x,width);
      ctx.strokeStyle = "#808080";
      ctx.stroke();
      x += fieldWidth;
    }
}

// draw text (A - Z) over column fields
const fillRowText = () => {
  let x = fieldWidth, y = fieldHeight;
  for(let i = 1; i < noOfColumns ; i++) {
    ctx.font = "20px Georgia";
    ctx.fillText(alphabets[i-1],x+90/2,y/2+5);
    x += fieldWidth;
  }
}

// draw numbers over row fields
const fillColumnText = () => {
  let x = fieldWidth, y = fieldHeight;
  for(let i = 1; i < noOfRows ; i++) {
    ctx.font = "20px Georgia";
    ctx.fillText(i,x/2,y+fieldHeight/2+5);
    y += fieldHeight;
  }
}

// get position of mouseclick to move input field
const getPosition = (event) =>
{
  let x = event.x;
  let y = event.y;
  let canvas = document.getElementById("canvas");
  // x -= canvas.offsetLeft;
  // y -= canvas.offsetTop;
  x -= preciseMouseClick;
  y -= preciseMouseClick;
  [x, y] = moveInputLocation(x,y);
  cell = `${alphabets[x - 1]}${y}`;

  if(data[cell] !== undefined) {
    input.value = data[cell];
  } else {
    input.value = "";
  }

  pos = [x,y];
}

// implementation of moving input field over canvas
const moveInputLocation = (x,y) => {
  input.style.display = "block";
  x = Math.floor(x/fieldWidth);
  y = Math.floor(y/fieldHeight);
  overlay.style.left = x * fieldWidth + 'px';
  overlay.style.top = y * fieldHeight + 'px';
  return [x, y];

}

// store field data in array data structure
const storeData = () => {
  data[cell] = input.value;
  input.value = "";
  input.style.display = "none";

}

// add item to data array and draw over canvas
const addItem = () => {
  
  input.addEventListener('keyup', (event) => {
    if(event.keyCode === 13) {
      console.log(cell);
      
      let [x , y] = pos;

      storeData();

      updateSheet();
    }
  });

  
}

const clearCanvas = () => {
  ctx.clearRect(0 , 0, canvas.width, canvas.height);
}

// UI to draw data over spreadsheet
const updateSheet = () => {
  clearCanvas();
  drawRows();
  drawColoums();
  fillRowText();
  fillColumnText();

  //draw all data array item to sheet
  const iterator = Object.keys(data);
  for (const key of iterator) {
    
    const x = alphabets.findIndex((cur) => cur == key.charAt(0)) + 1;
    const y = key.match(/(\d+)/g);
    ctx.font = "20px Georgia";
    ctx.fillText(data[key],(x * fieldWidth) + fieldWidth / 3, (y * fieldHeight) + fieldHeight - (fieldHeight / 3));

  }
     
 
}

// initialize the canvas with spreadsheet
const init = () => 
{    
  canvas = document.getElementById('canvas');
  height = canvas.scrollHeight;
  width = canvas.scrollWidth;
  noOfColumns = width / fieldWidth;
  noOfRows = height / fieldHeight;
  canvas.style.border = "groove";
  ctx = canvas.getContext('2d');
  ctx.beginPath();

  drawRows();
  drawColoums();
  fillRowText();
  fillColumnText();

  canvas.addEventListener("mousedown", getPosition, false);

  input.style.height = `${fieldHeight - 3}px`;
  input.style.width = `${fieldWidth - 5}px`;
  addItem();
    
}

init();


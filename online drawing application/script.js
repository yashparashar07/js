const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let color = '#000000';
let brushSize = 5;
let eraserMode = false;
let undoList = [];

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // Save the starting position for undo
  undoList.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = eraserMode ? 'white' : color;
  ctx.lineWidth = brushSize;
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

function setColor(e) {
  color = e.target.value;
}

function setBrushSize(e) {
  brushSize = e.target.value;
}

function setEraser(e) {
  eraserMode = e.target.checked;
  if (eraserMode) {
    color = "white";
  } else {
    color = "red";
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  undoList = [];
}

function undo() {
  if (undoList.length > 0) {
    ctx.putImageData(undoList.pop(), 0, 0);
  }
}

function saveImage() {
  const downloadLink = document.createElement('a');
  downloadLink.href = canvas.toDataURL();
  downloadLink.download = 'drawing.png';
  downloadLink.click();
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

const colorPicker = document.getElementById('colorPicker');
const brushSizeInput = document.getElementById('brushSize');
const eraserCheckbox = document.getElementById('eraser');

colorPicker.addEventListener('input', setColor);
brushSizeInput.addEventListener('input', setBrushSize);
eraserCheckbox.addEventListener('change', setEraser);

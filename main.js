var video, canvas, statusX, videoToBePlayed;
let isModelLoaded = false;

function preload() {
  
}


function setup() {
  // Calculate the central position of the canvas
  const canvasWidth = 682; // Set the desired canvas width
  const canvasHeight = 480; // Set the desired canvas height
  const centerX = (windowWidth - canvasWidth) / 2;
  const centerY = (windowHeight - canvasHeight) / 2;

  // Create a canvas and position it centrally
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(centerX, centerY);

  video = createCapture();
  console.log(video)
  video.size(682, 480);
  video.hide();


}

function draw() {
  if (isModelLoaded) {
    clear()
  }
  image(video, 0, 0, 682, 480);
  if (isModelLoaded) {
    objectDetectorX.detect(video, gotResult);
  }
}

function takeSnap() {
  photo = video.get();
  image(photo, 0, 0, 500, 500);
  console.log(objectDetectorX);
  objectDetectorX.detect(photo, gotResult);
}

function start() {
  document.getElementById("status").innerHTML = "Detecting Baby";
  objectDetectorX = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
  statusX = true;
  video.volume(0.1);
  isModelLoaded = true;
}

function windowResized() {
  // Recalculate the central position of the canvas when the window is resized
  const centerX = (windowWidth - width) / 2;
  const centerY = (windowHeight - height) / 2;
  canvas.position(centerX, centerY);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    res = results;
    drawResults(res)
  }
}


function drawResults(r) {
  for (i = 0; i < r.length; i++) {

    let label = r[i].label;
    if (label == 'bottle') {
      alert('DANGEROUS MISSILE DETECTED!!!!!');
      label = "MISSILE";
    }
    let conf = r[i].confidence;
    let x = r[i].x;
    let y = r[i].y;
    let height = r[i].height;
    let width = r[i].width;

    fill('#FF0000');
    text(label, x + 45, y + 75)
    noFill()
    stroke('#FF0000');
    rect(x, y, width, height)
  }
}
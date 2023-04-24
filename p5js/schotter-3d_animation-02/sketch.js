let xDim = 15;
let yDim = 15;
let zDim = 1;
let unitSize = 26;
let spacing = 12;
let canvas_size = 800;
let thestroke = canvas_size / 500;
let counter = 0;

let maxRotation = 50;
let maxDisplacement = 12;

let initialRotations = [];
let initialDisplacements = [];

function setup() {
  createCanvas(canvas_size, canvas_size, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  generateRandomValues();
}

function draw() {
  clear();
  background(0,0,0,0);

  let fovy = radians(500);
  let aspect = width / height;
  let near = 0.1;
  let far = 7000;
  perspective(fovy, aspect, near, far);

  camera(0, 0, 5000, 0, 0, 0, 0, 1, 0);

  counter++;
  let t = counter / 80;

  if (counter >= 80) {
    counter = 80;
  }

  drawArtwork(t);
}

function drawArtwork(t) {
  let offsetX = -((xDim * (unitSize + spacing)) / 2);
  let offsetY = -((yDim * (unitSize + spacing)) / 2);
  let offsetZ = -((zDim * (unitSize + spacing)) / 2);

  noFill();
  stroke(255);
  strokeWeight(thestroke);

  for (let x = 0; x < xDim; x++) {
    for (let y = 0; y < yDim; y++) {
      for (let z = 0; z < zDim; z++) {
        let centerX = offsetX + x * (unitSize + spacing) + unitSize / 2;
        let centerY = offsetY + y * (unitSize + spacing) + unitSize / 2;
        let centerZ = offsetZ + z * (unitSize + spacing) + unitSize / 2;

        let rotationX = lerp(0, initialRotations[y][x].x * (y / (yDim - 1)), t);
        let rotationY = lerp(0, initialRotations[y][x].y * (y / (yDim - 1)), t);
        let rotationZ = lerp(0, initialRotations[y][x].z * (y / (yDim - 1)), t);

        let displacementX = lerp(0, initialDisplacements[y][x].x * (y / (yDim - 1)), t);
        let displacementY = lerp(0, initialDisplacements[y][x].y * (y / (yDim - 1)), t);
        let displacementZ = lerp(0, initialDisplacements[y][x].z * (y / (yDim - 1)), t);

        push();
        translate(centerX + displacementX, centerY + displacementY, centerZ + displacementZ);
        rotateX(rotationX);
        rotateY(rotationY);
        rotateZ(rotationZ);
        box(unitSize);
        pop();
      }
    }
  }
}

function mousePressed() {
  counter = 0;
  generateRandomValues();
}

function generateRandomValues() {
  for (let y = 0; y < yDim; y++) {
    initialRotations[y] = [];
    initialDisplacements[y] = [];

    for (let x = 0; x < xDim; x++) {
      initialRotations[y][x] = {
        x: random(-maxRotation, maxRotation),
        y: random(-maxRotation, maxRotation),
        z: random(-maxRotation, maxRotation),
      };

      initialDisplacements[y][x] = {
        x: random(-maxDisplacement, maxDisplacement),
        y: random(-maxDisplacement, maxDisplacement),
        z: random(-maxDisplacement, maxDisplacement),
      };
    }
  }
}

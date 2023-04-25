let x_dim = 13;
let y_dim = 23;
let z_dim = 1;
let unit_size = 25;
let spacing = 1;
let canvas_size = 800;
let the_stroke = canvas_size / 500;
let counter = 0;

let max_rot = 50;
let max_disp = 12;

let ini_rot = [];
let ini_disp = [];

let generating_vals = false;

let sli_x_dim,
  sli_y_dim,
  sli_spacing,
  sli_max_disp,
  sli_max_rot;

function setup() {
  createCanvas(canvas_size, canvas_size, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);

  createSliders();

  generateRandomValues();
}

function draw() {
  clear();
  background(0,0,0,0);

  spacing = int(sli_spacing.value());
  max_disp = int(sli_max_disp.value());
  max_rot = int(sli_max_rot.value());

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

  if (!generating_vals) {
    drawArtwork(t);
  }
}
function createSliders() {
  let sli_width = '60px';
  let sli_height = '2px';
  let sli_thumb_size = '8px';

  function setSliderStyle(slider) {
    let sliderId = 'slider' + Math.random().toString(36).substr(2, 9);
    slider.elt.setAttribute('id', sliderId);

    let style = document.createElement('style');
    style.innerHTML = `
      #${sliderId} {
        -webkit-appearance: none;
        height: 0px;
        background-color: transparent;
      }
      #${sliderId}::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        width: 2px;
        height: 12px;
        background: #ffffff;
        cursor: pointer;
        margin-top: -4px;
      }
      #${sliderId}::-webkit-slider-runnable-track {
        width: 100%;
        height: ${sli_height};
        cursor: pointer;
        background: #ffffff;
      }
    `;
    document.head.appendChild(style);
  }

  sli_x_dim = createSlider(1, 30, x_dim);
  sli_x_dim.position(((width - width / 3) / 4) - width / 20, height - height / 20);
  sli_x_dim.input(() => {
    counter = 0;
    updateDimensions();
  });
  sli_x_dim.style('width', sli_width);
  setSliderStyle(sli_x_dim);

  sli_y_dim = createSlider(1, 30, y_dim);
  sli_y_dim.position((((width - width / 3) / 4) * 2) - width / 20, height - height / 20);
  sli_y_dim.input(() => {
    counter = 0;
    updateDimensions();
  });
  sli_y_dim.style('width', sli_width);
  setSliderStyle(sli_y_dim);

  sli_spacing = createSlider(0, 30, spacing);
  sli_spacing.position((((width - width / 3) / 4) * 3) - width / 20, height - height / 20);
  sli_spacing.input(() => {
    counter = 0;
    spacing = int(sli_spacing.value());
  });
  sli_spacing.style('width', sli_width);
  setSliderStyle(sli_spacing);

  sli_max_disp = createSlider(0, 100, max_disp);
  sli_max_disp.position((((width - width / 3) / 4) * 4) - width / 20, height - height / 20);
  sli_max_disp.input(() => {
    counter = 0;
    max_disp = int(sli_max_disp.value());
  });
  sli_max_disp.style('width', sli_width);
  setSliderStyle(sli_max_disp);

  sli_max_rot = createSlider(0, 240, max_rot);
  sli_max_rot.position((((width - width / 3) / 4) * 5) - width / 20, height - height / 20);
  sli_max_rot.input(() => {
    counter = 0;
    max_rot = int(sli_max_rot.value());
  });
  sli_max_rot.style('width', sli_width);
  setSliderStyle(sli_max_rot);
}


function updateDimensions() {
  x_dim = int(sli_x_dim.value());
  y_dim = int(sli_y_dim.value());
  generateRandomValues();
}

function drawArtwork(t) {
  let off_x = -((x_dim * (unit_size + spacing)) / 2);
  let off_y = -((y_dim * (unit_size + spacing)) / 2);
  let off_z = -((z_dim * (unit_size + spacing)) / 2);

  noFill();
  stroke(255);
  strokeWeight(the_stroke);

  for (let x = 0; x < x_dim; x++) {
    for (let y = 0; y < y_dim; y++) {
      for (let z = 0; z < z_dim; z++) {
        let cen_x = off_x + x * (unit_size + spacing) + unit_size / 2;
        let cen_y = off_y + y * (unit_size + spacing) + unit_size / 2;
        let cen_z = off_z + z * (unit_size + spacing) + unit_size / 2;

        let rot_x = lerp(0, ini_rot[y][x].x * (y / (y_dim - 1)), t);
        let rot_y = lerp(0, ini_rot[y][x].y * (y / (y_dim - 1)), t);
        let rot_z = lerp(0, ini_rot[y][x].z * (y / (y_dim - 1)), t);

        let disp_x = lerp(
          0,
          ini_disp[y][x].x * (y / (y_dim - 1)),
          t
        );
        let disp_y = lerp(
          0,
          ini_disp[y][x].y * (y / (y_dim - 1)),
          t
        );
        let disp_z = lerp(
          0,
          ini_disp[y][x].z * (y / (y_dim - 1)),
          t
        );

        push();
        translate(
          cen_x + disp_x,
          cen_y + disp_y,
          cen_z + disp_z
        );
        rotateX(rot_x);
        rotateY(rot_y);
        rotateZ(rot_z);
        box(unit_size);
        pop();
      }
    }
  }
}

function generateRandomValues() {
  generating_vals = true;
  ini_rot = [];
  ini_disp = [];

  for (let y = 0; y < y_dim; y++) {
    ini_rot[y] = [];
    ini_disp[y] = [];

    for (let x = 0; x < x_dim; x++) {
      ini_rot[y][x] = {
        x: random(-max_rot, max_rot),
        y: random(-max_rot, max_rot),
        z: random(-max_rot, max_rot),
      };

      ini_disp[y][x] = {
        x: random(-max_disp, max_disp),
        y: random(-max_disp, max_disp),
        z: random(-max_disp, max_disp),
      };
    }
  }
  generating_vals = false;
}

function mousePressed() {
  counter = 0;
  updateDimensions();
  draw();
}

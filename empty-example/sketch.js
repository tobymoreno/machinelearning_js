
var s;
var scl = 25;

var food;


function setup() {
  // put setup code here
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
//console.log(s.x);
    pickLocation();
    
    
}

function mousePressed() {
  s.total++;
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  // put drawing code here
    //console.log(s.x)f
    background(51);
    s.update();
    s.show();

    // show food
    fill(255,0,0);
    rect(food.x, food.y, scl, scl);

    if(s.eat(food)) {
      pickLocation();
    }

    //rect(1, 1, 10, 10);
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    s.dir(0, -1);

  } else if(keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  }
  else if(keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  }
  else if(keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}


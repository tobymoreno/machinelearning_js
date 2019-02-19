class Mover {
  constructor(limit) {
    this.position = createVector(10, height);
    this.velocity = createVector(0, -7);
    this.done = false;
    this.limit = limit;
  }

  update() {
    // console.log(ceiling);
    // ceiling = (ceiling + (movers.length-1 * size));
    if (!this.done) {
      if (this.position.y >= this.limit) {
        var d = this.position.y - this.limit
        // console.log(d)
        var speedy = map(d, 2, 150, -0.005, -3);
        this.velocity.y = speedy;
        // console.log(speedy);
        this.position.add(this.velocity);
      } else {
        //ceiling += size;
        this.done = true;
      }
    }


  }

  render() {
    stroke(0);
    // rect(this.position.x, this.position.y, size + 150, size);
    rect(this.position.x, this.position.y, size + 150, size, 7, 7, 0, 7);    
  }
}

let ceiling = 2;
let size = 75;
let movers = [];

function setup() {
  let canvas = createCanvas(400, window.innerHeight);
}

function draw() {
  background(150);
  movers.forEach((m) => {
    m.update();
    m.render();
  })
}

function mouseReleased() {
  // ceiling += size;
  var limit = (ceiling + (movers.length * size));
  console.log(limit);
  let m = new Mover(limit);
  movers.push(m);

}
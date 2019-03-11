
let data = [];
let m = 1;
let b = 0;


function setup() {
    createCanvas(400, 400);
    background(0);
}

function gradientDescent() {
    let learning_rate = 0.01

    for(let i=0;i<data.length;i++) {
        var x = data[i].x;
        var y = data[i].y;

        let guess = m * x + b;

        let error = y - guess;

        m = m + (error * x) * learning_rate;
        b = b + error * learning_rate;

    }
}

function drawLine() {
    // y = mx + b
    var x1 = 0;
    var y1 = m * x1 + b;

    var x2 = 1;
    var y2 = m * x2 + b;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, 0, height);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, 0, height);

    stroke(255);
    strokeWeight(2);

    line(x1, y1, x2, y2);

}


function draw() {
    background(51)
    data.forEach((point) => {
        var x = map(point.x, 0, 1, 0, width);
        var y = map(point.y, 0, 1, 0, height)
        ellipse(x, y, 10, 10);
    })

    if(data.length > 1) {
        gradientDescent();
        drawLine();
    }

}

function mousePressed() {
    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 0, 1)
    var point = createVector(x, y);
    data.push(point);
}
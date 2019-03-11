 new p5();

class Point {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.label = 1;

        if(this.x > this.y) {
            this.label = -1;
        }


    }

    show() {
        noFill();
        if(this.label == 1) {
            stroke(255, 0, 0);
            //fill(255, 0, 0);
        }
        else {
            stroke(0, 0, 255);
            //fill(0, 0, 255);
        }
        ellipse(this.x, this.y, 8, 8);
    }
}

class Perceptron {
    constructor() {
        this.size = 2;
        this.weights = [];
        for(let i=0;i<this.size;i++) {
            this.weights.push(random(-1, 1));
        }
        this.lr = 0.1;
    }

    guess(inputs) {
        let sum = 0;
        for(let i=0;i<this.size;i++) {
            sum += inputs[i] * this.weights[i];
        }
        // activation function
        if(sum >= 0) {
            return 1;
        }
        else {
            return -1;
        }
    }

    train(inputs, target) {
        let guess = this.guess(inputs);
        let error = (target - guess)

        for(let i=0;i<this.weights.length;i++) {
            this.weights[i] += error * inputs[i] * this.lr;
        }
    }
}

let points = [];
let brain = new Perceptron();

function setup() {
    createCanvas(800, 500);
    for(let i=0;i<20;i++) {
        points.push(new Point());
        // console.log(p.guess(points[i]));
        // console.log(p.guess([random(-1, 1), random(-1, 1)]));
    }

    


}

function draw() {
    background(250);
    stroke(0);
    line(0, 0, width, height);

    var correctGuesses = 0;
    
    points.forEach((p) => {
        p.show();
        var guess = brain.guess([p.x, p.y]);
        if(guess == p.label) {
            noStroke();
            fill(0, 255, 0);
            correctGuesses++;
        }
        else {
            fill(255, 0, 0);
        }
        ellipse(p.x, p.y, 7, 7);
    });

    // points.forEach((p) => {
    //     brain.train([p.x, p.y], p.label);
    // });    
    textSize(18);
    noStroke();
    fill(0);
    text("weights " + brain.weights[0] + " : " + brain.weights[1] + "acc:" + (correctGuesses / points.length * 100) + "%", 10, height - 100);

    correctGuesses = 0;
}

var index = 0;

function mousePressed() {
    if(index >= points.length) index = 0;
    var point = points[index++];
    brain.train([point.x, point.y], point.label);
    console.log('ok');
}
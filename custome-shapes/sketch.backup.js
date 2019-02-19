let lbhourglass;

let nystems;

// STOP HERE .. you need to sort better


function setup() {
    createCanvas(800, 600);
    background(0);

    // lbhourglass = new LineBarHourGlass(createVector(150, 210));

    nsystems = new NetworkSystems();
}

var pnt;

function draw() {
    background(0);
    stroke(255);
    //noFill();
    // beginShape();
    //     let spacing = map(mouseX, 0, width, 5, 100);
    //     for(let a = 0; a <= 360; a+=spacing) {
    //         let x = 100 * cos(a) + 200;
    //         let y = 100 * sin(a) + 200;

    //         vertex(x, y);
    //     }
    // endShape(CLOSE);
    // fill(153);
        
    // // stroke(153);
    // // rect(31, 21, 155, 155, 7);    
    // fill(255);
    // rect(30, 35, 155, 155, 27);

    nsystems.run();

    if(s) {
        push()
        fill(255);
        textSize(32);
        text(s, 100, 300);
    }

    // lbhourglass.render();
}

var s;

function mouseReleased() {
    s = `x:${mouseX} y:${mouseY}`
    // console.log('mm')
}

// function keyPressed() {
//     console.log('ok')
// }
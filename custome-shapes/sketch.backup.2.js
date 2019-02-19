let lbhourglass;

let nystems;

let sp;

let button;

let xc;


// STOP HERE .. you need to sort better






// console.log(uuidv4())

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(150);

    xc = new XController();

    sp = new ScreenCenterPoint();


    // lbhourglass = new LineBarHourGlass(createVector(150, 210));


    button = new Button(createVector(100, 100), createVector(150, 50), "I Agree");
    button.onclick = function (evt) {
        // console.log(evt);
        CreateDialogBox();
    };
    xc.add(button);

    xc.add(new BoxWindow(createVector(250, 250), createVector(100, 100)));

    xc.add(new CancelBox(createVector(100, 250), createVector(55, 55)));

    xc.add(new CheckBox(createVector(150, 250), createVector(55, 55)));
    // CreateDialogBox();

    var textbox = new SearchTextBox(createVector(255, 5), createVector(720, 50));
    textbox.onclick = function(evt) {
        console.log(evt);
    }
    textbox.onkeypressed = function(value) {
        console.log(value);
    }
    xc.add(textbox);


}

function CreateDialogBox() {
    // nsystems = new NetworkSystems();
    var okc = new OkCancelControl(createVector(100, height * .75), createVector(350, 55), "Exit Application? dfa sf df sdfsdf");
    okc.onclick = function (evt) {
        console.log(evt);
        setTimeout(function () {
            console.log(evt.source);
            xc.remove(evt.source);
        }, 50);
    };
    // okc.setShowLocationPointer(false);
    xc.controls.push(okc);
}

var pnt;

function draw() {
    push()
        background(25);
        strokeWeight(.25);
        stroke(220);

        var h = 63;

        line(0, h, window.innerWidth, h);
        pop()
    // nsystems.run();


    if (s) {
        push()
        fill(255);
        textSize(32);
        text(s, 10, 450);
        pop();
    }

    // lbhourglass.render();
    sp.render();

    xc.controls.forEach(function (c) {
        c.render();
    })

}

var s;

function mouseReleased() {
    s = `x:${mouseX} y:${mouseY}`
    // console.log('mm')

    xc.controls.forEach(function (c) {
        // console.log(c);
        c.mouseReleased();
    })


}

function mouseMoved() {
    s = `x:${mouseX} y:${mouseY}`

    document.body.style.cursor = "default";

    xc.controls.forEach(function (c) {
        c.mouseMoved();
    })

}

function mousePressed() {
    xc.controls.forEach(function (c) {
        c.mousePressed();
    })
}

function keyPressed() {
    console.log('ok')
    // if (okc == undefined) {
    //     CreateDialogBox();
    // }
    xc.controls.forEach(function (c) {
        if(c.keyPressed) {
            c.keyPressed();
        }
    })    

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}
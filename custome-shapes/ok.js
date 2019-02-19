class Ok {
    constructor(position, size) {
        this.position = position;
        this.size = size;
        this.hovering = false;
        this.pressedMouse = false;
        this.onclick;

    }

    render() {
        push();
        strokeCap(SQUARE);
        angleMode(DEGREES);
        translate(this.position.x, this.position.y);
        ellipseMode(CENTER);
        noFill();
        strokeWeight(1);
        stroke(255);
        if(this.hovering) {
            fill(150);
        }
        ellipse(0, 0, this.size, this.size);

        if(this.pressedMouse) {
            stroke(0);
        }

        strokeWeight(4);
        var angle = 360 - 55;
        var r1 = this.size * .55;
        var r2 = this.size * 0.30;
        var x = r1 * cos(angle);
        var y = r1 * sin(angle);
        // // console.log(x,y);


        translate(-3, this.size * .25);
        line(0, 1, x, y);

        angle = 220;

        x = r2 * cos(angle);
        y = r2 * sin(angle);
        // console.log(x,y);
        line(2, 1, x, y);

        stroke(0, 255, 0);
        strokeWeight(5);
        // point(0, 0)
        pop();
    }

    mouseMoved() {
        var d = dist(mouseX, mouseY, this.position.x, this.position.y);
        if(d <= this.size) {
            this.hovering = true;
        }
        else {
            this.hovering = false;
        }
    }

    mousePressed() {
        var d = dist(mouseX, mouseY, this.position.x, this.position.y);
        console.log(d);
        if(d <= this.size) {
            this.pressedMouse = true;
            this.onclick(this);
        }
        else {
            this.pressedMouse = false;
        }  
        console.log("pm: = " + this.pressedMouse)      
    }

    mouseReleased() {
        this.pressedMouse = false;
    }
}

class X {
    constructor() {
        
    }
}
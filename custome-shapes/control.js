class LineBar {
    constructor(position, line_width, limit) {
        this.position = position;
        this.size = 1;
        this.width = 1;
        if (line_width) {
            this.line_width = line_width;
        }
        this.onFinish;
        this.limit = 2;
        if (limit) this.limit = limit;
    }

    setPosition(position) {
        this.position = position;
    }

    setLimit(limit) {
        this.limit = limit;
    }

    update() {
        if (this.size != 0) {
            if (this.size <= this.limit) {
                this.size = this.size + (this.size * .5);
                if (frameCount % 60 == 0) {
                    // console.log(this.size);
                }
                if (this.size <= 0) {
                    this.size = parseInt(random(1, this.limit));
                }

            } else {
                this.size = this.size * -1;
            }
        }


    }


    render() {
        push();
        translate(this.position.x, this.position.y);
        // let's make it black and white
        //stroke(130, 255, 0);
        // color based on size
        var c = map(this.size, 1, this.limit, 100, 250)
        // console.log(c);
        stroke(c);
        strokeWeight(this.line_width)
        strokeCap(ROUND);

        line(0, 0 - (this.size / 2), 0, 0 + (this.size / 2));
        pop();
    }
}

class LineBarController {
    constructor(position, line_width, limit) {
        this.lineBars = [];
        this.position = position;
        this.line_width = line_width;
        this.limit = limit;
    }

    generateLinebars(size) {
        this.size = size;
        for (let i = 0; i < size; i++) {
            var np = this.position;
            var space = this.line_width * 1.5;
            np = p5.Vector.add(np, createVector(i * space, 0))
            // console.log(np);
            var lb = new LineBar(np, this.line_width, this.limit);
            lb.size = random(1, this.limit + 1);
            this.lineBars.push(lb);
        }

    }

    update() {
        // manipulate the odds here



        if (frameCount % 5 + (parseInt(random(0, 2)) * 10) == 0) {
            // switch limits
            // get the first 30 percent 
            var range = parseInt(this.lineBars.length * .3);
            for (let i = 0; i < range; i++) {
                this.lineBars[i].setLimit(parseInt(this.limit * .2))
            }

            range = parseInt(this.lineBars.length * .6);
            for (let i = range + 1; i < this.lineBars.length; i++) {
                this.lineBars[i].setLimit(parseInt(this.limit * .2))
            }
        }

        if (frameCount % 2 == 0) {
            var middle = parseInt(this.lineBars.length / 2) + 1;
            this.lineBars[middle].setLimit(parseInt(this.limit))
        }

        for (let i = 0; i < this.size; i++) {
            var lb = this.lineBars[i];
            lb.update();
        }



    }

    render() {
        this.lineBars.forEach((lb) => {
            lb.render();
        });
    }
}

class LineBarHourGlass {
    constructor(position) {
        this.lbs;
        this.lbs2;
        this.lbs3;
        this.position = position;

        this.lbs = new LineBarController(createVector(position.x, position.y), 10, 85);
        this.lbs.generateLinebars(17);

        this.lbs2 = new LineBarController(createVector(position.x + 255, position.y), 10, 40);
        this.lbs2.generateLinebars(5);

        this.lbs3 = new LineBarController(createVector(position.x - 75, position.y), 10, 40);
        this.lbs3.generateLinebars(5);
    }

    render() {

        if (frameCount % 10 == 0)
            this.lbs.update();

        var delay = 10 + (parseInt(random(0, 2)) * 2);


        delay = 10 + (parseInt(random(0, 2)) * 5);

        if (frameCount % 10 == 0) this.lbs2.update();

        delay = 10 + (parseInt(random(0, 2)) * 5);

        if (frameCount % delay == 0) this.lbs3.update();

        this.lbs.render();
        this.lbs2.render();
        this.lbs3.render();
    }
}

class XController {
    constructor() {
        this.controls = [];
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }    

    add(control) {
        // get guid
        var guid = this.uuidv4();
        control.guid = guid;
        this.controls.push(control);
    }

    findIndex(control) {
        return this.controls.findIndex(c => c.guid == control.guid && c.constructor.name == control.constructor.name);
    }

    remove(control) {
        return this.controls.splice(this.findIndex(control), 1);
    }
}

class XControl {
    constructor(position, size) {
        this.position = position;
        this.size = size;
        this.hovering = false;
        this.pressedMouse = false;
        this.onclick;
        this.showLocationPointer = true;
        this.networkController = new NetworkController(this.position, 4, 65, 71);
        this.networkController.createNew(`${this.constructor.name}`);
        this.networkController.createNew(`x=${this.position.x}:y=${this.position.y}`);
        this.showLocationPointer = true;
        this.display = true;
        this.xController = new XController();
    }

    show(display) {
        this.display = display;
    }

    render() {
        if (this.display) {
            if (this.showLocationPointer) {
                stroke(100, 200, 0);
                strokeWeight(5);
                point(0, 0)
                this.networkController.render();

            }
        }


        // push();

        // translate(this.position.x, this.position.y);

        // noFill();
        // // point(0, 0)
        // pop();
    }

    mouseMoved() {
        var d = dist(mouseX, mouseY, this.position.x, this.position.y);

        if (d <= this.size.y / 2) {
            this.hovering = true;
            document.body.style.cursor = "pointer";
        } else {
            this.hovering = false;
            document.body.style.cursor = "cursor";
        }    
    }

    mousePressed() {
        var d = dist(mouseX, mouseY, this.position.x, this.position.y);

        if (d <= this.size.y / 2) {
            this.pressedMouse = true;
            // console.log("mx=" + mouseX, "my=" + mouseY, "px=" + this.position.x, "py=" + this.position.y, "d=" + d, "sz=" + this.size);
            
        } else {
            this.pressedMouse = false;
        }
    }

    mouseReleased() {
        // console.log("i got called");
        if(this.pressedMouse && this.onclick != undefined) {
            this.onclick(this);
            // console.log("clicked");
        }
            
        else {
            // console.log("on click is undefined or press moused is not pressed");
        }
        this.pressedMouse = false;
    }
}

class BoxWindow extends XControl {
    constructor(position, size) {
        super(position, size);
        this.rectMode = CENTER;
    }

    render() {
        if(this.display) {
            super.render();
            push();
                strokeCap(SQUARE);
                angleMode(DEGREES);
                translate(this.position.x, this.position.y);
                rectMode(this.rectMode);
                noFill();
                strokeWeight(1);
                stroke(150);

                if (this.hovering) {
                    fill(150);
                }
        
                rect(0, 0, this.size.x, this.size.y);     
            pop();       
        }
    }
    
}

class ScreenCenterPoint extends XControl {
    constructor() {
        super(createVector(width / 2, height / 2), 1);
    }
    render() {
        super.render();
    }
}

class CheckBox extends XControl {
    constructor(position, size) {
        super(position, size);
    }

    render() {
        if (this.display) {
            super.render();
            push();
            strokeCap(SQUARE);
            angleMode(DEGREES);
            translate(this.position.x, this.position.y);
            rectMode(CENTER);
            noFill();
            strokeWeight(1);
            stroke(255);

            if (this.hovering) {
                fill(150);
            }
            rect(0, 0, this.size.y, this.size.y, 7);

            if (this.pressedMouse) {
                stroke(0);
            }

            strokeWeight(4);
            var angle = 360 - 55;
            var r1 = this.size.y * .55;
            var r2 = this.size.y * 0.30;
            var x = r1 * cos(angle);
            var y = r1 * sin(angle);

            translate(-3, this.size.y * .25);
            line(0, 1, x, y);

            angle = 220;

            x = r2 * cos(angle);
            y = r2 * sin(angle);
            // console.log(x,y);
            line(2, 1, x, y);

            pop();
        }

    }
}

class CancelBox extends XControl {
    constructor(position, size) {
        super(position, size);
    }

    render() {
        super.render();
        push();
        strokeCap(SQUARE);
        angleMode(DEGREES);
        translate(this.position.x, this.position.y);
        rectMode(CENTER);
        noFill();
        strokeWeight(1);
        stroke(255);

        if (this.hovering) {
            fill(150);
        }

        rect(0, 0, this.size.y, this.size.y, 7);

        if (this.pressedMouse) {
            stroke(0);
        }

        strokeWeight(4);
        var angle = 360 - 43;
        var r1 = this.size.y * .75;
        var r2 = this.size.y * 0.30;
        var x = r1 * cos(angle);
        var y = r1 * sin(angle);

        translate(-15, this.size.y * .25);
        line(0, 1, x, y);

        translate(0, -1 * this.size.y * .47);

        rotate(83);
        line(0, 1, x, y);


        pop();
    }
}

class CancelBox2 extends XControl {
    constructor(position, size) {
        super(position, size);
    }

    render() {
        super.render();
        push();
        strokeCap(SQUARE);
        angleMode(DEGREES);
        translate(this.position.x, this.position.y);
        ellipseMode(CENTER);
        noFill();
        strokeWeight(1);
        stroke(255);

        if (this.hovering) {
            fill(200, 200, 200, 100);
        }

        
        ellipse(0, 0, this.size.y, this.size.y, 7);

        if (this.pressedMouse) {
            stroke(0);
        }

        strokeWeight(4);
        stroke(150);
        var angle = 360 - 40;
        var r1 = this.size.y * .70;
        // var r2 = this.size.y * 0.30;

        var x = r1 * cos(angle);
        var y = r1 * sin(angle);

        // translate(-this.size.y, 0);
        translate(-this.size.y * .25, this.size.y * .25);
        line(0, 0, x, y);

//        translate(0, -1 * this.size.y * .50);
       translate(0, -1 * this.size.y * .45);

        rotate(77);
        line(0, 0, x, y);


        pop();
    }
}

class TextBox extends XControl {
    constructor(position, size) {
        super(position, size);

        this.input = createInput();
        this.input.position(position.x + (size.x * .05), position.y + (size.y * .10));
        this.input.style("font-size", (size.y * .25) + "pt");
        this.input.style("width", size.x * .90 + "px");
        this.input.style("border", "none")
        this.input.style("outline", "none");
        this.input.style("background-color", "rgb(220,220,220)");
        this.input.style("color", "rgb(100,100,100)");

        // this.input.keyPressed(function() {
        //     console.log('ok');
        // })

        function keyPressed() {

        }

    }

    pressKey() {
        console.log('ok');
    }

    render() {
        super.render();
        push();
        translate(this.position.x, this.position.y);
        noStroke();
        fill(220, 220, 220);            
        rect(0, 0, this.size.x, this.size.y, 5);


        pop();
    }
}

class SearchIcon extends XControl {
    constructor(position, size) {
        super(position, size);
        this.outline = false;
    }

    render() {
        super.render();
        push();
        strokeCap(SQUARE);
        angleMode(DEGREES);
        translate(this.position.x, this.position.y);
        ellipseMode(CENTER);
        noFill();
        strokeWeight(1);

        stroke(255);


        if (this.hovering) {
            stroke(0);
        }
        else {
            stroke(150);       
        }

        if(this.outline)
            ellipse(0, 0, this.size.y, this.size.y);

        if (this.pressedMouse) {
            stroke(100, 100, 100, 100);
        }

        
        strokeWeight(2.5);
        translate(-this.size.x * .10, -this.size.y * .10);
        ellipse(0, 2, this.size.y * .40, this.size.y * .40);
        translate(this.size.x * .18, this.size.y * .23);
        line(0, 0, this.size.y * .15, this.size.y * .15);


        // var angle = 360 - 43;
        // var r1 = this.size.y * .75;
        // var r2 = this.size.y * 0.30;
        // var x = r1 * cos(angle);
        // var y = r1 * sin(angle);

        // translate(-15, this.size.y * .25);
        // line(0, 1, x, y);

        // translate(0, -1 * this.size.y * .47);

        // rotate(83);
        // line(0, 1, x, y);


        pop();
    }
}

class SearchTextBox extends TextBox {
    constructor(position, size) {
        super(position, size);
        this.input.position(position.x + 32 + 10, position.y + (size.y * .25));
        this.input.style("width", size.x - ((size.x * 0.10)) + "px");

        this.showLocationPointer = false;

        var obj = this;
        // this.searchIcon = 
        // this.searchIcon.outline = true;
        var searchIcon = new SearchIcon(createVector(position.x + (size.y / 2), position.y + (size.y / 2)), createVector(32, 32));
        searchIcon.onclick = function (evt) {
            obj.onclick(obj.input.value());
        };

        this.xController.add(searchIcon);

        this.xController.add(new CancelBox2(createVector(position.x + size.x - (size.y / 3), position.y + (size.y / 2)), createVector(150, 20)));

        if(!this.showLocationPointer) {
            this.xController.controls.forEach((c) => {
                c.showLocationPointer = false;
            })
        }


    }

    render() {
        super.render();
        this.xController.controls.forEach(function (c) {
            c.render();
        })
        // push();
        // translate(this.position.x, this.position.y);
        // noStroke();
        // fill(255);            
        // rect(0, 0, this.size.x, this.size.y, 10);


        // pop();
    }

    mouseReleased() {
        this.xController.controls.forEach(function (c) {
            c.mouseReleased();
        })
    }

    mouseMoved() {
        this.xController.controls.forEach(function (c) {
            c.mouseMoved();

        })

    }

    mousePressed() {
        this.xController.controls.forEach(function (c) {
            c.mousePressed();
        })
    }    

    keyPressed() {
        if(keyCode == 13) {
            // console.log(this.input.value());
            if(this.onkeypressed) {
                
                this.onkeypressed(this.input.value());             
            }
        }
    }
}

class Label extends XControl {
    constructor(position, size, labelText) {
        super(position, size);
        this.labelText = labelText;
        this.textWidth = 0;
        textSize(this.size);
        var s = this.labelText;
        this.textWidth = textWidth(s);
        // console.log(this.textWidth);
    }

    render() {
        if(this.display) {
            super.render();
            push();
            translate(this.position.x, this.position.y);
            fill(255);
            noStroke();
            textSize(this.size);

            if (this.pressedMouse) {
                fill(0);
            }    

            var s = this.labelText;
            text(this.labelText, 0, this.size * .35);
            this.textWidth = textWidth(s);
            // c
            pop();
        }

    }
}

class OkCancelControl extends XControl {
    constructor(position, size, strText) {
        super(position, size.y);
        this.controls = [];

        // var boxsize = size.y;

        var labelSize = 30;

        var textBox = new Label(position, labelSize, strText);

        var txtWidth = textBox.textWidth;
        // find the size of text

        // console.log(txtWidth)

        var okc = new CheckBox(createVector(position.x + txtWidth + (size.y / 2) + 15, position.y), size);
        var cancelBox = new CancelBox(createVector(position.x + txtWidth + (size.y / 2) + size.y + 25, position.y), size);

        this.controls.push(textBox);
        this.controls.push(okc);
        this.controls.push(cancelBox);

        var obj = this;

        this.controls.forEach(function (c) {
            c.onclick = function (evt) {
                obj.onclick({
                    source : obj,
                    control : evt
                });
            }
        })

    }

    setShowLocationPointer(show) {
        this.showLocationPointer = show;
        this.controls.forEach(function (c) {
            c.showLocationPointer = show;
        })
    }

    render() {
        super.render();
        this.controls.forEach(function (c) {
            c.render();
        })
        push();
        pop();
    }

    mouseReleased() {
        this.controls.forEach(function (c) {
            c.mouseReleased();
        })
    }

    mouseMoved() {
        this.controls.forEach(function (c) {
            c.mouseMoved();

        })

    }

    mousePressed() {
        this.controls.forEach(function (c) {
            c.mousePressed();
        })
    }

}



class Button extends XControl {
    constructor(position, size, strText) {
        super(position, size);
        

        var labelSize = size.y * .65;
        this.showLocationPointer = false;

        this.labelText = new Label(createVector(position.x + (size.x / 2), position.y + (size.y / 2)), labelSize, strText);
        this.labelText.showLocationPointer = false;
        // console.log(this.labelText.textWidth);

        this.labelText.position.x -= (this.labelText.textWidth / 2)
        
        this.boxes = [];

        // find out which one is bigger x, or y
        var length = 0;
        // note if it's not even but fix later
        var remainder = 0;
        var base = 0;

        if(size.x > size.y) {
            length = size.x / size.y;
            remainder = size.x % size.y;
            base = size.y;
        }
        else {
            length = size.y / size.x;
            remainder = size.y % size.x;
            base = size.x;
        }

        var obj = this;


        for(let i=0;i<length;i++) {
            var center = ((i + 1) * base) / 2;
            
            var box = new BoxWindow(createVector(this.position.x + ((i) * base) + (base / 2), this.position.y + (base / 2)), createVector(base, base))
            box.rectMode = CENTER;
            box.show(false);
            this.boxes.push(box);
            box.onclick = function (evt) {
                // console.log('what?')
                obj.onclick(obj);
            }            
        }     
        
    }

    render() {
        super.render();
        push();
        strokeCap(SQUARE);
        angleMode(DEGREES);
        translate(this.position.x, this.position.y);
        rectMode(CORNER);

        noFill();
        strokeWeight(1);
        stroke(255);
        if (this.hovering) {
            fill(150);
        }

        rect(0, 0, this.size.x, this.size.y, 10);

        if (this.pressedMouse) {
            stroke(0);
        }

        pop();

        this.boxes.forEach(function(box) {
            box.render();
        })

        this.labelText.render();
    }

    mouseReleased() {
        // console.log('box mouse released');
        this.boxes.forEach(function (c) {
            c.mouseReleased();
        })
        this.labelText.pressedMouse = false;        

    }

    mouseMoved() {
        // super.mouseMoved();
        // console.log('mousem')
        this.boxes.forEach(function (c) {
            c.mouseMoved();
        })

        // check if one is hovering
        var hovering = false;
        for(let i=0;i<this.boxes.length;i++) {
            var box = this.boxes[i];
            if(box.hovering) {
                hovering = true;
                break;
            }
        }

        this.hovering = hovering;

        if(this.hovering) {
            document.body.style.cursor = "pointer";
            // console.log('hovering')
            
        }
        else {
            // console.log('called')
            document.body.style.cursor = "default"; void 0;
        }


        
        //hmm why is filter not working...

    }

    mousePressed() {
        this.boxes.forEach(function (c) {
            c.mousePressed();
        })
        
        if(this.hovering) {
            this.labelText.pressedMouse = true;
        }

        document.body.style.cursor = "cursor";
    }

}


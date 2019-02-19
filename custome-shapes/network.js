class Network {
    constructor(id, position, angle, radius) {
        this.id = id;
        this.position = position;
        this.angle = angle;
        this.radius = radius;


        // console.log("x=" + this.position.x, "y=" + this.position.y, "a=" + this.angle, "r=" + this.radius)

        var x = this.radius * cos(this.angle);
        var y = this.radius * sin(this.angle);

        // console.log("x: " + x, " y: " + y);

        var tx = (this.position.x + x);
        var ty = (this.position.y + y);

        // console.log("TX: " + tx);
        this.tx = this.position.x + (this.radius * Math.cos(this.angle));
        this.ty = this.position.y + this.radius * Math.sin(this.angle);

        // console.log("ix: " + this.tx, "iy: " + this.ty);

        // this.translatedPoint = createVector(tx, ty);

    }

    // translatedPoint() {
    //     //translate(this.position.x, this.position.y);
    //     console.log(this.position.x + ":" + this.radius + ":" + this.angle);
    //     var x = this.position.x + this.radius * cos(this.angle);
    //     var y = this.position.y + this.radius * sin(this.angle);
    //     console.log("t : " + x);
    //     return createVector(x, y);
    // }

    getTranslatedPoint() {
        angleMode(DEGREES);

        var x = this.radius * cos(this.angle);
        var y = this.radius * sin(this.angle);

        //console.log("x: " + x, " y: " + y);

        var tx = (this.position.x + x);
        var ty = (this.position.y + y);
        return createVector(tx, ty);
    }

    render() {
        var x, y;
        push()
            angleMode(DEGREES);

            translate(this.position.x, this.position.y);
            stroke(255);
            strokeWeight(5);

            var originx = 0;
            var originy = 0;

            point(0, 0)


            x = this.radius * cos(this.angle);
            y = this.radius * sin(this.angle);

            strokeWeight(1);
            line(originx, originy, x, y);


            strokeWeight(10);
            point(x, y)

            fill(255);
            noStroke();
            textSize(12);
            var tx = (this.position.x + x).toFixed(2);
            var ty = (this.position.y + y).toFixed(2);

            translate(x, y);

            var textx = 15 * cos(this.angle);
            var texty = 15 * sin(this.angle);

            // text("node: " + this.id, x + 15, y);
            var s = this.id; 
            
            if(this.angle >= 126 && this.angle <= 195) {
                var tw = textWidth(s);
                textx = textx - tw;
            }
            
            if(this.angle >= 160 && this.angle <= 165) {
                texty = texty + 10;
            }
            // else if(this.angle >= 140 && this.angle <= 165) {
            //     texty = texty + 10;
            // }            
            if(this.angle >= 120 && this.angle < 140) {
                texty = texty + 10;
            }


            text(s, textx, texty);
            // this.translatedPoint = createVector(tx, ty);

        pop()
    }
}

class NetworkController {

    constructor(position, sliceCount, min_radius, max_radius, parent) {
        this.position = position;
        this.nets = [];
        this.sliceCount = sliceCount;
        this.min_radius = min_radius;
        this.max_radius = max_radius;
        this.parent = parent;

        this.anglePlaceHolder = [];
        this.preferredIndexes = [];

        this.init(parent);
    }

   

    init(parent) {
        for (let i = 0; i < this.sliceCount; i++) {
            this.anglePlaceHolder.push(i);
        }

        if(parent != undefined) {
            console.log(parent.angle)
            this.preferredIndexes = this.getPreferredIndexes(parent.angle, this.sliceCount);
            console.log(this.preferredIndexes);
        }        
    }

    getPreferredIndexes(angle, sliceCount) {
        var arr = [];
        var offset = parseInt(360 / sliceCount);
    
        var minAngle = angle - 60;
        var maxAngle = angle + 60;
    
        console.log("min angle:=" + minAngle);
        console.log("max angle" + maxAngle);
    
        var minIndex = 0;
        var maxIndex = 0;
        
    
        if(minAngle < 0) {
            var tmin = 360 + minAngle;
            tmin = parseInt(tmin / offset);
    
            for(let i=tmin;i<sliceCount;i++) {
                arr.push(i);
            }
            
            minIndex = 0;
        }
        else {
            minIndex = parseInt(minAngle / offset);
        }
    
    
    
        if(maxAngle > 360) {
            var tmax = 360 - maxAngle;
    
            tmax = parseInt(tmax / offset);
    
            console.log(min, tmax);
        
            for(let i=0;i<tmax;i++) {
                arr.push(i);
            }
    
            maxIndex = sliceCount;
        }
        else {
            maxIndex = parseInt(maxAngle / offset);
            console.log("less than 360" + maxAngle)
        }
    
        
        for(let i=minIndex;i<maxIndex;i++) {
            arr.push(i);
        }        
    
    
        return arr;
    }      
  

    createNew(id) {
        var angle = 0;

        var offset = 360 / this.sliceCount;

        if (this.anglePlaceHolder.length == 0) {
            this.min_radius = this.min_radius + this.max_radius;
            this.max_radius = this.max_radius * 1.3;
            this.sliceCount = this.sliceCount * 2;
            // console.log(this.sliceCount);
            this.init();
        }
        
        //
        var rIndex = -1;
        
        if(this.preferredIndexes.length > 0) {
            rIndex = parseInt(random(0, this.preferredIndexes.length));
            console.log("getting preferred index");
            console.log(rIndex);
            if(this.parent) {
                console.log("Parent's angle is: " + this.parent.angle);
            }
            rIndex = this.preferredIndexes.splice(rIndex, 1);
            console.log(rIndex);
        }

        //
        if(rIndex == -1) rIndex = parseInt(random(0, this.anglePlaceHolder.length));

        // console.log(rIndex);

        // grab it
        var angleIndex = this.anglePlaceHolder.splice(rIndex, 1);

        // console.log(angleIndex);

        // pick between angleIndex up to 45
        var angle = parseInt(random(angleIndex * offset, (angleIndex * offset) + offset));

        // console.log(angle);

        var radius = random(this.min_radius, this.max_radius);

        var net = new Network(id, this.position, angle, radius);
        this.nets.push(net);
        return net;
    }

    render() {
        //lbhourglass.render();
        this.nets.forEach(function (net) {
            //console.log(net.angle);
            //console.log('net')
            net.render();
        })

        // i'm in charge to draw the extended point // really nice
        if (this.parent) {
            push();
            strokeWeight(1);
            var tx = this.parent.getTranslatedPoint().x;
            var ty = this.parent.getTranslatedPoint().y;

            line(this.position.x, this.position.y, tx, ty);
            pop();
        }

    }
}

class NetworkSystems {
    constructor() {
        this.networkControllers = [];

        var sliceCount = 8;
        var nc = new NetworkController(createVector(width / 2, height / 2), 4, 51, 71);
        this.networkControllers.push(nc);
    
        for(let i=0;i < 4;i++) {
            var net = nc.createNew(i);
        }
    
        var tx = nc.nets[0].getTranslatedPoint().x;
        var ty = nc.nets[0].getTranslatedPoint().y;
    
        // extend it
    
        var etx = tx + (nc.nets[0].radius * 1.5) * cos(nc.nets[0].angle);
        var ety = ty + (nc.nets[0].radius * 1.5) * sin(nc.nets[0].angle);
    
        var nc2 = new NetworkController(createVector(etx, ety), 8, 51, 71, nc.nets[0]);

        this.networkControllers.push(nc2);
    
        for(let i=0;i < 4 * 1;i++) {
            nc2.createNew(i);
        }
    
        tx = nc.nets[3].getTranslatedPoint().x;
        ty = nc.nets[3].getTranslatedPoint().y;
    
        // extend it
    
        etx = tx + (nc.nets[3].radius * 1.5) * cos(nc.nets[3].angle);
        ety = ty + (nc.nets[3].radius * 1.5) * sin(nc.nets[3].angle);    
    
        var nc3 = new NetworkController(createVector(etx, ety), 8, 51, 71, nc.nets[3]);
        this.networkControllers.push(nc3);
    
        for(let i=0;i < 4;i++) {
            nc3.createNew(i);
        }    
    
        tx = nc.nets[1].getTranslatedPoint().x;
        ty = nc.nets[1].getTranslatedPoint().y;

        // extend it
    
        etx = tx + (nc.nets[1].radius * 1.5) * cos(nc.nets[1].angle);
        ety = ty + (nc.nets[1].radius * 1.5) * sin(nc.nets[1].angle);    
    
        var nc4 = new NetworkController(createVector(etx, ety), 8, 51, 71, nc.nets[1]);
        this.networkControllers.push(nc4);
    
        for(let i=0;i < 4;i++) {
            nc4.createNew(i);
        }     
    }

    run() {
        this.networkControllers.forEach((nc) => {
            nc.render();
        })
    }
}
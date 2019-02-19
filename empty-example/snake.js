function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;

    this.total = 0;
    this.tail = [];

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function (food) {
        let d = dist(this.x, this.y, food.x, food.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.death = function() {
        for (var i=0;i<this.tail.length;i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);

            if(d < 1) {
                this.total = 0;
                this.tail = [];
                this.x = 0;
                this.y = 0;
                this.xspeed = 1;
                this.yspeed = 0;
                break;
            }
        }
    }

    this.update = function () {

        //console.log(this.tail);
        this.death();

        if(this.total === this.tail.length) {
            for(var i=0;i<this.tail.length - 1;i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }

        this.tail[this.total - 1] = createVector(this.x, this.y);
        //console.log(createVector(this.x, this.y));

        //console.log(this.tail);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);



    }

    this.show = function () {
        fill(255);
        rect(this.x, this.y, scl, scl);

        for(var i=0;i<this.tail.length;i++) {

            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
    }


}
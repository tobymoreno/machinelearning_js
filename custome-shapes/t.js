// let anglePlaceHolder = [];
// for (let i = 0; i < 8; i++) {
//     anglePlaceHolder.push(i);
// }


function t(angle, sliceCount) {
    var arr = [];
    var offset = parseInt(360 / sliceCount);

    var minAngle = angle - 90;
    var maxAngle = angle + 90;

    console.log("min angle:=" + minAngle);
    console.log("max angle" + maxAngle);

    var minIndex = 0;
    var maxIndex = 0;
    

    if(minAngle < 0) {
        tmin = 360 + minAngle;
        tmin = parseInt(tmin / offset);

        for(let i=tmin;i<sliceCount;i++) {
            arr.push(i);
        }
        
        min = 0;
    }
    else {
        minIndex = parseInt(minAngle / offset);
    }



    if(maxAngle > 360) {
        tmax = 360 - maxAngle;

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

t(0, 8)
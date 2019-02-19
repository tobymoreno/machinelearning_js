let input;

function setup() {
    let text = createP("This is an HTML string with style!");
    let canvas = createCanvas(600, 400);
  
    text.position(50, 50);
    text.style("font-family", "monospace");
    text.style("background-color", "#FF0000");
    text.style("color", "#FFFFFF");
    text.style("font-size", "18pt");
    text.style("padding", "10px");
    canvas.position(150, 150);


    input = createInput();
    input.position(165, 155);
    input.style("font-size", "22pt");
    input.style("width", "270px");
    // input.style("border", "none")
    input.style("outline", "none");

  }
  
  function draw() {
    background(220, 180, 200);
    ellipse(width/2, height/2, 100, 100);
    ellipse(width/4, height/2, 50, 50);
    noStroke();
    fill(255);
    rect(0, 0, 300, 50, 10);
  }
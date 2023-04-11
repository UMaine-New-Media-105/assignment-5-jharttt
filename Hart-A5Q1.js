let bubbles = [];
// array for bubbles
function setup() {
  createCanvas(960, 540);
   // creates the 5 bubbles with variables for array
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 40);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
}

function draw() {
  background(220);
   // displays objects in array
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].jitter();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    // constructor for each bubble variable
    this.x = x;
    this.y = y;
    this.r = r;
  }
  
  jitter() {
    // jitter function to randomize movement within 5 x and y coords
    let xOffset = random(-5, 5);
    let yOffset = random(-5, 5);
    this.x += xOffset;
    this.y += yOffset;
  }
  
  show() {
    push();
    translate(this.x, this.y);
    //color for shape and stroke
    fill(0, 50, 200);
    stroke(0, 50, 150);
    strokeWeight(2);
    // ellipse created within bubble object parameters
    ellipse(0, 0, this.r * 2);
    pop();
  }
}

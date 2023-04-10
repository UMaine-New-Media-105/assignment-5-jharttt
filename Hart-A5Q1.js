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
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  // constructor for each bubble variable
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    // random speed for x and y of bubble
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
  }
  
  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    // if statements to reverse speed when corner hit
    if (this.x > width - this.r || this.x < this.r) {
      this.xspeed = -this.xspeed;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.yspeed = -this.yspeed;
    }
  }
  
  show() {
    push();
    translate(this.x, this.y);
    // color for shape and stroke
    fill(0, 50, 200);
    stroke(0, 50, 150);
    strokeWeight(2);
    // ellipse created within bubble object parameters
    ellipse(0, 0, this.r * 2);
    pop();
  }
}

let bubbles = [];
let breeders = [];
let catchers = [];

function setup() {
  createCanvas(960, 540);
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 40);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
  for (let i = 0; i < 5; i++) {
    let x = random(0, height); // change this line
    let y = random(height);
    let breeder = new Breeder(x, y);
    breeders.push(breeder);
  }
  for (let i = 0; i < 5; i++) {
    let x = random(width/2, width);
    let y = random(height);
    let catcher = new Catcher(x, y);
    catchers.push(catcher);
  }
}

function draw() {
  background(220);
  // displays objects in array
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].jitter();
    bubbles[i].show();
  }
  
  // display breeders and check for collisions with catchers
  for (let i = 0; i < breeders.length; i++) {
    breeders[i].move();
    breeders[i].show();
    for (let j = 0; j < catchers.length; j++) {
      if (breeders[i].intersects(catchers[j])) {
        let newBreeder = new Breeder(breeders[i].x, breeders[i].y);
        breeders.splice(i, 1);
        breeders.splice(j, 1);
        breeders.push(newBreeder);
        break;
      }
    }
  }
  
  // display catchers and check for collisions with breeders
  for (let i = 0; i < catchers.length; i++) {
    catchers[i].move();
    catchers[i].show();
    for (let j = 0; j < breeders.length; j++) {
      if (catchers[i].intersects(breeders[j])) {
        breeders.splice(j, 1);
        break;
      }
    }
  }
}

class Bubble {
  // constructor for each bubble variable
  constructor(x, y, r) {
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
    // color for shape and stroke
    fill(0, 50, 200);
    stroke(0, 50, 150);
    strokeWeight(2);
    // ellipse created within bubble object parameters
    ellipse(0, 0, this.r * 2);
    pop();
  }
}

class Breeder {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.numFish = 2;
    this.speed = random(1, 3); // new property for speed
    this.direction = random(0, TWO_PI); // new property for direction
  }

  move() {
    this.x += this.speed * cos(this.direction);
    this.y += this.speed * sin(this.direction);
    if (this.x < -this.r || this.x > width + this.r) {
      this.direction = PI - this.direction;
    }
    if (this.y < -this.r || this.y > height + this.r) {
      this.direction = TWO_PI - this.direction;
    }
    if (this.x < -this.r) {
      this.x = -this.r;
    } else if (this.x > width + this.r) {
      this.x = width + this.r;
    }
    if (this.y < -this.r) {
      this.y = -this.r;
    } else if (this.y > height + this.r) {
      this.y = height + this.r;
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(255, 165, 0);
    stroke(255, 140, 0);
    strokeWeight(2);
    ellipse(0, 0, this.r * 2);
    for (let i = 0; i < this.numFish; i++) {
      let angle = i * TWO_PI / this.numFish;
      let x = this.r * cos(angle);
      let y = this.r * sin(angle);
      fill(255, 255, 255);
      noStroke();
      triangle(x, y, x - 10, y + 5, x - 10, y - 5);
    }
    pop();
  }

  intersects(catcher) {
    let d = dist(this.x, this.y, catcher.x, catcher.y);
    return (d < this.r + catcher.r);
  }
}

class Catcher {
constructor(x, y) {
this.x = x;
this.y = y;
this.r = 40; // set radius to 40 pixels
}

move() {
// move catcher to the left
this.x -= 1;
}

show() {
  push();
  translate(this.x, this.y);
  // salmon color for salmon!
  fill("salmon");
  stroke(178, 34, 34);
  strokeWeight(2);
  // draw a wide ellipse for the body of the salmon
  ellipse(0, 0, this.r * 3, this.r * 2);
  // draw the tail of the salmon
  triangle(this.r*1.5, 0, this.r*2, -this.r/2, this.r*2, this.r/2);
  pop();
}

intersects(breeder) {
// check if catcher collides with a breeder
let d = dist(this.x, this.y, breeder.x, breeder.y);
return (d < this.r + breeder.r);
  
}
}

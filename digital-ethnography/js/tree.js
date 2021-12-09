//sketch for family page
let v;
let v1;
let v3;
let fluctuation;
let leaves = [];
let stems = [];
let num_leaves = 0;
let num_vines = 3;
let isDrawing = false;
let entries;
let $;

let myFrameCount = 0;

let longestVine = 0;

function doSomething() {
//  console.log(window.scrollY);
  return;
}

function setup() {
  entries = document.getElementsByClassName("entries");

  let canvas = createCanvas(window.innerWidth, 1800);
  canvas.parent = 'sketch-container';
  //background(92, 74, 41);
  background(255, 255, 255, 0);
  frameRate(30);


  let rSeed = int(random(0, 1000));
  let nSeed = int(random(0, 1000));
  randomSeed(rSeed);
  noiseSeed(2);

  v = new Vine(width/2, 0, 20, (2*PI/3));
  v1 = new Vine(width/2, 0, 20, (PI/2));
  v3 = new Vine(width/2, 0, 20, (PI/2));

  stems = [];
  leaves = [];
}

function draw() {
  if (window.scrollY > 550 + longestVine) {
    isDrawing = true;
    myFrameCount += 1;
  }
  else{
    isDrawing = false;
  }
  for(let i = 0; i < entries.length; i++){
    let entry = entries[i];
    if(entry.getBoundingClientRect().top <= 600){
      entry.style = "opacity: 1; transform: translate(0,0)";
    }
  }

  if (!isDrawing) return;

  push();
  scale(1.25);
  //image(img2, 0, 0, 150, 95);
  pop();
  noStroke();
  fill(255);
  fill(0);
  textFont("Georgia");
  textSize(15);
  //text('Vine count: '+num_vines, 15,25);

  v.createVines();
  v1.createVines();
  v3.createVines();
}

class Vine {
  constructor(x, y, d, angle) {
    this.vines = [];
    this.x = x;
    this.y = y;
    this.diameter = d;
    this.vine_thickness = 0.5;
    this.direction = angle;
    this.fluctuation = 0;
    this.noiseOffset = random(5);
    this.vine_created_time = myFrameCount;
    this.time_since_drawn = int(random(50, 80)) * this.diameter;
  }

  createVines() {
    if (this.isOnScreen()) {
      this.growThisVine();
      this.displayVine(true, color(122, 91, 17));
      this.growChildren();
    }
    for (let i = 0; i < this.vines.length; i++) {
      this.vines[i].createVines();
    }
  }

  growThisVine() {
    this.fluctuation = map(
      noise(myFrameCount * 0.03 + this.noiseOffset),
      0,
      1,
      -PI / 2,
      PI / 2
    );
    let amp = 2;
    this.x += cos(this.fluctuation + this.direction) * amp;
    this.y += sin(this.fluctuation + this.direction) * amp;

    if (this.diameter <= 2) {
      this.vine_thickness = 0;
    } else {
      this.vine_thickness = 0.03;
    }
    this.diameter -= this.vine_thickness;
  }

  displayVine(shading, c) {

    stroke(255, 255, 255, 150);
    noFill();
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if(longestVine < this.y){
      longestVine = this.y;
    }
  }

  growChildren() {
    if (
      myFrameCount % (this.vine_created_time + 80) == 0 &&
      myFrameCount - this.vine_created_time <= 250
    ) {
      this.vines.push(
        new Vine(
          this.x,
          this.y,
          this.diameter,
          this.direction + random(-PI / 4, PI / 4)
        )
      );
      num_vines += 1;
    }
  }

  isOnScreen() {
    if (this.x > width || this.x < 0) {
      return false;
    }
    if (this.y > height || this.y < 0) {
      return false;
    }
    return true;
  }
}

$(document).on("scroll", function() {
  var pageTop = $(document).scrollTop();
  var pageBottom = pageTop + $(window).height();
  var tags = $(".entries");

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];

    if ($(tag).position().top < pageBottom) {
      $(tag).addClass("visible");
    } else {
      $(tag).removeClass("visible");
    }
  }
});

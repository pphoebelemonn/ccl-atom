let p1;
let step = 4;
let bg_col;
let img;
let alien;
let alienImg;
let keys = [false, false, false, false];
let lasers = [];

let instructionText = "";

function preload(){
  alienImg = loadImage("assets/alien.png");
}

function setup() {
  noStroke();

  let canvas = createCanvas(window.innerWidth, 400);
  canvas.parent = 'sketch-container';
  let sketchContainer = document.getElementsByClassName("sketch-container")[0];
  sketchContainer.appendChild(canvas);
  p1 = new Planet1(200,500/2, c1= color(176, 119, 250), c2= color(143, 15, 118));
  p2 = new Planet2(500-200, 400/2, c1=color(32, 154, 229), c2=color(97, 255, 235));
  alien = new Alien(500/2, 400/2, 50);

  bg_col = color(10, 9, 41);
}

function draw() {
  //canvas.style = "margin-top: 500px;";
  if(instructionText.length > 0){
    typeText(instructionText[0]);
    instructionText = instructionText.substring(1, instructionText.length-1);
  }

  background(bg_col);
    stars();
    //p1.spin_planet();
    //p2.spin_planet();
    alien.display_alien();
    for(let i = 0; i < lasers.length; i++){
      lasers[i].move_laser();
      let l = lasers[i];
      if(l.y > height || l.y < 0 || l.x > width || l.x < 0){
        lasers.splice(i,1);
      }
    }
}

function stars(){
  push();
  randomSeed(1);
  for(let i = 0; i < 100; i++){
    let x = random(width);
    let y = random(height);
    let col = lerpColor(color(255), bg_col, sin(x+y*width + frameCount*0.02));
    //stroke(col);
    fill(col);
    square(x, y, step/2);
  }
  pop();
}


class Planet1{
  constructor(x,y, c1, c2){
    this.x = x;
    this.y = y;
    this.d = 250;
    this.waterCol = c1;
    this.groundCol = c2;
    this.glow = color(146, 89, 220);
  }

  shoot_laser(x, y){
    let playerDist = sqrt(pow(alien.startX-this.x, 2) + pow(alien.startY-this.y, 2));
    if(frameCount % 10 == 0 && playerDist < this.d+100){
      let randAngle = 2*PI*noise(frameCount+10);
      let randDist = this.d/2 * noise(frameCount-10);
      let l = new Laser(this.x + cos(randAngle) * randDist, this.y + sin(randAngle) * randDist, color(255,0,0));
      lasers.push(l);
    }
  }

  spin_planet() {
      this.shoot_laser();

      let r = this.d/2;

      for(let x = this.x-r; x < this.x+r; x+=step){
        for(let y = this.y-r; y < this.y+r; y+=step){
          let n;
          let col;
          let length = sqrt(pow(x-this.x, 2) + pow(y-this.y, 2));
          let scale = 0.03;
          if(length < r)
          {
            n = noise(x * scale/10 + frameCount * 0.005, y * scale * 5 + frameCount *0.005);
            n = int(n*10)/10;
            col = lerpColor(this.groundCol, this.waterCol, n);
            if(length > r*0.83){
              col = lerpColor(this.glow, (bg_col), length/r)
            }
  //          stroke(col);
            fill(col);
            square(x,y,step);
          }
        }
      }
    }
  }


class Planet2 {
  constructor(x,y, c1, c2){
    this.x = x;
    this.y = y;
    this.d = 250;
    this.waterCol = c1;
    this.groundCol = c2;
    this.glow = color(146, 89, 220);
  }

  shoot_laser(x, y){
    let playerDist = sqrt(pow(alien.startX-this.x, 2) + pow(alien.startY-this.y, 2));
    if(frameCount % 10 == 0 && playerDist < this.d+100){
      let randAngle = 2*PI*noise(frameCount+10);
      let randDist = this.d/2 * noise(frameCount-10);
      let l = new Laser(this.x + cos(randAngle) * randDist, this.y + sin(randAngle) * randDist, color(255,0,0));
      lasers.push(l);
    }
  }

  spin_planet() {
    this.shoot_laser();

    let r = this.d/2;
    for(let x = this.x-r; x < this.x+r; x+=step){
      for(let y = this.y-r; y < this.y+r; y+=step){
        let n;
        let col;
        let length = sqrt(pow(x-this.x, 2) + pow(y-this.y, 2));
        let scale = 0.03;
        if(length < r)
        {
          let distort = noise(x * 0.1 + frameCount * 0.005, y * scale + frameCount * 0.005);
          n = noise((x+distort*20) * scale + -frameCount * 0.01, (y+distort*20) * scale + -frameCount * 0.005);
          n = int(n*5)/5;
          col = lerpColor(this.groundCol, this.waterCol, n);
          if(length > r*0.83){
            col = lerpColor(this.glow, (bg_col), length/r)
          }
  //          stroke(col);
          fill(col);
          square(x,y,step);
        }
      }
    }
  }
}


class Laser{
  constructor(x, y, c){
    this.x = x;
    this.y = y;
    this.col = c;
    this.dir = atan((this.y-alien.startY)/(this.x-alien.startX));
    if(this.x-alien.startX > 0){
      this.dir = this.dir+PI;
    }
  }

  move_laser(){
    let dX = this.x;
    let dY = this.y;
    for(let i = 5; i > 0; i--){
      fill(lerpColor(color(255,0,0,100), color(255,255,0), i/5))
      square(dX-i, dY-i, step+i);
      dY += sin(this.dir)*step;
      dX += cos(this.dir)*step;
    }
    this.y += sin(this.dir)*10;
    this.x += cos(this.dir)*10;
    if(abs(this.x - alien.startX) < 30 && abs(this.y - alien.startY) < 30){
      alien.got_hit();
      this.x = -100;
      this.y = -100;
    }
  }
}

class Alien {
  constructor(x, y, r) {
    this.startX = x;
    this.startY = y;
    this.size = r;
    this.speed = 1;
    this.tint = color(255,255,255);
  }

  got_hit(){
    print("hit!");
    this.tint = color(255,0,0);
  }

  move_alien(){
    let dir = createVector(keys[1] - keys[3], keys[0] - keys[2]);
    dir = dir.normalize();
    this.startX = int(this.startX - dir.x * this.speed*frameRate()*1);
    this.startY = int(this.startY - dir.y * this.speed*frameRate()*1);
  }

  display_alien() {
    this.move_alien();
    push();
    translate(this.startX, this.startY);
    scale(0.2+sin(frameCount/2)*0.01, 0.2);
    image(alienImg, -alienImg.width/2, -alienImg.height/2);
    pop();
  }
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    keys[0] = true;
  }
  if(keyCode == LEFT_ARROW){
    keys[1] = true;
  }
  if(keyCode == DOWN_ARROW){
    keys[2] = true;
  }
  if(keyCode == RIGHT_ARROW){
    keys[3] = true;
  }
}

function keyReleased(){
  if(keyCode == UP_ARROW){
    keys[0] = false;
  }
  if(keyCode == LEFT_ARROW){
    keys[1] = false;
  }
  if(keyCode == DOWN_ARROW){
    keys[2] = false;
  }
  if(keyCode == RIGHT_ARROW){
    keys[3] = false;
  }
}

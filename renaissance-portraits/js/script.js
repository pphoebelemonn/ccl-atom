//variables to control the noise that blends between images
let distortion=0.02;
//level of distortion
let amount = 15;

//list of images to be blended together
let portraits = [];

function preload() {
  portraits.push(loadImage('images/renaissance-portrait2.jpeg'));
  portraits.push(loadImage('images/renaissance-portrait.jpeg'));
  portraits[0].loadPixels();
  portraits[1].loadPixels();
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent = 'sketch-container';
  img = createImage(600, 600);
  img.loadPixels();
  for (let i = 0; i< img.pixels.length; i+=4) {
    let x = i/4 % img.width;
    let y = int(i/4/img.width);

    //generate random value
    let noiseVal = noise(x*distortion, y*distortion);
    //distort in all directions
    let imgDistort = map(noiseVal, 0, 1, -1, 1) * amount;
    x += imgDistort;
    y += imgDistort;
      //create an array of colors by sampling each image at point (x,y)

    let c1 = getPixelFromPortrait(portraits[0], x, y);
    let c2 = getPixelFromPortrait(portraits[1], x, y);
    let c = lerpColor(c1, c2, imgDistort);
    img.pixels[i] = red(c);
    img.pixels[i+1] = green(c);
    img.pixels[i+2] = blue(c);
    img.pixels[i+3] = 255;
  }
  img.updatePixels();
  image(img, 0, 0);
}

//this converts the x,y point on the canvas into the corresponding point on the image and returns the color of the image at that point
//specifically, images have different dimensions to the canvas, so this makes sure that the image will be scaled to fix perfectly in the canvas.
function getPixelFromPortrait(p, x, y){
  let newX = int(map(x, 0, width, 0, p.width));
  let newY = int(map(y, 0, height, 0, p.height));
  let idx = int((newX + newY * p.width)*4);
  return color(p.get(newX, newY))
  //return color(p.pixels[idx], p.pixels[idx+1], p.pixels[idx+2]);
}

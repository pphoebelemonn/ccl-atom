let cam;
let seed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO);
  cam.hide(); // html
  seed = int(random(100));
  //60.40144181174627
  //41, 71, 96
  seed = 96
  print(seed);
  setInterval(nextSlide, 20000);
}
function draw() {
  randomSeed(seed);
  for(let x = 0; x < width; x+=200){
    for(let y = 0; y < height; y+=200){
      push();
      let scale = random(3,5);
      translate(x+random(-50, 50), y+random(-50, 50));
      image(cam,0,0,cam.width/scale, cam.height/scale);
      pop();
    }
  }
}

//for slideshow on beginnings page
var slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
  var slides = document.getElementsByClassName("slide");
  showSlides(slideIndex += 1);
  print("hello")
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
      slideIndex = 1;
    }
  if (n < 1) {
      slideIndex = slides.length;
    }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "flex";
}

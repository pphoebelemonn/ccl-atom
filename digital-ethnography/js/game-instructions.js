//for instructions on culture page
var slideIndex = 1;
showSlides(slideIndex);

function nextSlide(n) {
  var slides = document.getElementsByClassName("slide");
  showSlides(slideIndex += n);
}

function typeText(c){
    var slide = document.getElementsByClassName("slide")[slideIndex-1];
    var p = slide.getElementsByClassName("instructions")[0];
    p.innerText += c;
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  //var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
      slideIndex = 1;
    }
  if (n < 1) {
      slideIndex = slides.length;
    }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  // for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex-1].style.display = "flex";
  var slide = document.getElementsByClassName("slide")[slideIndex-1];
  var p = slide.getElementsByClassName("instructions")[0];
  instructionText = p.innerText;
  console.log(p.innerText);
  p.innerText = "";
}


let text = ["WELCOME, PLAYER. YOU HAVE BEEN\nTRANSPORTED INTO A GALAXY FAR\nFAR AWAY. NO LONGER ARE YOU HUMAN, BUT A TINY GREEN ALIEN...",
"YOU HAVE BEEN WANDERING IN SPACE FOR A\nFEW DAYS NOW, BUT YOU ARE READY TO LOOK FOR A NEW HOME...",
"FORTUNATELY, YOU COME ACROSS A FEW\nPLANETS. YOUR JOB IS TO FIND YOU WAY HOME. YOU MAY USE ALL 4 ARROW\nKEYS TO MOVE AROUND.",
"GOOD LUCK!"]

let i = 0;
let box;

setInterval(scrollText, 100);
function nextInstruction(){
  if(i < text.length){
    i += 1;
    box = document.getElementById("instructionBox")
    box.innerHTML = "";
  }
}

function scrollText(){
  box = document.getElementById("instructionBox")
  if(box.innerHTML.length<text[i].length){
    box.innerHTML += text[i][box.innerHTML.length];
  }
}

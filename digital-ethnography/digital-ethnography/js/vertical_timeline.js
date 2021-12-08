function openBox(boxId, closeId) {
  let box = document.getElementById(boxId);
  let btn = document.getElementById(closeId);
  box.style.display ='block';
  btn.style.display = 'block';
}


function closeBox(boxId, closeId) {
  let box = document.getElementById(boxId);
  let btn = document.getElementById(closeId);
  box.style.display ='none';
  btn.style.display = 'none'; 
}

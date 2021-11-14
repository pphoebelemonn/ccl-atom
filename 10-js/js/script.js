function change() {
  let b = document.getElementById('box');
  console.log(b);
  b.innerHTML = 'hello';
  b.style.left = '150px';
  b.style.backgroundColor = 'pink';
}

function addDiv() {
  //create html element
  let new = document.createElement('div');
  new.style.backgroundColor = 'gray';
  new.style.width = '50px';
  new.style.height = '50px';
  new.style.margin = '30px';
  document.getElementById('box').appendChild(new);
}

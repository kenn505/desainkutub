const zoomImg = document.getElementById('zoom');
const close = document.getElementById('close');
const container = document.getElementById('container');
let count = [1, 1, 1, //3 
             1, 1, 1, //6
             1, 1, 1, //9
             8, 6, 6, //12
             1, 1, 1, //15
             5, 8, 4, //18
             1, 1, 1, //21
             5, 4, 6, //24
             1, 1, 1, //27
             7, 1, 6] //30
let zoom = false
count.forEach(() => {
 container.innerHTML += `<div class="img"></div>`
})
const img = document.querySelectorAll('.img');
img.forEach((item, i) => {
 item.id = `img${i + 1}`;
 const img = document.createElement('img');
 img.src = `photos/${i + 1}-1.jpg`;
 item.appendChild(img);
 const hammer = new Hammer(document.getElementById(`img${i + 1}`));
 hammer.on('tap', (e) => {
  close.innerHTML = '';
  zoom = !zoom
  if(zoom){
   zoomImg.classList.add('active');
   loadImages(i)
  }
  else{
   zoomImg.classList.remove('active');
  }
 })
})
function downloadFile(url, filename) {
 const link = document.createElement('a');
 link.href = url;
 link.download = filename;
 link.click();
}
const closeZoom = new Hammer(zoomImg);
closeZoom.on('doubletap', (e) => {
 zoom = !zoom
 if(!zoom){
  zoomImg.classList.remove('active');
 }
})
const loadImages = (id) => {
 for(let i = 0; i < count[id]; i++){
  const img = document.createElement('img');
  img.id = `img${id + 1}-${i+1}`
  img.src = `photos/${id + 1}-${i + 1}.jpg`;
  close.appendChild(img);
  var manager = new Hammer.Manager(img);
 var Press = new Hammer.Press({
   time: 1000
 });

  manager.add(Press);
  manager.on('press', () => {
   downloadFile(`photos/${id+1}-${i+1}.jpg`, `${id+1}-${i+1}.jpg`)
   img.classList.add('kelip')
   setTimeout(() => {
    img.classList.remove('kelip')
   }, 500)
 })
}
}
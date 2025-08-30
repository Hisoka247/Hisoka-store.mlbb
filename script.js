const grid = document.getElementById("collageGrid");
const collageUpload = document.getElementById("collageUpload");

collageUpload.addEventListener("change", e => {
  let files = Array.from(e.target.files);
  let count = files.length;

  let bestSize = findClosestSquare(count);

  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${bestSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${bestSize}, 1fr)`;

  for (let i = 0; i < bestSize * bestSize; i++) {
    let cell = document.createElement("div");
    if (i < count) {
      let reader = new FileReader();
      reader.onload = evt => {
        let img = document.createElement("img");
        img.src = evt.target.result;
        cell.appendChild(img);
      };
      reader.readAsDataURL(files[i]);
    }
    grid.appendChild(cell);
  }
});

function findClosestSquare(num) {
  let bestSize = 5;
  let bestDiff = Infinity;
  for (let n = 5; n <= 20; n++) {
    let diff = Math.abs(n*n - num);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestSize = n;
    }
  }
  return bestSize;
}

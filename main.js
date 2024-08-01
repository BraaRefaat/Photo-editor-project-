let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let Blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let download = document.getElementById("download");
let reset = document.getElementById("reset");
let upload = document.getElementById("upload");
let img = document.getElementById("img");
let imgBox = document.getElementById("img-box");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resetValue() {
  img.style.filter = 'none';
  saturate.value = '100';
  contrast.value = '100';
  brightness.value = '100';
  sepia.value = '0';
  grayscale.value = '0';
  Blur.value = '0';
  hueRotate.value = '0';
}

window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = () => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
    img.style.display = "block";  // Ensure the image is visible
  };
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
  filter.addEventListener("input", () => {
    img.style.filter = `
      saturate(${saturate.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      sepia(${sepia.value}%)
      grayscale(${grayscale.value})
      blur(${Blur.value}px)
      hue-rotate(${hueRotate.value}deg)
    `;
    applyFilters();
  });
});

function applyFilters() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${Blur.value}px)
    hue-rotate(${hueRotate.value}deg)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function downloadImage() {
  applyFilters();
  let link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
}

download.addEventListener('click', downloadImage);

reset.addEventListener('click', resetValue);

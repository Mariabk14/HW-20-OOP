const refs = {
    gallery: document.querySelector(".gallery"),
images: document.querySelectorAll(".image"),
  input: document.querySelector("#controls input"),
  renderBtn: document.querySelector('[data-action="render"]'),
  destroyBtn: document.querySelector('[data-action="destroy"]'),
  boxes: document.querySelector("#boxes"),
};

let currentIndex = 0;

const fullContainer = document.createElement("div");
fullContainer.classList.add("full-image-container");

const fullImage = document.createElement("img");
fullImage.classList.add("full-image");

fullContainer.appendChild(fullImage);
document.body.appendChild(fullContainer);


function openImage(index) {
  currentIndex = index;
  fullImage.src = images[currentIndex].src;
  fullContainer.style.display = "block";
}


function closeImage() {
  fullContainer.style.display = "none";
}

images.forEach((img, index) => {
  img.addEventListener("click", () => openImage(index));
});

document.addEventListener("keydown", (e) => {
  // Якщо модалка закрита — просто скролимо галерею
  if (fullContainer.style.display !== "block") {
    if (e.key === "ArrowRight") {
      gallery.scrollLeft += 320;
    }
    if (e.key === "ArrowLeft") {
      gallery.scrollLeft -= 320;
    }
    return;
  }

  if (e.key === "Escape") {
    closeImage();
  }

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    openImage(currentIndex);
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openImage(currentIndex);
  }
});

fullContainer.addEventListener("click", closeImage);



// part 2
function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createBoxes(amount) {
  let size = 30;

  const elements = [];

  for (let i = 0; i < amount; i++) {
    const div = document.createElement("div");

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundColor = getRandomRgbColor();
    div.style.margin = "5px";

    elements.push(div);

    size += 10;
  }

  boxes.append(...elements);
}

function destroyBoxes() {
  boxes.innerHTML = "";
}

renderBtn.addEventListener("click", () => {
  const amount = Number(input.value);
  if (amount > 0) {
    createBoxes(amount);
  }
});

destroyBtn.addEventListener("click", () => {
  destroyBoxes();
});

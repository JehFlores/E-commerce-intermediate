// Menú mobile +++++++
let $navList = document.getElementById("nav-list");
let $navMenu = document.getElementById("menu-icon");
let $navMenuClosed = document.getElementById("close-icon");
let $body = document.querySelector("body");

document.addEventListener("click", (e) => {
  if (e.target.matches("#menu-icon")) {
    $navMenu.classList.toggle("active");
    $body.classList.toggle("active");
  } else {
    $navMenu.classList.remove("active");
    $body.classList.remove("active");
  }
});
// +++++++++++++

/*Variables para la galería*/

const btnClose = document.getElementById("close-icon");
const btnNext = document.getElementById("next");
const btnPrevious = document.getElementById("prev");
const images = document.querySelectorAll("#gallery img:not(#active-img)");
const thbnImages = document.querySelectorAll("#thumbnail img");

// Creo que mas bien en lightbox debería ser el hero, si lo hago acorde al código de ejemplo. El lightbox es lo que hace que se vea oscuro por debajo de las imágenes cuando se abren, pero creo que eso lo voy a hacer mejor en el body:
const lightbox = document.getElementById("gallery-container");
const activeImage = document.getElementById("active-img");
let imageIndex = 0;

/*Abre el Lightbox*/

const opensLightbox = (event) => {
  console.log(imageIndex);
  activeImage.src = event.target.src;
  lightbox.style.display = "flex";
  imageIndex = Array.from(images).indexOf(event.target);
};

// Aquí en vez de poner la var images que guarda todas las imágenes grandes, debo hacer y poner otra var que guarde todos los thumbnails, porque a esos es a los que se les dar click para que se abra la imagen grande:
thbnImages.forEach((image) => {
  image.addEventListener("click", opensLightbox);
});

/*Cierra el Lightbox */

btnClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

/* Adelanta la image*/

const updateImage = () => {
  activeImage.src = images[imageIndex].src;
};

const adelantaImagen = () => {
  imageIndex = (imageIndex + 1) % images.length;
  updateImage();
};

const retrocederImagen = () => {
  imageIndex = (imageIndex - 1 + images.length) % images.length;
  updateImage();
};

console.log(images);

// console.log(images[0]);
// const adelantaImagen = () => {
//   console.log(images[imageIndex]);
//   console.log(imageIndex);
//   imageIndex++;
//   if (imageIndex >= images.length) {
//     imageIndex = 0;
//   }
//   activeImage.src = images[imageIndex].src;
// };

btnNext.addEventListener("click", adelantaImagen);

// /*Retrocede la Imagen*/

// const retrocederImagen = () => {
//   console.log(images[imageIndex]);
//   console.log(imageIndex);

//   imageIndex--;
//   if (imageIndex < 0) {
//     imageIndex = images.length - 1;
//   }
//   activeImage.src = images[imageIndex].src;
// };

btnPrevious.addEventListener("click", retrocederImagen);
